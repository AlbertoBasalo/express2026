import type { Request } from "express";
import { expect, test } from "vitest";
import { validateGetHome } from "./home.validation.js";

test("validateGetHome returns null if no query parameters", () => {
	const reqInput = { query: {} } as unknown as Request;
	const validationError = validateGetHome(reqInput);
	expect(validationError).toBeNull();
});

test("validateGetHome returns an error if query parameters are present", () => {
	const reqInput = { query: { lang: "en" } } as unknown as Request;
	const validationError = validateGetHome(reqInput);
	expect(validationError).toBe("Query parameters are not allowed");
});
