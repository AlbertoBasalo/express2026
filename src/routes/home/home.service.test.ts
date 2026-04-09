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
			const fakeNow = new Date("2026-04-09T10:20:30.000Z");
			vi.setSystemTime(fakeNow);
			const repositoryMock = {
				readHomeContent: vi
					.fn()
					.mockResolvedValue({ message: "Welcome to a TypeScript backend" }),
			} as unknown as HomeRepository;
			const service = new HomeService(repositoryMock);

			// Act
			const homeContent = await service.getHome();

			// Assert
			expect(homeContent).toBe(
				"Welcome to a TypeScript backend 2026-04-09T10:20:30.000Z",
			);
			expect(repositoryMock.readHomeContent).toHaveBeenCalledTimes(1);
		});
	});
});
