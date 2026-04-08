import { expect, test } from "vitest";
import { homeService } from "./home.service.js";

test('getHome should return "Welcome to a TypeScript backend"', () => {
	const actual: string = homeService.getHome();
	const expected = "Welcome to a TypeScript backend with Express";
	expect(actual).toBe(expected);
});
