import type { APIRoute } from "astro";
import { auth, db } from "../../../database/databaseUtils";
import { toBoolean, toNumber } from "../../../database/typeUtils";

export const POST: APIRoute = async ({ request, redirect }) => {
    const formData = await request.formData();

    const accountId = formData.get("id")?.toString();
    const title = formData.get("title")?.toString();
    const balance = formData.get("balance")?.toString();
    const is_saving = formData.get("is_saving")?.toString();
    const set_default = formData.get("set_default")?.toString();

    if (!accountId) {
        return new Response(
            "Account ID is required", { status: 400 },
        );
    }

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

    if (toBoolean(set_default)) {
        const userId = await auth.user.getId();
        if (!userId) {
            console.error("[/api/update/account] failed to retrieve userId");
            return new Response(
                JSON.stringify({ data }), { status: 200 }
            );
        }

        const { error: preferencesError } = await db.update.preferences(
            userId, { default_account: data[0].id }
        );

        if (preferencesError) {
            console.error(preferencesError);
            return new Response(
                JSON.stringify({ data }), { status: 200 }
            );
        }
    }

    return new Response(
        JSON.stringify({ data }), { status: 200 }
    );
}
