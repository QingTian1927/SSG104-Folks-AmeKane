import { supabase } from "./client";
import type { TablesInsert, TablesUpdate } from "../database.types";
import { ERROR_MESSAGES, errorResponse, type ID } from "../models";

export async function getUserId() {
    const { data } = await supabase.auth.getUser();

    if (!data || !data.user || !data.user.id) {
        return undefined;
    }
    return data.user?.id;
}

export async function getAccount(userId: ID) {
    if (!userId) {
        return errorResponse(userId, ERROR_MESSAGES.UNDEFINED_USER_ID);
    }
    return await supabase.from("Account").select().eq('user_id', userId);
}

export async function getPreferences(userId: ID) {
    if (!userId) {
        return errorResponse(userId, ERROR_MESSAGES.UNDEFINED_USER_ID);
    }
    return await supabase.from("Preferences").select().eq('user_id', userId);
}

export async function getCategory(userId: ID) {
    if (!userId) {
        return errorResponse(userId, ERROR_MESSAGES.UNDEFINED_USER_ID);
    }
    return await supabase.from("Category").select().eq('user_id', userId);
}

export async function getGoal(userId: ID) {
    if (!userId) {
        return errorResponse(userId, ERROR_MESSAGES.UNDEFINED_USER_ID);
    }
    return await supabase.from("Goal").select().eq('user_id', userId);
}

export async function getTransaction(accountId: string) {
    if (!accountId) {
        return errorResponse(accountId, ERROR_MESSAGES.UNDEFINED_ACCOUNT_ID);
    }
    return await supabase.from("Transaction").select().eq('account_id', accountId);
}

export async function createAccount(account: TablesInsert<"Account">) {
    if (!account.user_id) {
        return errorResponse(account.user_id, ERROR_MESSAGES.UNDEFINED_USER_ID);
    }

    if (!account.balance || account.balance < 0 || isNaN(account.balance)) {
        account.balance = 0;
    }
    account.is_saving ??= false;

    return await supabase.from("Account").insert(account).select();
}

export async function createGoal(goal: TablesInsert<"Goal">) {
    if (!goal.user_id) {
        return errorResponse(goal.user_id, ERROR_MESSAGES.UNDEFINED_USER_ID);
    }

    if (!goal.target || goal.target < 0 || isNaN(goal.target)) {
        goal.target = 0;
    }
    if (!goal.current || goal.current < 0 || goal.current > goal.target || isNaN(goal.current)) {
        goal.current = 0;
    }

    return await supabase.from("Goal").insert(goal).select();
}

export async function createCategory(category: TablesInsert<"Category">) {
    if (!category.user_id) {
        return errorResponse(category.user_id, ERROR_MESSAGES.UNDEFINED_USER_ID);
    }

    category.is_necessity ??= false;
    category.this_color ??= "blue";

    if (!category.spending_limit || category.spending_limit < 0 || isNaN(category.spending_limit)) {
        category.spending_limit = 0;
    }

    return await supabase.from("Category").insert(category).select();
}

export async function createTransaction(transaction: TablesInsert<"Transaction">) {
    if (!transaction.account_id) {
        return errorResponse(transaction.account_id, ERROR_MESSAGES.UNDEFINED_ACCOUNT_ID);
    }
    if (!transaction.category_id) {
        return errorResponse(transaction.category_id, ERROR_MESSAGES.UNDEFINED_CATEGORY_ID);
    }
    if (!transaction.value || isNaN(transaction.value) || transaction.value <= 0) {
        return errorResponse(transaction.value, ERROR_MESSAGES.INVALID_TRANSACTION_VALUE);
    }

    return await supabase.from("Transaction").insert(transaction).select();
}

export async function updateAccount(accountId: ID, contents: TablesUpdate<"Account">) {
    if (!accountId) {
        return errorResponse(accountId, ERROR_MESSAGES.UNDEFINED_ACCOUNT_ID);
    }

    if (!contents.balance || isNaN(contents.balance) || contents.balance <= 0) {
        return errorResponse(contents.balance, ERROR_MESSAGES.INVALID_ACCOUNT_BALANCE);
    }

    return await supabase.from("Account").update(contents).eq('id', accountId).select();
}
