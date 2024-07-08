import type { APIRoute } from "astro";
import { db } from "../../../database/databaseUtils";
import { toNumber } from "../../../database/typeUtils";
import { popPreviousPage } from "../../../components/dashboard/setPreviousPage.astro";

export const POST: APIRoute = async ({ request, redirect, cookies }) => {
    const formData = await request.formData();

    const goalId = formData.get("id")?.toString();
    const title = formData.get("title")?.toString();
    const description = formData.get("description")?.toString();
    const target = formData.get("target")?.toString();
    const current = formData.get("current")?.toString();

    if (!goalId) {
        return new Response(
            "Goal ID is required", { status: 400 },
        );
    }

    const { error } = await db.update.goal(
        goalId,
        {
            title: title,
            description: description,
            target: toNumber(target) || undefined,
            current: toNumber(current) || undefined,
        }
    );

    if (error) {
        return new Response(
            "Could not update the given goal\n" + error.message,
            { status: 500 }
        );
    }

    const previousPage = popPreviousPage(cookies);
    if (!previousPage) {
        return redirect("/dashboard/goals");
    }
    return redirect(previousPage);
}
