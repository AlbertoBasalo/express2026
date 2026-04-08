import { expect, test } from "vitest";
import { homeService } from "./home.service.js";

test('getHome should return "Welcome to a TypeScript backend"', () => {
	const actual = homeService.getHome();
	const expected = "Welcome to a TypeScript backend";
	expect(actual).toBe(expected);
});
