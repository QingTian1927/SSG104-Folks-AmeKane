import * as supaUtils from "./supabase/utils";

// W3C HTML5 Specification:
// http://www.w3.org/TR/html5/forms.html#valid-e-mail-address
//
const EMAIL_REGEX = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";

function checkEmail(email: string) {
    if (!email) {
        return false;
    }
    return new RegExp(EMAIL_REGEX).test(email);
}

export const MIN_PASSWORD_LENGTH = 6;
export const PASSWORD_REGEX = `^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{${MIN_PASSWORD_LENGTH},}$`;

function checkPassword(password: string) {
    if (!password || password.length < MIN_PASSWORD_LENGTH) {
        return false;
    }

    let containsUppercase = false;
    let containsLowercase = false;
    let containsDigit = false;

    for (let i = 0; i < password.length; i++) {
        const currentChar = password[i];

        if (currentChar >= "A" && currentChar <= "Z") {
            containsUppercase = true;
        } else if (currentChar >= "a" && currentChar <= "z") {
            containsLowercase = true;
        } else if (currentChar >= "0" && currentChar <= "9") {
            containsDigit = true;
        }

        if (containsUppercase && containsLowercase && containsDigit) {
            return true;
        }
    }

    return (containsUppercase && containsLowercase && containsDigit);
}

// TODO: use DOMPurify to sanitize input.
function sanitizeInput(input: string) {
    const result = "";
    return result;
}

export const db = {
    auth: {
        checkEmail: checkEmail,
        checkPassword: checkPassword,
        sanitizeInput: sanitizeInput,

        getUserId: supaUtils.getUserId,
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
    }
}
