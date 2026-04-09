import { expect, test } from "@playwright/test";

test("home page has welcome text", async ({ page }) => {
	await page.goto("");
	const body = page.locator("body");
	await expect(body).toContainText("Welcome");
});

test("home page returns a 400 if query parameters are present", async ({
	page,
}) => {
	const response = await page.goto("/?lang=en");
	expect(response).not.toBeNull();
	const body = await response?.text();
	const status = response?.status();
	expect(status).toBe(400);
	expect(body).toContain("Query parameters are not allowed");
});
