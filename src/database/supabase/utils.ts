import { supabase, supabaseElevated } from "./client";
import type { TablesInsert, TablesUpdate } from "../database.types";
import { ERROR_MESSAGES, errorResponse, isValidProvider, type ID } from "../models";
import type { Provider, UserMetadata } from "@supabase/supabase-js";

// ---------------
// USER MANAGEMENT
// ---------------

export async function getUserId() {
    const { data } = await supabase.auth.getUser();

    if (!data || !data.user || !data.user.id) {
        return undefined;
    }
    return data.user?.id;
}

export async function signOutUser() {
    return await supabase.auth.signOut();
}

export async function signInWithOAuth(provider: string) {
    if (!provider || !isValidProvider(provider)) {
        return errorResponse(provider, ERROR_MESSAGES.INVALID_OAUTH_PROVIDER);
    }

    return await supabase.auth.signInWithOAuth({
        provider: provider as Provider,
        options: {
            redirectTo: `${import.meta.env.SITE_URL}/api/auth/callback`,
        }
    });
}

export async function exchangeCodeForSession(code: string) {
    return await supabase.auth.exchangeCodeForSession(code);
}

export async function signInWithPassword(email: string, password: string) {
    return await supabase.auth.signInWithPassword({
        email,
        password,
    });
}

export async function updateUserMetadata(userId: ID, metadata: UserMetadata) {
    if (!userId) {
        return errorResponse(userId, ERROR_MESSAGES.UNDEFINED_USER_ID);
    }
    return await supabaseElevated.auth.admin.updateUserById(userId, { user_metadata: metadata });
}

export async function deleteUser(userId: ID) {
    if (!userId) {
        return errorResponse(userId, ERROR_MESSAGES.UNDEFINED_USER_ID);
    }
    return await supabaseElevated.auth.admin.deleteUser(userId);
}

// -------------
// DATABASE READ
// -------------

export async function getAccount(userId: ID) {
    if (!userId) {
        return errorResponse(userId, ERROR_MESSAGES.UNDEFINED_USER_ID);
    }
    return await supabase.from("Account").select().eq("user_id", userId);
}

export async function getPreferences(userId: ID) {
    if (!userId) {
        return errorResponse(userId, ERROR_MESSAGES.UNDEFINED_USER_ID);
    }
    return await supabase.from("Preferences").select().eq("user_id", userId);
}

export async function getCategory(userId: ID) {
    if (!userId) {
        return errorResponse(userId, ERROR_MESSAGES.UNDEFINED_USER_ID);
    }
    return await supabase.from("Category").select().eq("user_id", userId);
}

export async function getGoal(userId: ID) {
    if (!userId) {
        return errorResponse(userId, ERROR_MESSAGES.UNDEFINED_USER_ID);
    }
    return await supabase.from("Goal").select().eq("user_id", userId);
}

export async function getTransaction(accountId: string) {
    if (!accountId) {
        return errorResponse(accountId, ERROR_MESSAGES.UNDEFINED_ACCOUNT_ID);
    }
    return await supabase
        .from("Transaction")
        .select()
        .eq("account_id", accountId);
}

// ---------------
// DATABASE INSERT
// ---------------

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
    if (
        !goal.current ||
        goal.current < 0 ||
        goal.current > goal.target ||
        isNaN(goal.current)
    ) {
        goal.current = 0;
    }

    return await supabase.from("Goal").insert(goal).select();
}

export async function createCategory(category: TablesInsert<"Category">) {
    if (!category.user_id) {
        return errorResponse(
            category.user_id,
            ERROR_MESSAGES.UNDEFINED_USER_ID
        );
    }

    category.is_necessity ??= false;
    category.this_color ??= "blue";

    if (
        !category.spending_limit ||
        category.spending_limit < 0 ||
        isNaN(category.spending_limit)
    ) {
        category.spending_limit = 0;
    }

    return await supabase.from("Category").insert(category).select();
}

export async function createTransaction(
    transaction: TablesInsert<"Transaction">
) {
    if (!transaction.account_id) {
        return errorResponse(
            transaction.account_id,
            ERROR_MESSAGES.UNDEFINED_ACCOUNT_ID
        );
    }
    if (!transaction.category_id) {
        return errorResponse(
            transaction.category_id,
            ERROR_MESSAGES.UNDEFINED_CATEGORY_ID
        );
    }
    if (
        !transaction.value ||
        isNaN(transaction.value) ||
        transaction.value <= 0
    ) {
        return errorResponse(
            transaction.value,
            ERROR_MESSAGES.INVALID_TRANSACTION_VALUE
        );
    }

    return await supabase.from("Transaction").insert(transaction).select();
}

