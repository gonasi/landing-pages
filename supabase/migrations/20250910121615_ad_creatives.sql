create table ad_creatives (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  image_url text not null,
  headline text not null,
  body_text text not null,
  call_to_action text,
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

-- Add index for faster lookups by created_by
create index ad_creatives_created_by_idx
  on ad_creatives(created_by);

-- Automatically update `updated_at` timestamp
create trigger trg_ad_creatives_set_updated_at
before update on public.ad_creatives
for each row
execute function public.update_updated_at_column();

-- RLS
alter table ad_creatives enable row level security;

-- Any authenticated user can read all creatives
create policy "Users can read creatives"
on ad_creatives for select
using ((select auth.role()) = 'authenticated');

-- Any authenticated user can insert
create policy "Users can insert creatives"
on ad_creatives for insert
with check ((select auth.role()) = 'authenticated');

-- Any authenticated user can update
create policy "Users can update creatives"
on ad_creatives for update
using ((select auth.role()) = 'authenticated');

-- Any authenticated user can delete
create policy "Users can delete creatives"
on ad_creatives for delete
using ((select auth.role()) = 'authenticated');
