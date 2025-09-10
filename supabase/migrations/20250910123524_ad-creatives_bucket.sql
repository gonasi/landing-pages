insert into storage.buckets (id, name, public)
values ('ad-creatives', 'ad-creatives', false);


create policy "Public can view ad creatives"
  on storage.objects
  for select
  using (bucket_id = 'ad-creatives');

create policy "Authenticated users can upload ad creatives"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'ad-creatives'
  );

create policy "Authenticated users can update ad creatives"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'ad-creatives');

create policy "Authenticated users can delete ad creatives"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'ad-creatives');

