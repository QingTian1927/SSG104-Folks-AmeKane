import { createClient } from "@supabase/supabase-js";
import { type Database } from "./database.types";

export const supabase = createClient<Database>(
    import.meta.env.SUPABASE_URL,
    import.meta.env.SUPABASE_ANON_KEY,
    {
        auth: {
            flowType: "pkce",
        },
    },
);

export async function getAccount() {
    return await supabase.from("Account").select();
}
export async function getPreferences() {
    return await supabase.from("Preferences").select();
}
export async function getCategory() {
    return await supabase.from("Category").select();
}
export async function getGoal() {
    return await supabase.from("Goal").select();
}
export async function getTransaction() {
    return await supabase.from("Transaction").select();
}
