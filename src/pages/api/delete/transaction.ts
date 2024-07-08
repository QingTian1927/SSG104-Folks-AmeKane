import type { APIRoute } from "astro";
import { db } from "../../../database/databaseUtils";
import { supabase } from "../../../database/supabase/client";
import { popPreviousPage } from "../../../components/dashboard/setPreviousPage.astro";

export const POST: APIRoute = async ({ request, redirect, cookies }) => {
    const formData = await request.formData();
    const transactionId = formData.get("id")?.toString();
    if (!transactionId) {
        return new Response(
            "Transaction ID is required",
            { status: 400 }
        );
    }

    const { data: transaction, error } = await db.delete.transaction(transactionId);
    if (error) {
        console.log(error);
        return new Response(
            "Could not delete the given transaction\n" + error.message,
            { status: 500 }
        );
    }

    const isIncome = transaction[0].is_income;
    const value = transaction[0].value;

    const { data: account, error: accountError } = await supabase.from("Account").select().eq("id", transaction[0].account_id);
    if (accountError) {
        console.log(accountError);
        return new Response(
            "Failed to retrieve the account associated with the deleted transaction\n" + accountError.message,
            { status: 500 }
        );
    }

    let currentBalance = account ? account[0].balance : 0;
    if (isIncome) {
        currentBalance -= value;
    } else {
        currentBalance += value;
    }

    const { error: updateError } = await db.update.account(account[0].id, { balance: currentBalance, });
    if (updateError) {
        console.log(updateError);
        return new Response(
            "Failed to update the account associated with the deleted transaction\n" + updateError.message,
            { status: 500 }
        );
    }

    const previousPage = popPreviousPage(cookies);
    if (!previousPage) {
        return redirect("/dashboard/transactions");
    }
    return redirect(previousPage);
}
