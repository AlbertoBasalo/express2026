import { expect, test } from "@playwright/test";

test.describe("Home route", () => {
	test("shows welcome text on root route", async ({ page }) => {
		// Arrange
		const expectedText = "Welcome";
		// Act
		await page.goto("/");
		// Assert
		const body = page.locator("body");
		await expect(body).toContainText(expectedText);
	});

	test("returns 400 when query parameters are provided", async ({ page }) => {
		// Arrange
		const expectedError = "Query parameters are not allowed";
		// Act
		const response = await page.goto("/?lang=en");
		// Assert
		expect(response).not.toBeNull();
		expect(response?.status()).toBe(400);
		const body = page.locator("body");
		await expect(body).toContainText(expectedError);
	});
});
