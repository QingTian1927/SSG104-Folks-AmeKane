import { test, expect } from "vitest";
import { checkPassword } from "../../src/database/databaseUtils";

/* Minimum password requirements:
 *
 *   *) At least 6 characters in length
 *   *) At least 1 UPPERCASE character
 *   *) At least 1 lowercase character
 *   *) At least 1 digit (0-9)
 */

test("'Password123' -> checkPassword() -> true", () => {
  expect(checkPassword("Password123")).toBe(true);
});

test("'password' -> checkPassword() -> false", () => {
  expect(checkPassword("password")).toBe(false);
});
