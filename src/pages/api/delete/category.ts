import type { APIRoute } from "astro";
import { db } from "../../../database/databaseUtils";
import { popPreviousPage } from "../../../components/dashboard/setPreviousPage.astro";

export const POST: APIRoute = async ({ request, redirect, cookies }) => {
    const formData = await request.formData();
    const categoryId = formData.get("id")?.toString();

    if (!categoryId) {
        return new Response(
            "Category ID is required",
            { status: 400 }
        );
    }

    const { error } = await db.delete.category(categoryId);

    if (error) {
        console.log(error);
        return new Response(
            "Could not delete the given category\n" + error.message,
            { status: 500 }
        );
    }

    const previousPage = popPreviousPage(cookies);
    if (!previousPage) {
        return redirect("/dashboard/categories");
    }
    return redirect(previousPage);
}
