import test, { expect } from "@playwright/test";

test.describe("Route handling", () => {
	test("returns 404 for unknown routes", async ({ page }) => {
		// Arrange
		const invalidRoute = "/invalid-route";

		// Act
		const response = await page.goto(invalidRoute);

		// Assert
		expect(response).not.toBeNull();
		expect(response?.status()).toBe(404);
		const body = page.locator("body");
		await expect(body).toContainText(`Route: ${invalidRoute}`);
	});
});
