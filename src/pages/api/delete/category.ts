import type { APIRoute } from "astro";
import { db } from "../../../database/databaseUtils";

export const POST: APIRoute = async ({ request, redirect }) => {
    const formData = await request.formData();
    const categoryId = formData.get("category_id")?.toString();

    if (!categoryId) {
        return new Response(
            "Category ID is required",
            { status: 400 }
        );
    }

    const { data, error } = await db.delete.category(categoryId);

    if (error) {
        console.log(error);
        return new Response(
            "Could not delete the given category\n" + error.message,
            { status: 500 }
        );
    }

    return new Response(
        JSON.stringify({ data }), { status: 200 }
    );
}
