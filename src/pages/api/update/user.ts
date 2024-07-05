import type { APIRoute } from "astro";
import { auth } from "../../../database/databaseUtils";

export const POST: APIRoute = async ({ request, redirect }) => {
    const formData = await request.formData();

    const username = formData.get("username")?.toString();
    if (!username) {
        return new Response(
            "Username is required", { status: 400 }
        );
    }

    const userId = await auth.user.getId();
    if (!userId) {
        return new Response(
            "Could not retrieve the User ID", { status: 500 }
        );
    }

    const { data, error } = await auth.admin.updateUserMetadata(
        userId, { name: username, }
    );

    if (error) {
        console.error("/api/update/user: " + error.message);
        return new Response(
            "Could not update user account information\n" + error.message,
            { status: 500 }
        );
    }

    const user_metadata = data.user.user_metadata;
    return new Response(
        JSON.stringify({ userId, user_metadata }), { status: 200 }
    );
}
