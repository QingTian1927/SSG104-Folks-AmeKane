import type { Tables } from "../../../../database/database.types";
import { db } from "../../../../database/databaseUtils";
import type { ID } from "../../../../database/models";
import { supabase } from "../../../../database/supabase/client";

async function getFirstAccount(userId: ID, preferences: Tables<"Preferences">) {
    if (!userId) {
        console.error("Cannot retrieve userId");
        return undefined;
    }

    const getFirstAccount = async () => {
        const { data, error } = await supabase
            .from("Account")
            .select()
            .eq("user_id", userId)
            .limit(1)
            .single();
        if (error) {
            console.error(error);
            return undefined;
        }
        return data;
    };

    if (!preferences.default_account) {
        return await getFirstAccount();
    }

    const { data, error } = await supabase
        .from("Account")
        .select()
        .eq("id", preferences.default_account)
        .limit(1)
        .single();
    if (error) {
        console.error(error);
        return undefined;
    }

    if (data) {
        return data;
    }
    return await getFirstAccount();
}

async function getOffsetAccount(
    accountNumber: number,
    userId: ID,
    preferences: Tables<"Preferences">
) {
    if (!userId) {
        console.error("Cannot retrieve userId");
        return undefined;
    }

    const getAccountAtNumber = async () => {
        const { data, error } = await supabase
            .from("Account")
            .select()
            .eq("user_id", userId)
            .range(accountNumber - 1, accountNumber - 1)
            .limit(1)
            .single();
        if (error) {
            console.error(error);
            return undefined;
        }
        return data;
    };

    if (!preferences.default_account) {
        return await getAccountAtNumber();
    }

    const { data, error } = await supabase
        .from("Account")
        .select()
        .neq("id", preferences.default_account)
        .range(accountNumber - 2, accountNumber - 2)
        .limit(1)
        .single();
    if (error) {
        console.error(error);
        return undefined;
    }

    if (data) {
        return data;
    }
    return await getAccountAtNumber();
}

export async function selectAccount(
    accountNumber: number,
    userId: ID,
    preferences: Tables<"Preferences">
) {
    if (accountNumber === 1) {
        return await getFirstAccount(userId, preferences);
    }
    return await getOffsetAccount(accountNumber, userId, preferences);
}

export function getAdjacentPages(accountNumber: number, accountCount: number) {
    const prevPage = accountNumber === 1 ? null : accountNumber - 1;
    const nextPage = accountNumber === accountCount ? null : accountNumber + 1;
    return [prevPage, nextPage];
}
