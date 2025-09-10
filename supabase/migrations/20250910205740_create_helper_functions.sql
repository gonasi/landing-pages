-- function to get next items from publish queue for worker
create or replace function public.get_next_queue_items(batch_size integer default 10)
returns setof ad_publish_queue
language plpgsql
security definer
set search_path = ''
as $$
begin
  return query
  select * from ad_publish_queue
  where status in ('pending', 'failed')
    and scheduled_for <= pg_catalog.now()
    and attempts < max_attempts
  order by priority desc, scheduled_for asc
  limit batch_size
  for update skip locked;
end;
$$;

-- function to mark queue item as processing
create or replace function public.start_processing_queue_item(queue_id uuid)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  updated_rows integer;
begin
  update ad_publish_queue
  set status = 'processing',
      started_at = pg_catalog.now(),
      attempts = attempts + 1,
      updated_at = pg_catalog.now()
  where id = queue_id
    and status in ('pending', 'failed');
  
  get diagnostics updated_rows = row_count;
  return updated_rows > 0;
end;
$$;

-- function to mark queue item as failed with retry logic
create or replace function public.fail_queue_item(
  queue_id uuid,
  error_message text,
  error_details_json jsonb default null,
  retry_delay_minutes integer default 15
)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  updated_rows integer;
  current_attempts integer;
  max_attempts_allowed integer;
begin
  -- get current attempts and max_attempts
  select attempts, max_attempts into current_attempts, max_attempts_allowed
  from ad_publish_queue where id = queue_id;
  
  -- determine if we should retry
  if current_attempts >= max_attempts_allowed then
    -- no more retries, mark as permanently failed
    update ad_publish_queue
    set status = 'failed',
        last_error = error_message,
        error_details = error_details_json,
        completed_at = pg_catalog.now(),
        updated_at = pg_catalog.now()
    where id = queue_id;
  else
    -- schedule for retry
    update ad_publish_queue
    set status = 'pending',
        last_error = error_message,
        error_details = error_details_json,
        scheduled_for = pg_catalog.now() + (retry_delay_minutes || ' minutes')::interval,
        updated_at = pg_catalog.now()
    where id = queue_id;
  end if;
  
  get diagnostics updated_rows = row_count;
  return updated_rows > 0;
end;
$$;

-- function to complete queue item successfully
create or replace function public.complete_queue_item(
  queue_id uuid,
  creative_meta_id text default null,
  ad_meta_id text default null
)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  updated_rows integer;
  creative_uuid uuid;
begin
  -- mark queue item as done
  update ad_publish_queue
  set status = 'done',
      completed_at = pg_catalog.now(),
      updated_at = pg_catalog.now()
  where id = queue_id;
  
  get diagnostics updated_rows = row_count;
  
  if updated_rows > 0 then
    -- get the creative_id and update the creative
    select creative_id into creative_uuid
    from ad_publish_queue where id = queue_id;
    
    update ad_creatives
    set status = 'published',
        meta_creative_id = coalesce(creative_meta_id, meta_creative_id),
        meta_ad_id = coalesce(ad_meta_id, meta_ad_id),
        published_at = pg_catalog.now(),
        updated_at = pg_catalog.now()
    where id = creative_uuid;
  end if;
  
  return updated_rows > 0;
end;
$$;

-- function to bulk create draft creatives from file list
create or replace function public.bulk_create_draft_creatives(
  p_campaign_id text,
  p_ad_set_id text,
  p_ad_set_name text,
  p_files jsonb, -- array of {file_url, file_type, file_size}
  p_default_headline text default null,
  p_default_body text default null,
  p_default_cta text default null
)
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  inserted_count integer := 0;
  file_record jsonb;
begin
  -- iterate through files and create draft creatives
  for file_record in select jsonb_array_elements(p_files)
  loop
    insert into ad_creatives (
      campaign_id,
      ad_set_id,
      ad_set_name,
      file_url,
      file_type,
      file_size,
      headline,
      body,
      cta,
      status,
      created_by,
      updated_by
    ) values (
      p_campaign_id,
      p_ad_set_id,
      p_ad_set_name,
      file_record->>'file_url',
      file_record->>'file_type',
      (file_record->>'file_size')::bigint,
      p_default_headline,
      p_default_body,
      p_default_cta,
      'draft',
      auth.uid(),
      auth.uid()
    );
    
    inserted_count := inserted_count + 1;
  end loop;
  
  return inserted_count;
end;
$$;
