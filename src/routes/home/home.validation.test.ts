import type { Request } from "express";
import { describe, expect, it } from "vitest";
import { HomeValidator } from "./home.validation.js";

describe("HomeValidator", () => {
	const validator = new HomeValidator();

	describe("validateGetHome", () => {
		it("returns null when no query parameters are present", () => {
			// Arrange
			const reqInput = { query: {} } as unknown as Request;

			// Act
			const validationError = validator.validateGetHome(reqInput);

			// Assert
			expect(validationError).toBeNull();
		});

		it("returns an error when query parameters are present", () => {
			// Arrange
			const reqInput = { query: { lang: "en" } } as unknown as Request;

			// Act
			const validationError = validator.validateGetHome(reqInput);

			// Assert
			expect(validationError).toBe("Query parameters are not allowed");
		});
	});
});
