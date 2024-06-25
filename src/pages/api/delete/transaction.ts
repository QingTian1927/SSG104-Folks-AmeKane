import type { APIRoute } from "astro";
import { db } from "../../../database/databaseUtils";

export const POST: APIRoute = async ({ request, redirect }) => {
    const formData = await request.formData();
    const transactionId = formData.get("id")?.toString();

    if (!transactionId) {
        return new Response(
            "Transaction ID is required",
            { status: 400 }
        );
    }

    const { data, error } = await db.delete.transaction(transactionId);

    if (error) {
        console.log(error);
        return new Response(
            "Could not delete the given transaction\n" + error.message,
            { status: 500 }
        );
    }

    return new Response(
        JSON.stringify({ data }), { status: 200 }
    );
}
