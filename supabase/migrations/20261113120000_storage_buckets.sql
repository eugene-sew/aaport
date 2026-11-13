-- Create the two public image buckets the site uses, so a brand-new Supabase
-- project works after running schema.sql + migrations. Safe to re-run.
insert into storage.buckets (id, name, public)
values ('assets', 'assets', true), ('media', 'media', true)
on conflict (id) do nothing;
