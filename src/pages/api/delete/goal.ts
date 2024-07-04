import type { APIRoute } from "astro";
import { db } from "../../../database/databaseUtils";

export const POST: APIRoute = async ({ request, redirect }) => {
    const formData = await request.formData();
    const goalId = formData.get("id")?.toString();

    console.log(formData);

    if (!goalId) {
        return new Response(
            "Goal ID is required",
            { status: 400 }
        );
    }

    const { data, error } = await db.delete.goal(goalId);

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
