import type { APIRoute } from "astro";
import { auth } from "../../database/databaseUtils";
import { popPreviousPage } from "../../components/dashboard/setPreviousPage.astro";

export const POST: APIRoute = async ({ cookies }) => {
    const userId = auth.user.getId();
    if (!userId) {
        return new Response("Undefined user ID. Access forbidden", { status: 403 });
    }

    const previousPage = popPreviousPage(cookies);
    console.log({previousPage})
    return new Response(JSON.stringify({previousPage}), { status: 200 });
}
