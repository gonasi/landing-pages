create table public.ad_publish_queue (
  id uuid default gen_random_uuid() primary key,
  creative_id uuid not null,
  status text default 'pending' check (status in ('pending', 'processing', 'done', 'failed')),
  attempts integer default 0,
  max_attempts integer default 3,
  last_error text,
  error_details jsonb, -- structured error info
  priority integer default 0, -- higher number = higher priority
  scheduled_for timestamp with time zone default now(),
  started_at timestamp with time zone,
  completed_at timestamp with time zone,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  created_by uuid references auth.users(id),
  updated_by uuid references auth.users(id),
  
  -- foreign key to ad_creatives
  constraint fk_ad_publish_queue_creative_id 
    foreign key (creative_id) 
    references public.ad_creatives(id) 
    on delete cascade
);

-- enable rls
alter table public.ad_publish_queue enable row level security;

-- rls policy: authenticated users can do everything
create policy "authenticated users can manage ad_publish_queue" on public.ad_publish_queue
  for all using ((select auth.role()) = 'authenticated');

-- indexes
create index idx_ad_publish_queue_creative_id on public.ad_publish_queue(creative_id);
create index idx_ad_publish_queue_status on public.ad_publish_queue(status);
create index idx_ad_publish_queue_priority_scheduled on public.ad_publish_queue(priority desc, scheduled_for asc);
create index idx_ad_publish_queue_created_at on public.ad_publish_queue(created_at desc);
create index idx_ad_publish_queue_attempts on public.ad_publish_queue(attempts);
create index idx_ad_publish_queue_created_by on public.ad_publish_queue(created_by);
create index idx_ad_publish_queue_updated_by on public.ad_publish_queue(updated_by);

-- compound index for worker queries
create index idx_ad_publish_queue_worker on public.ad_publish_queue(status, priority desc, scheduled_for asc) 
  where status in ('pending', 'failed');