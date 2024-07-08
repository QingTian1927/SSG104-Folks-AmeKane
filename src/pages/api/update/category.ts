import type { APIRoute } from "astro";
import { db } from "../../../database/databaseUtils";
import { toBoolean, toNumber } from "../../../database/typeUtils";
import type { Enums } from "../../../database/database.types";
import { popPreviousPage } from "../../../components/dashboard/setPreviousPage.astro";

export const POST: APIRoute = async ({ request, redirect, cookies }) => {
    const formData = await request.formData();

    const categoryId = formData.get("id")?.toString();
    const title = formData.get("title")?.toString();
    const description = formData.get("description")?.toString();
    const spendingLimit = formData.get("spending_limit")?.toString();
    const isNecessity = formData.get("is_necessity")?.toString();
    const thisColor = formData.get("this_color")?.toString();

    if (!categoryId) {
        return new Response(
            "Category ID is required", { status: 400 },
        );
    }

    const { error } = await db.update.category(
        categoryId,
        {
            title: title,
            description: description,
            spending_limit: toNumber(spendingLimit) || undefined,
            is_necessity: toBoolean(isNecessity),
            this_color: thisColor as Enums<"Color">
        }
    );

    if (error) {
        return new Response(
            "Could not update the given category\n" + error.message,
            { status: 500 }
        );
    }

    const previousPage = popPreviousPage(cookies);
    if (!previousPage) {
        return redirect("/dashboard/categories");
    }
    return redirect(previousPage);
}
