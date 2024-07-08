import type { APIRoute } from "astro";
import { db, auth } from "../../../database/databaseUtils";
import { toBoolean, toNumber } from "../../../database/typeUtils";
import type { Enums } from "../../../database/database.types";
import { popPreviousPage } from "../../../components/dashboard/setPreviousPage.astro";

export const POST: APIRoute = async ({ request, redirect, cookies }) => {
    const formData = await request.formData();

    const spendingLimit = formData.get("spending_limit")?.toString();
    const isNecessity = formData.get("is_necessity")?.toString();
    const color = formData.get("this_color")?.toString();
    const title = formData.get("title")?.toString();
    const description = formData.get("description")?.toString();

    if (!title) {
        return new Response(
            "Category title is required", { status: 400 }
        );
    }

    const userId = await auth.user.getId();
    if (!userId) {
        return new Response(
            "Could not retrieve the User ID", { status: 500 }
        );
    }

    const { error } = await db.insert.category({
        user_id: userId,
        spending_limit: toNumber(spendingLimit),
        is_necessity: toBoolean(isNecessity),
        this_color: color as Enums<"Color">,
        title: title,
        description: description,
    });

    if (error) {
        return new Response(
            "Could not insert the newly created category\n" + error.message,
            { status: 500 }
        );
    }

    const previousPage = popPreviousPage(cookies);
    if (!previousPage) {
        return redirect("/dashboard/categories");
    }
    return redirect(previousPage);
}

