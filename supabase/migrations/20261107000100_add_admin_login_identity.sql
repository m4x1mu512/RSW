alter table public.admin_users
  add column if not exists username text,
  add column if not exists login_email text,
  add column if not exists must_change_password boolean not null default true;

create unique index if not exists admin_users_username_unique
  on public.admin_users (lower(username))
  where username is not null;

create unique index if not exists admin_users_login_email_unique
  on public.admin_users (lower(login_email))
  where login_email is not null;
