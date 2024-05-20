// W3C HTML5 Specification:
// http://www.w3.org/TR/html5/forms.html#valid-e-mail-address
//
const EMAIL_REGEX = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";

export function checkEmail(email: string) {
    if (!email) {
        return false;
    }
    return new RegExp(EMAIL_REGEX).test(email);
}

export const MIN_PASSWORD_LENGTH = 6;
export const PASSWORD_REGEX = `^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{${MIN_PASSWORD_LENGTH},}$`;

export function checkPassword(password: string) {
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
export function sanitizeInput(input: string) {
    const result = "";
    return result;
}

export interface DatabaseHandler {
    getCurrentUser: () => any,
    signOutCurrentUser: () => void,
    signUpUser: (email: string, password: string) => { error: any },
    signInUser: (email: string, password: string) => { data: any, error: any },

    getAccount: (userId: string) => any,
    getCategories: (userId: string) => string[],
    getTransactions: (accountId: string) => any[],
}

export const db = {

}
