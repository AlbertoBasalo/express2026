import type { Request } from "express";
import { describe, expect, it } from "vitest";
import { HomeValidator } from "./home.validation.js";
import { ok, err } from "../../shared/result.type.js";

describe("HomeValidator", () => {
	const validator = new HomeValidator();

	describe("validateGetHome", () => {
		it("returns ok when no query parameters are present", () => {
			// Arrange
			const reqInput = { query: {} } as unknown as Request;

			// Act
			const result = validator.validateGetHome(reqInput);

			// Assert
			expect(result).toEqual(ok(undefined));
		});

		it("returns an err when query parameters are present", () => {
			// Arrange
			const reqInput = { query: { lang: "en" } } as unknown as Request;

			// Act
			const result = validator.validateGetHome(reqInput);

			// Assert
			expect(result).toEqual(err("Query parameters are not allowed"));
		});
	});
});
