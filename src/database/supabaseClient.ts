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

export type UserId = string | undefined;

const UndefinedUserIdError = (userId: any) => `User ID is undefined: "${userId}"`;

export async function getAccount(userId: UserId) {
    if (!userId) {
        return { data: [], error: UndefinedUserIdError(userId) }
    }
    return await supabase.from("Account").select().eq('user_id', userId);
}

export async function getPreferences(userId: UserId) {
    if (!userId) {
        return { data: [], error: UndefinedUserIdError(userId) }
    }
    return await supabase.from("Preferences").select().eq('user_id', userId);
}

export async function getCategory(userId: UserId) {
    if (!userId) {
        return { data: [], error: UndefinedUserIdError(userId) }
    }
    return await supabase.from("Category").select().eq('user_id', userId);
}

export async function getGoal(userId: UserId) {
    if (!userId) {
        return { data: [], error: UndefinedUserIdError(userId) }
    }
    return await supabase.from("Goal").select().eq('user_id', userId);
}

export async function getTransaction() {
    return await supabase.from("Transaction").select();
}
