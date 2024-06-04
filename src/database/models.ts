export type ID = string | undefined;

export const ERROR_MESSAGES = {
    UNDEFINED_USER_ID: "User ID is undefined",
    UNDEFINED_ACCOUNT_ID: "Account ID is undefined",
    UNDEFINED_CATEGORY_ID: "Category ID is undefined",
    UNDEFINED_TRANSACTION_ID: "Transaction ID is undefined",

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
