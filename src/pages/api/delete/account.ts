import type { APIRoute } from "astro";
import { db } from "../../../database/databaseUtils";

export const POST: APIRoute = async ({ request, redirect }) => {
    const formData = await request.formData();
    const accountId = formData.get("account_id")?.toString();

    if (!accountId) {
        return new Response(
            "Account ID is required",
            { status: 400 }
        );
    }

    const { data, error } = await db.delete.account(accountId);

    if (error) {
        console.log(error);
        return new Response(
            "Could not delete the given account\n" + error.message,
            { status: 500 }
        );
    }

    return new Response(
        JSON.stringify({ data }), { status: 200 }
    );
}
