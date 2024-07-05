import type { APIRoute } from "astro";
import { auth } from "../../../database/databaseUtils";

export const POST: APIRoute = async ({ request, redirect }) => {
    const userId = await auth.user.getId();
    if (!userId) {
        return new Response(
            "Could not retrieve the User ID", { status: 500 }
        );
    }

    const { error } = await auth.admin.deleteUser(userId);

    if (error) {
        console.error("/api/delete/user: " + error.message);
        return new Response(
            "Could not delete the given user account\n" + error.message,
            { status: 500 }
        );
    }

    return redirect("/signin");
}
