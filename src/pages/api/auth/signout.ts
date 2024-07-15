import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ cookies, redirect }) => {
    cookies.delete("sb-access-token", { path: "/" });
    cookies.delete("sb-refresh-token", { path: "/" });

    cookies.delete("login-error", { path: "/signin "});
    cookies.delete("theme", { path: "/" });

    return redirect("/signin");
};
