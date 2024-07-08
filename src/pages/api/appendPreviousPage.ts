import type { APIRoute } from "astro";
import { auth } from "../../database/databaseUtils";
import { appendPreviousPage } from "../../components/dashboard/setPreviousPage.astro";

export const POST: APIRoute = async ({ request, redirect, cookies }) => {
    if (request.headers.get("Content-Type") !== "application/json") {
        return new Response("Content-Type must be application/json", { status: 400 });
    }

    const body = await request.json();
    const previousPage = body.previous_page;

    if (!previousPage) {
        return new Response("The previous page must be defined", { status: 400 });
    }

    const userId = auth.user.getId();
    if (!userId) {
        return new Response("Undefined user ID. Access forbidden", { status: 403 });
    }

    appendPreviousPage(cookies, previousPage);
    return new Response("OK", { status: 200 });
}
