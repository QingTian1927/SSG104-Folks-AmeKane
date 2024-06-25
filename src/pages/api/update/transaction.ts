import type { APIRoute } from "astro";
import { db } from "../../../database/databaseUtils";
import { toBoolean, toNumber } from "../../../database/typeUtils";

export const POST: APIRoute = async ({ request, redirect }) => {
    const formData = await request.formData();

    const transactionId = formData.get("id")?.toString();
    const categoryId = formData.get("category_id")?.toString();
    const title = formData.get("title")?.toString();
    const description = formData.get("description")?.toString();
    const value = formData.get("value")?.toString();
    const isIncome = formData.get("is_income")?.toString();

    if (!transactionId) {
        return new Response(
            "Transaction ID is required",
            { status: 400 }
        );
    }

    const { data, error } = await db.update.transaction(
        transactionId,
        {
            category_id: categoryId,
            title: title,
            description: description,
            value: toNumber(value) || undefined,
            is_income: toBoolean(isIncome),
        }
    );

    if (error) {
        console.log(error);
        return new Response(
            "Could not update the given transaction\n" + error.message,
            { status: 500 }
        );
    }

    return new Response(
        JSON.stringify({ data }), { status: 200 }
    );
}
