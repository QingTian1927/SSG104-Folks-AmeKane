import type { APIRoute } from "astro";
import { db } from "../../../database/databaseUtils";
import { popPreviousPage } from "../../../components/dashboard/setPreviousPage.astro";

export const POST: APIRoute = async ({ request, redirect, cookies }) => {
    const formData = await request.formData();
    const accountId = formData.get("id")?.toString();

    if (!accountId) {
        return new Response(
            "Account ID is required",
            { status: 400 }
        );
    }

    const { error } = await db.delete.account(accountId);

    if (error) {
        console.log(error);
        return new Response(
            "Could not delete the given account\n" + error.message,
            { status: 500 }
        );
    }

    const previousPage = popPreviousPage(cookies);
    if (!previousPage) {
        return redirect("/dashboard/accounts");
    }
    return redirect(previousPage);
}
