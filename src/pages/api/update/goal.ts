import type { APIRoute } from "astro";
import { db } from "../../../database/databaseUtils";
import { toNumber } from "../../../database/typeConversion";

export const POST: APIRoute = async ({ request, redirect }) => {
    const formData = await request.formData();

    const goalId = formData.get("goal_id")?.toString();
    const title = formData.get("title")?.toString();
    const description = formData.get("description")?.toString();
    const target = formData.get("target")?.toString();
    const current = formData.get("current")?.toString();

    if (!goalId) {
        return new Response(
            "Goal ID is required", { status: 400 },
        );
    }

    const { data, error } = await db.update.goal(
        goalId,
        {
            title: title,
            description: description,
            target: toNumber(target) || undefined,
            current: toNumber(current) || undefined,
        }
    );

    if (error) {
        return new Response(
            "Could not update the given goal\n" + error.message,
            { status: 500 }
        );
    }

    return new Response(
        JSON.stringify({ data }), { status: 200 }
    );
}
