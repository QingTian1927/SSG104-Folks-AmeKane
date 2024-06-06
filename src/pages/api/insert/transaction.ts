import type { APIRoute } from "astro";
import { db } from "../../../database/databaseUtils";
import { toBoolean, toNumber } from "../../../database/typeUtils";

export const POST: APIRoute = async ({ request, redirect }) => {
    const formData = await request.formData();

    const accountId = formData.get("account_id")?.toString();
    const categoryId = formData.get("category_id")?.toString();
    const title = formData.get("title")?.toString();
    const description = formData.get("description")?.toString();
    const value = formData.get("value")?.toString();
    const isIncome = formData.get("is_income")?.toString();

    if (!title || !accountId || !categoryId || !value) {
        return new Response(
            "Transaction title, account_id, category_id, value are all required",
            { status: 400 }
        );
    }

    const { data, error } = await db.insert.transaction({
        account_id: accountId,
        category_id: categoryId,
        is_income: toBoolean(isIncome),
        value: toNumber(value),
        title: title,
        description: description,
    });

    if (error) {
        console.log(error);
        return new Response(
            "Could not insert the newly created transaction\n" + error.message,
            { status: 500 }
        );
    }

    return new Response(
        JSON.stringify({ data }), { status: 200 }
    );
}
