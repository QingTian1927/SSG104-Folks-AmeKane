import type { APIRoute } from "astro";
import { auth, db } from "../../../database/databaseUtils";
import { toBoolean, toNumber } from "../../../database/typeUtils";
import { supabase } from "../../../database/supabase/client";

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

    const userId = await auth.user.getId();
    if (!userId) {
        return new Response(
            "Could not retrieve the user ID", { status: 500 }
        );
    }

    const { data, error } = await db.insert.transaction({
        account_id: accountId,
        category_id: categoryId,
        user_id: userId,
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

    const { data: account, error: accountError } = await supabase.from("Account").select().eq("id", accountId);

    if (accountError) {
        return new Response(
            "Could not retrieve account information for updating\n" + accountError.message,
            { status: 500 }
        );
    }

    let currentBalance = (account) ? account[0].balance : 0;

    if (toBoolean(isIncome)) {
        currentBalance += toNumber(value);
    } else {
        currentBalance -= toNumber(value);
    }

    const { error: updateError } = await db.update.account(accountId, { balance: currentBalance });

    if (updateError) {
        return new Response(
            "Failed to update the account balance\n" + updateError.message,
            { status: 500 }
        );
    }

    return new Response(
        JSON.stringify({ data }), { status: 200 }
    );
}
