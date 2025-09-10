-- migration: 003_create_ad_creatives_table.sql
create table public.ad_creatives (
  id uuid default gen_random_uuid() primary key,
  campaign_id uuid not null,
  ad_sets_id uuid not null,
  ad_set_name text not null,
  file_url text not null, -- supabase storage path
  file_type text, -- image, video, carousel
  file_size bigint,
  headline text,
  body text,
  cta text,
  status text default 'draft' check (status in ('draft', 'publishing', 'published', 'failed')),
  meta_creative_id text, -- populated after successful publish
  meta_ad_id text, -- populated after ad creation
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  published_at timestamp with time zone,
  created_by uuid references auth.users(id),
  updated_by uuid references auth.users(id),
  
  foreign key (campaign_id) references public.campaigns(id) on delete cascade,
  foreign key (ad_sets_id) references public.ad_sets(id) on delete cascade
);

-- enable rls
alter table public.ad_creatives enable row level security;

-- rls policy: authenticated users can do everything
create policy "authenticated users can manage ad_creatives" on public.ad_creatives
  for all using ((select auth.role()) = 'authenticated');

-- indexes
create index idx_ad_creatives_campaign_id on public.ad_creatives(campaign_id);
create index idx_ad_creatives_ad_sets_id on public.ad_creatives(ad_sets_id);
create index idx_ad_creatives_status on public.ad_creatives(status);
create index idx_ad_creatives_meta_creative_id on public.ad_creatives(meta_creative_id);
create index idx_ad_creatives_created_at on public.ad_creatives(created_at desc);
create index idx_ad_creatives_published_at on public.ad_creatives(published_at desc);
create index idx_ad_creatives_created_by on public.ad_creatives(created_by);
create index idx_ad_creatives_updated_by on public.ad_creatives(updated_by);