import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { HomeRepository } from "./home.repository.js";
import { HomeService } from "./home.service.js";

describe("HomeService", () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
		vi.restoreAllMocks();
	});

	describe("getHome", () => {
		it("returns repository message with deterministic timestamp", async () => {
			// Arrange
			const fakeTimestamp = "2026-04-09T10:20:30.000Z";
			const fakeMessage = "Welcome to a TypeScript backend";
			const fakeNow = new Date(fakeTimestamp);
			vi.setSystemTime(fakeNow);
			const repositoryMock = {
				readHomeContent: vi.fn().mockResolvedValue({ message: fakeMessage }),
			} as unknown as HomeRepository;
			const service = new HomeService(repositoryMock);
			// Act
			const homeContent = await service.getHome();
			// Assert
			const expectedOutput = `${fakeMessage} ${fakeTimestamp}`;
			expect(homeContent).toBe(expectedOutput);
			expect(repositoryMock.readHomeContent).toHaveBeenCalledTimes(1);
		});
	});
});
