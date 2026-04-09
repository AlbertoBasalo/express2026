import test, { expect } from "@playwright/test";

test.describe("Route handling", () => {
	test("returns 404 for unknown routes", async ({ page }) => {
		// Arrange
		const invalidRoute = "/invalid-route";

		// Act
		const response = await page.goto(invalidRoute);
		expect(response).not.toBeNull();

		// Assert
		expect(response?.status()).toBe(404);
		await expect(page.locator("body")).toContainText(`Route: ${invalidRoute}`);
	});
});
