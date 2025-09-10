create table public.ad_sets (
  id uuid default gen_random_uuid() primary key,
  ad_set_id text not null, -- meta ad set id
  campaign_id uuid not null,
  name text not null,
  targeting jsonb,
  budget jsonb, -- daily_budget, lifetime_budget, budget_remaining
  schedule jsonb, -- start_time, end_time, schedule_type
  status text default 'active' check (status in ('active', 'paused', 'deleted')),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  created_by uuid references auth.users(id),
  updated_by uuid references auth.users(id),
  
  foreign key (campaign_id) references public.campaigns(id) on delete cascade
);

-- enable rls
alter table public.ad_sets enable row level security;

-- rls policy: authenticated users can do everything
create policy "authenticated users can manage ad_sets" on public.ad_sets
  for all using ((select auth.role()) = 'authenticated');

-- indexes
create index idx_ad_sets_ad_set_id on public.ad_sets(ad_set_id);
create index idx_ad_sets_campaign_id on public.ad_sets(campaign_id);
create index idx_ad_sets_status on public.ad_sets(status);
create index idx_ad_sets_created_at on public.ad_sets(created_at desc);
create index idx_ad_sets_created_by on public.ad_sets(created_by);
create index idx_ad_sets_updated_by on public.ad_sets(updated_by);