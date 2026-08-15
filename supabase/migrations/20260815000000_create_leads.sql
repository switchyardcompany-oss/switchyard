create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text not null,
  project_type text not null,
  company text,
  location text,
  budget text,
  timeline text,
  message text,
  form_source text not null
);

alter table public.leads enable row level security;

-- The application inserts through the server-side service-role client.
-- No public read, update, delete, or direct insert policy is granted.
