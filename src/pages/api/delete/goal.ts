import type { APIRoute } from "astro";
import { db } from "../../../database/databaseUtils";

export const POST: APIRoute = async ({ request, redirect }) => {
    const formData = await request.formData();
    const goalId = formData.get("id")?.toString();

    if (!goalId) {
        return new Response(
            "Goal ID is required",
            { status: 400 }
        );
    }

    const { data, error } = await db.delete.category(goalId);

    if (error) {
        console.log(error);
        return new Response(
            "Could not delete the given goal\n" + error.message,
            { status: 500 }
        );
    }

    return new Response(
        JSON.stringify({ data }), { status: 200 }
    );
}
