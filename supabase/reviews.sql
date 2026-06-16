create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  project_type text not null,
  project_id integer,
  project_title text,
  rating integer not null check (rating between 1 and 5),
  comment text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);

create index if not exists reviews_status_created_at_idx
  on public.reviews (status, created_at desc);

create index if not exists reviews_project_id_status_idx
  on public.reviews (project_id, status);

alter table public.reviews enable row level security;

-- The website uses SUPABASE_SERVICE_ROLE_KEY from server-side routes,
-- so no public anon policies are required for this table.