// ---------------
// DATABASE UPDATE
// ---------------

export async function updateAccount(
    accountId: ID,
    contents: TablesUpdate<"Account">
) {
    if (!accountId) {
        return errorResponse(accountId, ERROR_MESSAGES.UNDEFINED_ACCOUNT_ID);
    }

    if (!contents.balance || isNaN(contents.balance)) {
        return errorResponse(
            contents.balance,
            ERROR_MESSAGES.INVALID_ACCOUNT_BALANCE
        );
    }

    return await supabase
        .from("Account")
        .update(contents)
        .eq("id", accountId)
        .select();
}

export async function updateCategory(
    categoryId: ID,
    contents: TablesUpdate<"Category">
) {
    if (!categoryId) {
        return errorResponse(categoryId, ERROR_MESSAGES.UNDEFINED_CATEGORY_ID);
    }

    if (contents.spending_limit === undefined) {
        return await supabase
            .from("Category")
            .update(contents)
            .eq("id", categoryId)
            .select();
    }

    if (
        contents.spending_limit === null ||
        isNaN(contents.spending_limit) ||
        contents.spending_limit < 0
    ) {
        return errorResponse(
            categoryId,
            ERROR_MESSAGES.INVALID_CATEGORY_SPENDING_LIMIT
        );
    }
    return await supabase
        .from("Category")
        .update(contents)
        .eq("id", categoryId)
        .select();
}

export async function updateGoal(goalId: ID, contents: TablesUpdate<"Goal">) {
    if (!goalId) {
        return errorResponse(goalId, ERROR_MESSAGES.UNDEFINED_CATEGORY_ID);
    }

    const { data: currentTargetData, error } = await supabase
        .from("Goal")
        .select("target")
        .eq("id", goalId);

    if (error) {
        return errorResponse(
            error,
            "Could not retrieve the current target of the given spending goal\n"
        );
    }

    if (contents.target === undefined && contents.current === undefined) {
        return await supabase
            .from("Goal")
            .update(contents)
            .eq("id", goalId)
            .select();
    }

    const isInvalidTarget =
        contents.target !== undefined &&
        (contents.target === null ||
            isNaN(contents.target) ||
            contents.target < 0);
    if (isInvalidTarget) {
        return errorResponse(
            contents.target,
            ERROR_MESSAGES.INVALID_GOAL_TARGET
        );
    }

    const isInvalidCurrent =
        contents.current !== undefined &&
        (contents.current === null ||
            isNaN(contents.current) ||
            contents.current < 0 ||
            contents.current > currentTargetData[0].target);
    if (isInvalidCurrent) {
        return errorResponse(
            contents.target,
            ERROR_MESSAGES.INVALID_GOAL_TARGET
        );
    }

    return await supabase
        .from("Goal")
        .update(contents)
        .eq("id", goalId)
        .select();
}

export async function updatePreferences(
    userId: ID,
    contents: TablesUpdate<"Preferences">
) {
    if (!userId) {
        return errorResponse(userId, ERROR_MESSAGES.UNDEFINED_USER_ID);
    }
    return await supabase
        .from("Preferences")
        .update(contents)
        .eq("user_id", userId)
        .select();
}

export async function updateTransaction(
    transactionId: ID,
    contents: TablesUpdate<"Transaction">
) {
    if (!transactionId) {
        return errorResponse(
            transactionId,
            ERROR_MESSAGES.UNDEFINED_TRANSACTION_ID
        );
    }
    if (contents.account_id === null || contents.category_id === null) {
        return errorResponse(
            "",
            "Cannot set Account ID or Category ID to null"
        );
    }

    const isInvalidValue =
        contents.value !== undefined &&
        (contents.value === null ||
            isNaN(contents.value) ||
            contents.value < 0);
    if (isInvalidValue) {
        return errorResponse(
            contents.value,
            ERROR_MESSAGES.INVALID_TRANSACTION_VALUE
        );
    }

    return await supabase
        .from("Transaction")
        .update(contents)
        .eq("id", transactionId)
        .select();
}

