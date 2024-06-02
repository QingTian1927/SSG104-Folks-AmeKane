export type UserId = string | undefined;

export const ERROR_MESSAGES = {
    UNDEFINED_USER_ID: "User ID is undefined",
    UNDEFINED_ACCOUNT_ID: "Account ID is undefined",
    UNDEFINED_CATEGORY_ID: "Category ID is undefined",
    INVALID_TRANSACTION_VALUE: "Transaction value must be greater than 0",
} as const;

export function errorResponse(param: any, message: string) {
    return {
        data: [],
        error: { message: `${message}: "${param}"` },
    };
}
