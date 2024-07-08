import type { APIRoute } from "astro";
import { db } from "../../../database/databaseUtils";
import { popPreviousPage } from "../../../components/dashboard/setPreviousPage.astro";

export const POST: APIRoute = async ({ request, redirect, cookies }) => {
    const formData = await request.formData();
    const goalId = formData.get("id")?.toString();

    if (!goalId) {
        return new Response(
            "Goal ID is required",
            { status: 400 }
        );
    }

    const { error } = await db.delete.goal(goalId);

    if (error) {
        console.log(error);
        return new Response(
            "Could not delete the given goal\n" + error.message,
            { status: 500 }
        );
    }

    const previousPage = popPreviousPage(cookies);
    if (!previousPage) {
        return redirect("/dashboard/goals");
    }
    return redirect(previousPage);
}
