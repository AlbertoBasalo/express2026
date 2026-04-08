import { expect, test } from "@playwright/test";

test("has welcome text", async ({ page }) => {
	await page.goto("http://localhost:3000/");
	const actual = page.locator("body");
	await expect(actual).toContainText("Welcome");
});
