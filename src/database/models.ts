export type UserId = string | undefined;

export const UndefinedUserIdError = (userId: any) => {
    return {
        message: `User ID is undefined: "${userId}"`
    };
};
