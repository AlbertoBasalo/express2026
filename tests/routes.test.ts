import test, { expect } from "@playwright/test";

test("not found route returns a 404", async ({ page }) => {
	const invalidRoute = "/invalid-route";
	const response = await page.goto(invalidRoute);
	expect(response).not.toBeNull();
	const body = await response?.text();
	const status = response?.status();
	expect(status).toBe(404);
	expect(body).toContain(`Route: ${invalidRoute}`);
});
