import type { APIRoute } from "astro";
import { auth, db } from "../../../database/databaseUtils";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
    const formData = await request.formData();

    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const provider = formData.get("provider")?.toString();

    if (provider) {
        const { data, error } = await auth.user.signInWithOAuth(provider);

        if (error) {
            return new Response(error.message, { status: 500 });
        }
        return redirect(data.url);
    }

    if (!email || !password) {
        return new Response(
            "Email and password are required", { status: 400 }
        );
    }

    const { data, error } = await auth.user.signInWithPassword(email, password);

    if (error) {
        cookies.set(
            "login-error",
            { email, password, error },
            { path: "/signin", maxAge: 60 }  // 1 minute
        );
        return redirect("/signin");
    }
    const { access_token, refresh_token } = data.session;

    cookies.delete("login-error", { path: "/signin" });

    cookies.set("sb-access-token", access_token, {
        path: "/",
    });
    cookies.set("sb-refresh-token", refresh_token, {
        path: "/",
    });

    const { data: preferences, error: preferencesError } = await db.select.preferences(data.user.id);
    if (preferencesError) {
        console.error({preferencesError});
    }

    const userTheme = preferences ? preferences[0].default_theme : "system";
    cookies.set("theme", userTheme, { path: "/" });

    return redirect("/dashboard");
};
