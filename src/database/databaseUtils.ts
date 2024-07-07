import * as supaUtils from "./supabase/utils";

export const auth = {
    exchangeCodeForSession: supaUtils.exchangeCodeForSession,

    user: {
        getId: supaUtils.getUserId,
        signInWithOAuth: supaUtils.signInWithOAuth,
        signInWithPassword: supaUtils.signInWithPassword,
        signOut: supaUtils.signOutUser,
    },

    admin: {
        deleteUser: supaUtils.deleteUser,
        updateUserMetadata: supaUtils.updateUserMetadata,
    }
}

export const db = {
    function: {
        getTotalBalance: supaUtils.getTotalBalance,
        getTotalExpense: supaUtils.getTotalExpense,
        getTotalIncome: supaUtils.getTotalIncome,
        getTotalSaving: supaUtils.getTotalSaving,

        getAccountTotalExpense: supaUtils.getAccountTotalExpense,
        getAccountTotalIncome: supaUtils.getAccountTotalIncome,

        getTotalSpendingByCategory: supaUtils.getTotalSpendingByCategory,
        getGoalProgress: supaUtils.getGoalProgress,
        getAccountExpenseRanking: supaUtils.getAccountExpenseRanking,
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
        transaction: supaUtils.deleteTransaction,
    },
};
