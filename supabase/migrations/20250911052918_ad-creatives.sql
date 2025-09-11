insert into storage.buckets
  (id, name, public)
values
  ('ad-creatives', 'ad-creatives', false);

-- Allow authenticated users to INSERT into ad-creatives
create policy "Allow authenticated insert"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'ad-creatives'
);

-- Allow authenticated users to SELECT files in ad-creatives
create policy "Allow authenticated select"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'ad-creatives'
);

-- Allow authenticated users to UPDATE files in ad-creatives
create policy "Allow authenticated update"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'ad-creatives'
);

-- Allow authenticated users to DELETE files in ad-creatives
create policy "Allow authenticated delete"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'ad-creatives'
);