# Первичная настройка администратора RSW

Администратор создаётся вручную один раз в Supabase Auth. Публичной регистрации в приложении нет.

1. Откройте Supabase Dashboard → Authentication → Users.
2. Создайте пользователя с вашим рабочим email и задайте уникальный пароль (не используйте `admin/admin`).
3. Откройте SQL Editor и выполните запрос ниже, заменив адрес на email, указанный при создании пользователя:

```sql
insert into public.admin_users (user_id, username, login_email, must_change_password)
select id, 'admin', lower(email), true
from auth.users
where lower(email) = lower('YOUR_EMAIL@example.com')
on conflict (user_id) do update
set username = excluded.username,
    login_email = excluded.login_email,
    must_change_password = true;
```

4. Откройте сайт и перейдите по адресу `/#/admin`.
5. Войдите с логином `admin` и паролем, заданным при создании пользователя.
6. В разделе «Настройки» задайте постоянный логин и пароль длиной не менее 12 символов.

Секретный ключ Supabase никогда не добавляйте в браузер, GitHub или этот файл. Edge Function использует серверную переменную `SUPABASE_SERVICE_ROLE_KEY`; браузер использует только publishable key.

## Сброс доступа

Если пароль потерян, измените его через Supabase Dashboard → Authentication → Users. Не используйте общий пароль `admin/admin`: он известен всем и небезопасен.
