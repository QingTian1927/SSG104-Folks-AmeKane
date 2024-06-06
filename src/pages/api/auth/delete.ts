import type { APIRoute } from "astro";
import { auth } from "../../../database/databaseUtils";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
    const formData = await request.formData();
    const userId = formData.get("user_id")?.toString();

    if (!userId) {
        return new Response("The user ID is required", { status: 400 });
    }

    const { data, error } = await auth.admin.deleteUser(userId);

    if (error) {
        return new Response(
            "Failed to delete the given user account\n" + error.message,
            { status: 500 }
        );
    }

    cookies.delete("sb-access-token", { path: "/" });
    cookies.delete("sb-refresh-token", { path: "/" });

    return new Response(
        JSON.stringify({ data }), { status: 200 }
    );
}
