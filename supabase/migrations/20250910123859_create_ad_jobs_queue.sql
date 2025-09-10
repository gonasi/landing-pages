-- queue for async ad creation
select pgmq.create('create_ad_jobs_queue');

-- cron job to process jobs every 5 minutes
select cron.schedule(
  'process-create-ad-jobs',
  '*/5 * * * *',
  $$ select process_create_ad_jobs(); $$
);
