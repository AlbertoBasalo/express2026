import { expect, test } from "@playwright/test";

test.describe("Home route", () => {
	test("shows welcome text on root route", async ({ page }) => {
		// Arrange
		const expectedText = "Welcome";

		// Act
		await page.goto("/");

		// Assert
		await expect(page.locator("body")).toContainText(expectedText);
	});

	test("returns 400 when query parameters are provided", async ({ page }) => {
		// Arrange
		const expectedError = "Query parameters are not allowed";

		// Act
		const response = await page.goto("/?lang=en");
		expect(response).not.toBeNull();

		// Assert
		expect(response?.status()).toBe(400);
		await expect(page.locator("body")).toContainText(expectedError);
	});
});
