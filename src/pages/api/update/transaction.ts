import type { APIRoute } from "astro";
import { db } from "../../../database/databaseUtils";
import { toBoolean, toNumber } from "../../../database/typeUtils";
import { supabase } from "../../../database/supabase/client";

export const POST: APIRoute = async ({ request, redirect }) => {
    const formData = await request.formData();
    console.log(formData);

    const transactionId = formData.get("id")?.toString();
    const categoryId = formData.get("category_id")?.toString();
    const accountId = formData.get("account_id")?.toString();
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

    const { data: transaction, error: transactionError } = await supabase.from("Transaction").select().eq("id", transactionId);
    if (transactionError) {
        console.log(transactionError);
        return new Response(
            "Failed to retrieve the original transaction information\n" + transactionError.message,
            { status: 500 }
        );
    }

    const oldIsIncome = transaction[0].is_income;
    const oldValue = transaction[0].value;

    const { data: account, error: accountError } = await supabase.from("Account").select().eq("id", transaction[0].account_id);
    if (accountError) {
        console.log(accountError);
        return new Response(
            "Failed to retrieve the account associated with the updated transaction\n" + accountError.message,
            { status: 500 }
        );
    }

    let currentBalance = account ? account[0].balance : 0;
    if (oldIsIncome) {
        currentBalance -= oldValue;
    } else {
        currentBalance += oldValue;
    }

    if (toBoolean(isIncome)) {
        currentBalance += toNumber(value);
    } else {
        currentBalance -= toNumber(value);
    }

    const { error: updateError } = await db.update.account(account[0].id, { balance: currentBalance, });
    if (updateError) {
        console.log(updateError);
        return new Response(
            "Failed to update the given transaction\n" + updateError.message,
            { status: 500 }
        );
    }

    if (accountId && accountId !== account[0].id) {
        const { data: newAccount, error: newAccountError } = await supabase.from("Account").select("balance").eq("id", accountId);
        if (newAccountError) {
            console.log({newAccountError});
            return new Response(
                "Failed to retrieve the new account associated with the updated transaction\n" + newAccountError.message,
                { status: 500 }
            );
        }

        let newBalance = newAccount[0].balance;
        if (transaction[0].is_income) {
            newBalance += transaction[0].value;
        } else {
            newBalance -= transaction[0].value;
        }

        const { error: updateError } = await db.update.account(accountId, { balance: newBalance });
        if (updateError) {
            console.log({updateError});
            return new Response(
                "Failed to update the given transaction\n" + updateError.message,
                { status: 500 }
            );
        }
    }

    const { data, error } = await db.update.transaction(
        transactionId,
        {
            category_id: categoryId,
            account_id: accountId,
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
