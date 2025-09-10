create table ad_jobs (
  id uuid primary key default gen_random_uuid(),
  creative_id uuid not null references ad_creatives(id) on delete cascade,
  page_id text, 
  campaign_id text,
  
  status text default 'pending'
    check (status in ('pending', 'processing', 'success', 'failed')),

  meta_ad_id text,
  meta_creative_id text,

  error_message text,

  retry_count integer default 0,

  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  processed_at timestamptz
);

create index if not exists idx_ad_jobs_created_by_status
  on ad_jobs(created_by, status);

create index if not exists idx_ad_jobs_creative_id_status
  on ad_jobs(creative_id, status);

  -- Cover FK → ad_creatives(id)
create index if not exists ad_jobs_creative_id_idx
  on public.ad_jobs(creative_id);

-- Cover FK → auth.users(id)
create index if not exists ad_jobs_created_by_idx
  on public.ad_jobs(created_by);

-- Automatically update `updated_at` timestamp
create trigger trg_ad_jobs_set_updated_at
before update on public.ad_jobs
for each row
execute function public.update_updated_at_column();

-- RLS
alter table ad_jobs enable row level security;

-- Any authenticated user can read jobs
create policy "Users can read jobs"
on ad_jobs for select
using ((select auth.role()) = 'authenticated');

-- Any authenticated user can insert jobs
create policy "Users can insert jobs"
on ad_jobs for insert
with check ((select auth.role()) = 'authenticated');

-- Any authenticated user can delete jobs (cleanup)
create policy "Users can delete jobs"
on ad_jobs for delete
using ((select auth.role()) = 'authenticated');
