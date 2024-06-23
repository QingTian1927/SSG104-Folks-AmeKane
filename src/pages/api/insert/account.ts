import type { APIRoute } from "astro";
import { db, auth } from "../../../database/databaseUtils";
import { toBoolean, toNumber } from "../../../database/typeUtils";

export const POST: APIRoute = async ({ request, redirect }) => {
    const formData = await request.formData();
    const title = formData.get("title")?.toString();
    const balance = formData.get("balance")?.toString();
    const is_saving = formData.get("is_saving")?.toString();
    const set_default = formData.get("set_default")?.toString();

    if (!title) {
        return new Response(
            "The account title is required", { status: 400 }
        );
    }

    const userId = await auth.user.getId();
    if (!userId) {
        return new Response(
            "Could not retrieve the User ID", { status: 500 }
        );
    }

    const { data, error } = await db.insert.account({
        user_id: userId,
        title: title,
        balance: toNumber(balance),
        is_saving: toBoolean(is_saving),
    });

    if (error) {
        return new Response(
            "Could not insert the newly created account\n" + error.message,
            { status: 500 }
        );
    }

    if (toBoolean(set_default)) {
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
