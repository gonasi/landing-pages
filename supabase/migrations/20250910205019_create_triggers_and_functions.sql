-- function to update updated_at timestamp and updated_by
create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  new.updated_at = now();
  new.updated_by = (select auth.uid());
  return new;
end;
$$;


-- function to set created_by and updated_by on insert
create or replace function public.set_audit_columns()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if tg_op = 'INSERT' then
    new.created_by = coalesce(new.created_by, (select auth.uid()));
    new.updated_by = coalesce(new.updated_by, (select auth.uid()));
  elsif tg_op = 'UPDATE' then
    new.updated_by = (select auth.uid());
    -- preserve original created_by
    new.created_by = old.created_by;
  end if;
  return new;
end;
$$;

-- triggers for audit columns (insert and update)
create trigger set_campaigns_audit_columns
  before insert or update on public.campaigns
  for each row execute function set_audit_columns();

create trigger set_ad_sets_audit_columns
  before insert or update on public.ad_sets
  for each row execute function set_audit_columns();

create trigger set_ad_creatives_audit_columns
  before insert or update on public.ad_creatives
  for each row execute function set_audit_columns();

create trigger set_ad_publish_queue_audit_columns
  before insert or update on public.ad_publish_queue
  for each row execute function set_audit_columns();

-- triggers for updated_at (update only - separate from audit to avoid conflicts)
create trigger update_campaigns_updated_at
  before update on public.campaigns
  for each row execute function update_updated_at_column();

create trigger update_ad_sets_updated_at
  before update on public.ad_sets
  for each row execute function update_updated_at_column();

create trigger update_ad_creatives_updated_at
  before update on public.ad_creatives
  for each row execute function update_updated_at_column();

create trigger update_ad_publish_queue_updated_at
  before update on public.ad_publish_queue
  for each row execute function update_updated_at_column();

-- function to automatically set published_at when status changes to 'published'
create or replace function public.set_published_at()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.status = 'published' and old.status != 'published' then
    new.published_at = now();
  elsif new.status != 'published' then
    new.published_at = null;
  end if;
  return new;
end;
$$;

create trigger set_ad_creatives_published_at
  before update on public.ad_creatives
  for each row execute function set_published_at();

-- function to automatically set started_at and completed_at for queue
create or replace function public.manage_queue_timestamps()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  -- set started_at when status changes to 'processing'
  if new.status = 'processing' and old.status != 'processing' then
    new.started_at = now();
  end if;
  
  -- set completed_at when status changes to 'done' or 'failed'
  if (new.status = 'done' or new.status = 'failed') and 
    (old.status != 'done' and old.status != 'failed') then
    new.completed_at = now();
  end if;
  
  return new;
end;
$$;

create trigger manage_ad_publish_queue_timestamps
  before update on public.ad_publish_queue
  for each row execute function manage_queue_timestamps();