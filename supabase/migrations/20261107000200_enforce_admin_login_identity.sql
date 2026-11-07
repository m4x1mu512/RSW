alter table public.admin_users
  alter column username set not null,
  alter column login_email set not null;

alter table public.admin_users
  add constraint admin_users_username_lowercase check (username = lower(username)),
  add constraint admin_users_login_email_lowercase check (login_email = lower(login_email));
