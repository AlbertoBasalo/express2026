import { expect, test } from "@playwright/test";

test("home page has welcome text", async ({ page }) => {
	await page.goto("");
	const actual = page.locator("body");
	await expect(actual).toContainText("Welcome");
});
