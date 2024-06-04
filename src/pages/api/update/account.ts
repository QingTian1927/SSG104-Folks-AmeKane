import type { APIRoute } from "astro";
import { db } from "../../../database/databaseUtils";
import { toBoolean, toNumber } from "../../../database/typeConversion";

export const POST: APIRoute = async ({ request, redirect }) => {
    const formData = await request.formData();

    const accountId = formData.get("account_id")?.toString();
    const title = formData.get("title")?.toString();
    const balance = formData.get("balance")?.toString();
    const is_saving = formData.get("is_saving")?.toString();

    const { data, error } = await db.update.account(
        accountId,
        {
            title: title,
            balance: toNumber(balance),
            is_saving: toBoolean(is_saving),
        }
    );

    if (error) {
        return new Response(
            "Could not update the given account\n" + error.message,
            { status: 500 }
        );
    }

    return new Response(
        JSON.stringify({ data }), { status: 200 }
    );
}
