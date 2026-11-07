import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const allowedOrigins = new Set([
  "https://m4x1mu512.github.io",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
]);

function headersFor(req: Request) {
  const origin = req.headers.get("Origin") ?? "";
  return {
    "Access-Control-Allow-Origin": allowedOrigins.has(origin) ? origin : "https://m4x1mu512.github.io",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
    "Content-Type": "application/json",
  };
}
function reply(req: Request, body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: headersFor(req) });
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: headersFor(req) });
  if (req.method !== "POST") return reply(req, { error: "Method not allowed" }, 405);

  const url = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  if (!url || !serviceKey || !anonKey) return reply(req, { error: "Server auth is not configured" }, 500);

  const admin = createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });

  try {
    const body = await req.json();

    if (body.action === "login") {
      const username = String(body.username ?? "").trim().toLowerCase();
      const password = String(body.password ?? "");
      if (!/^[a-z0-9_.-]{3,32}$/.test(username) || !password) {
        return reply(req, { error: "Проверьте логин и пароль" }, 400);
      }

      const { data: identity, error: lookupError } = await admin
        .from("admin_users").select("login_email").eq("username", username).maybeSingle();
      if (lookupError || !identity?.login_email) return reply(req, { error: "Неверный логин или пароль" }, 401);

      const authClient = createClient(url, anonKey, { auth: { autoRefreshToken: false, persistSession: false } });
      const { data, error } = await authClient.auth.signInWithPassword({
        email: identity.login_email, password,
      });
      if (error || !data.session) return reply(req, { error: "Неверный логин или пароль" }, 401);
      return reply(req, { session: data.session, user: data.user });
    }

    if (body.action === "update-account") {
      const token = req.headers.get("Authorization")?.replace(/^Bearer\s+/i, "");
      if (!token) return reply(req, { error: "Требуется авторизация" }, 401);

      const { data: auth, error: authError } = await admin.auth.getUser(token);
      if (authError || !auth.user) return reply(req, { error: "Сессия недействительна" }, 401);
      const userId = auth.user.id;

      const { data: membership, error: membershipError } = await admin
        .from("admin_users").select("user_id").eq("user_id", userId).maybeSingle();
      if (membershipError || !membership) return reply(req, { error: "Доступ запрещён" }, 403);

      const updates: Record<string, unknown> = {};
      if (body.username !== undefined) {
        const username = String(body.username).trim().toLowerCase();
        if (!/^[a-z0-9_.-]{3,32}$/.test(username)) {
          return reply(req, { error: "Логин: 3–32 символа, латиница, цифры, точка, дефис или _" }, 400);
        }
        const { data: duplicate } = await admin.from("admin_users")
          .select("user_id").eq("username", username).neq("user_id", userId).maybeSingle();
        if (duplicate) return reply(req, { error: "Этот логин уже занят" }, 409);
        updates.username = username;
      }

      if (body.password !== undefined) {
        const password = String(body.password);
        if (password.length < 12) return reply(req, { error: "Новый пароль должен содержать не менее 12 символов" }, 400);
        const { error: passwordError } = await admin.auth.admin.updateUserById(userId, { password });
        if (passwordError) return reply(req, { error: passwordError.message }, 400);
      }

      if (Object.keys(updates).length) {
        const { error } = await admin.from("admin_users").update(updates).eq("user_id", userId);
        if (error) return reply(req, { error: error.message }, 400);
      }
      const { error: flagError } = await admin.from("admin_users")
        .update({ must_change_password: false }).eq("user_id", userId);
      if (flagError) return reply(req, { error: flagError.message }, 400);
      return reply(req, { success: true });
    }

    return reply(req, { error: "Unknown action" }, 400);
  } catch {
    return reply(req, { error: "Некорректный запрос" }, 400);
  }
});
