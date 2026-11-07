create extension if not exists pgcrypto;

create table public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table public.brands (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  city text not null default '',
  founded_year integer,
  description text not null default '',
  logo_text text not null default '',
  logo_url text,
  website text not null default '',
  telegram text not null default '',
  aesthetic text not null default '',
  status text not null default 'draft' check (status in ('draft','published','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  brand_id uuid references public.brands(id) on delete restrict,
  category text not null check (category in ('t-shirts','hoodies','pants','accessories')),
  category_label text not null default '',
  price numeric(12,2) not null default 0 check (price >= 0),
  sizes text[] not null default '{}',
  description text not null default '',
  composition text not null default '',
  care_instructions text not null default '',
  delivery_info text not null default '',
  image_url text not null default '',
  gallery text[] not null default '{}',
  external_shop_url text not null default '',
  is_new boolean not null default false,
  featured boolean not null default false,
  color text not null default '',
  sku text not null default '',
  status text not null default 'draft' check (status in ('draft','published','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.brand_applications (
  id uuid primary key default gen_random_uuid(),
  brand_name text not null check (char_length(brand_name) between 1 and 120),
  city text not null check (char_length(city) between 1 and 120),
  website text not null default '',
  telegram text not null default '',
  contact_name text not null default '',
  contact_email text not null check (char_length(contact_email) between 3 and 254),
  lookbook_url text not null default '',
  description text not null default '',
  status text not null default 'pending' check (status in ('pending','reviewing','approved','rejected')),
  submitted_at timestamptz not null default now(),
  reviewed_at timestamptz
);

create index products_brand_id_idx on public.products(brand_id);
create index products_status_category_idx on public.products(status, category);
create index brands_status_idx on public.brands(status);
create index applications_status_submitted_idx on public.brand_applications(status, submitted_at desc);

alter table public.admin_users enable row level security;
alter table public.brands enable row level security;
alter table public.products enable row level security;
alter table public.brand_applications enable row level security;

grant select on public.brands, public.products to anon, authenticated;
grant insert on public.brand_applications to anon, authenticated;
grant select, insert, update, delete on public.brands, public.products to authenticated;
grant select, update on public.brand_applications to authenticated;
grant select on public.admin_users to authenticated;

create policy "Admins can read own admin membership"
on public.admin_users for select to authenticated
using (user_id = (select auth.uid()));

create policy "Read published brands or admin catalog"
on public.brands for select to anon, authenticated
using (
  status = 'published'
  or (
    (select auth.uid()) is not null
    and exists (select 1 from public.admin_users au where au.user_id = (select auth.uid()))
  )
);
create policy "Admins can insert brands"
on public.brands for insert to authenticated
with check (exists (select 1 from public.admin_users au where au.user_id = (select auth.uid())));
create policy "Admins can update brands"
on public.brands for update to authenticated
using (exists (select 1 from public.admin_users au where au.user_id = (select auth.uid())))
with check (exists (select 1 from public.admin_users au where au.user_id = (select auth.uid())));
create policy "Admins can delete brands"
on public.brands for delete to authenticated
using (exists (select 1 from public.admin_users au where au.user_id = (select auth.uid())));

create policy "Read published products or admin catalog"
on public.products for select to anon, authenticated
using (
  status = 'published'
  or (
    (select auth.uid()) is not null
    and exists (select 1 from public.admin_users au where au.user_id = (select auth.uid()))
  )
);
create policy "Admins can insert products"
on public.products for insert to authenticated
with check (exists (select 1 from public.admin_users au where au.user_id = (select auth.uid())));
create policy "Admins can update products"
on public.products for update to authenticated
using (exists (select 1 from public.admin_users au where au.user_id = (select auth.uid())))
with check (exists (select 1 from public.admin_users au where au.user_id = (select auth.uid())));
create policy "Admins can delete products"
on public.products for delete to authenticated
using (exists (select 1 from public.admin_users au where au.user_id = (select auth.uid())));

create policy "Anyone can submit brand applications"
on public.brand_applications for insert to anon, authenticated
with check (status = 'pending');
create policy "Admins can read applications"
on public.brand_applications for select to authenticated
using (exists (select 1 from public.admin_users au where au.user_id = (select auth.uid())));
create policy "Admins can update applications"
on public.brand_applications for update to authenticated
using (exists (select 1 from public.admin_users au where au.user_id = (select auth.uid())))
with check (exists (select 1 from public.admin_users au where au.user_id = (select auth.uid())));
