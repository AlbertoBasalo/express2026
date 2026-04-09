import { expect, test, vi } from "vitest";
import { createHomeService } from "./home.service.js";

test("getHome returns repository message with timestamp", async () => {
	const repositoryMock = {
		readHomeContent: vi
			.fn()
			.mockResolvedValue({ message: "Welcome to a TypeScript backend" }),
	};

	const service = createHomeService(repositoryMock);
	const homeContent = await service.getHome();
	const expectedMessage = "Welcome to a TypeScript backend";
	expect(homeContent).toContain(expectedMessage);
	// ends with a timestamp in the format YYYY-MM-DDTHH:MM:SS.SSSZ
	const timeStampRegex = / \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
	expect(homeContent).toMatch(timeStampRegex);
	expect(repositoryMock.readHomeContent).toHaveBeenCalledTimes(1);
});
