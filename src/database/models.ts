import type { AuthError } from "@supabase/supabase-js";

export type ID = string | undefined;

export const ERROR_MESSAGES = {
    UNDEFINED_USER_ID: "User ID is undefined",
    UNDEFINED_ACCOUNT_ID: "Account ID is undefined",
    UNDEFINED_CATEGORY_ID: "Category ID is undefined",
    UNDEFINED_GOAL_ID: "Goal ID is undefined",
    UNDEFINED_TRANSACTION_ID: "Transaction ID is undefined",

    INVALID_OAUTH_PROVIDER: "Invalid OAuth provider",
    INVALID_TRANSACTION_VALUE: "Transaction value must be greater than 0",
    INVALID_ACCOUNT_BALANCE: "Account balance must be a real number",
    INVALID_CATEGORY_SPENDING_LIMIT: "Category spending limit must be greater or equal to zero",
    INVALID_GOAL_TARGET: "Goal target must be greater than zero",
    INVALID_GOAL_CURRENT: "Goal current must be greater than zero",
} as const;

export function errorResponse(param: any, message: string) {
    return {
        data: [],
        error: { message: `${message}: "${param}"` },
    };
}

export const VALID_PROVIDERS = [
    "google",
    "facebook"
] as const;

export function isIn<T>(values: readonly T[], x: any): x is T {
    return values.includes(x);
}

export function isValidProvider(provider: string) {
    return isIn(VALID_PROVIDERS, provider);
}

export type LoginErrorResponse = {
    email: string,
    password: string,
    error?: AuthError | null,
}
