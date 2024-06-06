import * as supaUtils from "./supabase/utils";

// TODO: use DOMPurify to sanitize input.
function sanitizeInput(input: string) {
    const result = "";
    return result;
}

export const auth = {
    sanitizeInput: sanitizeInput,

    admin: {
        deleteUser: supaUtils.deleteUser,
    }
}

export const db = {
    user: {
        getId: supaUtils.getUserId,
        signOut: supaUtils.signOutUser,
    },

    select: {
        account: supaUtils.getAccount,
        preferences: supaUtils.getPreferences,
        category: supaUtils.getCategory,
        goal: supaUtils.getGoal,
        transaction: supaUtils.getTransaction,
    },

    insert: {
        account: supaUtils.createAccount,
        goal: supaUtils.createGoal,
        category: supaUtils.createCategory,
        transaction: supaUtils.createTransaction,
    },

    update: {
        account: supaUtils.updateAccount,
        category: supaUtils.updateCategory,
        goal: supaUtils.updateGoal,
        preferences: supaUtils.updatePreferences,
        transaction: supaUtils.updateTransaction,
    },

    delete: {
        account: supaUtils.deleteAccount,
        category: supaUtils.deleteCategory,
        goal: supaUtils.deleteGoal,
        transition: supaUtils.deleteTransaction,
    },
};
