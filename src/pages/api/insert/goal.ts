import type { APIRoute } from "astro";
import { db, auth } from "../../../database/databaseUtils";
import { toNumber } from "../../../database/typeUtils";
import { popPreviousPage } from "../../../components/dashboard/setPreviousPage.astro";

export const POST: APIRoute = async ({ request, redirect, cookies }) => {
    const formData = await request.formData();

    const target = formData.get("target")?.toString();
    const current = formData.get("current")?.toString();
    const title = formData.get("title")?.toString();
    const description = formData.get("description")?.toString();

    if (!title) {
        return new Response(
            "Goal title is required", { status: 400 }
        );
    }

    const userId = await auth.user.getId();
    if (!userId) {
        return new Response(
            "Could not retrieve the User ID", { status: 500 }
        );
    }

    const { error } = await db.insert.goal({
        user_id: userId,
        target: toNumber(target),
        current: toNumber(current),
        title: title,
        description: description,
    });

    if (error) {
        return new Response(
            "Could not insert the newly created goal\n" + error.message,
            { status: 500 }
        );
    }

    const previousPage = popPreviousPage(cookies);
    if (!previousPage) {
        return redirect("/dashboard/goals");
    }
    return redirect(previousPage);
}
