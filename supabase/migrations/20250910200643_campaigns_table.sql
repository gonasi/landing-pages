create table public.campaigns (
  id uuid default gen_random_uuid() primary key,
  campaign_id text not null, -- meta campaign id
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  created_by uuid references auth.users(id),
  updated_by uuid references auth.users(id)
);

-- enable rls
alter table public.campaigns enable row level security;

-- rls policy: authenticated users can do everything
create policy "authenticated users can manage campaigns" on public.campaigns
  for all using ((select auth.role()) = 'authenticated');

-- indexes
create index idx_campaigns_created_at on public.campaigns(created_at desc);
create index idx_campaigns_created_by on public.campaigns(created_by);
create index idx_campaigns_updated_by on public.campaigns(updated_by);