// ---------------
// DATABASE DELETE
// ---------------

export async function deleteAccount(accountId: ID) {
    if (!accountId) {
        return errorResponse(accountId, ERROR_MESSAGES.UNDEFINED_ACCOUNT_ID);
    }
    return await supabase.from("Account").delete().eq("id", accountId).select();
}

export async function deleteCategory(categoryId: ID) {
    if (!categoryId) {
        return errorResponse(categoryId, ERROR_MESSAGES.UNDEFINED_CATEGORY_ID);
    }
    return await supabase.from("Category").delete().eq("id", categoryId).select();
}

export async function deleteGoal(goalId: ID) {
    if (!goalId) {
        return errorResponse(goalId, ERROR_MESSAGES.UNDEFINED_GOAL_ID);
    }
    return await supabase.from("Goal").delete().eq("id", goalId).select();
}

export async function deleteTransaction(transactionId: ID) {
    if (!transactionId) {
        return errorResponse(transactionId, ERROR_MESSAGES.UNDEFINED_TRANSACTION_ID);
    }
    return await supabase.from("Transaction").delete().eq("id", transactionId).select();
}

// -------------------
// AGGREGATE FUNCTIONS
// -------------------

export async function getTotalBalance(userId: ID) {
    if (!userId) {
        return errorResponse(userId, ERROR_MESSAGES.UNDEFINED_USER_ID);
    }
    return await supabase.rpc("get_total_balance", { query_user_id: userId });
}

export async function getTotalIncome(userId: ID) {
    if (!userId) {
        return errorResponse(userId, ERROR_MESSAGES.UNDEFINED_USER_ID);
    }
    return await supabase.rpc("get_total_income", { query_user_id: userId });
}

export async function getTotalExpense(userId: ID) {
    if (!userId) {
        return errorResponse(userId, ERROR_MESSAGES.UNDEFINED_USER_ID);
    }
    return await supabase.rpc("get_total_expense", { query_user_id: userId });
}

export async function getTotalSaving(userId: ID) {
    if (!userId) {
        return errorResponse(userId, ERROR_MESSAGES.UNDEFINED_USER_ID);
    }
    return await supabase.rpc("get_total_saving", { query_user_id: userId });
}

export async function getAccountTotalExpense(accountId: ID) {
    if (!accountId) {
        return errorResponse(accountId, ERROR_MESSAGES.UNDEFINED_ACCOUNT_ID);
    }
    return await supabase.rpc("get_account_total_expense", { query_account_id: accountId });
}

export async function getAccountTotalIncome(accountId: ID) {
    if (!accountId) {
        return errorResponse(accountId, ERROR_MESSAGES.UNDEFINED_ACCOUNT_ID);
    }
    return await supabase.rpc("get_account_total_income", { query_account_id: accountId });
}

export async function getTotalSpendingByCategory(userId: ID, limit?: number) {
    if (!userId) {
        return errorResponse(userId, ERROR_MESSAGES.UNDEFINED_USER_ID);
    }
    if (limit && limit < 0) {
        return errorResponse(limit, "Query limit must be equal or greater than 0");
    }

    if (limit === undefined) {
        return await supabase.rpc("get_category_spending", { query_user_id: userId });
    }
    return await supabase.rpc("get_category_spending", { query_user_id: userId }).limit(limit);
}

export async function getGoalProgress(userId: ID, limit?: number) {
    if (!userId) {
        return errorResponse(userId, ERROR_MESSAGES.UNDEFINED_USER_ID);
    }
    if (limit && limit < 0) {
        return errorResponse(limit, "Query limit must be equal or greater than 0");
    }

    if (limit === undefined) {
        return await supabase.rpc("get_goal_progress", { query_user_id: userId });
    }
    return await supabase.rpc("get_goal_progress", { query_user_id: userId }).limit(limit);
}

export async function getAccountExpenseRanking(userId: ID, limit?: number) {
    if (!userId) {
        return errorResponse(userId, ERROR_MESSAGES.UNDEFINED_USER_ID);
    }
    if (limit && limit < 0) {
        return errorResponse(limit, "Query limit must be equal or greater than 0");
    }

    if (limit === undefined) {
        return await supabase.rpc("get_account_expense_ranking", { query_user_id: userId });
    }
    return await supabase.rpc("get_account_expense_ranking", { query_user_id: userId }).limit(limit);
}
