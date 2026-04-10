import type { Request, Response } from "express";
import { describe, expect, it, vi } from "vitest";
import { HTTP_CODES } from "../../shared/rest.consts.js";
import { err, ok } from "../../shared/result.type.js";
import { HomeController } from "./home.controller.js";
import type { HomeService } from "./home.service.js";

describe("HomeController", () => {
	describe("validateGetHome", () => {
		const controller = new HomeController();

		it("returns ok when no query parameters are present", () => {
			// Arrange
			const reqInput = { query: {} } as unknown as Request;
			// Act
			const result = controller.validateGetHome(reqInput);
			// Assert
			expect(result).toEqual(ok(undefined));
		});

		it("returns an err when query parameters are present", () => {
			// Arrange
			const reqInput = { query: { lang: "en" } } as unknown as Request;
			// Act
			const result = controller.validateGetHome(reqInput);
			// Assert
			expect(result).toEqual(err("Query parameters are not allowed"));
		});
	});

	describe("getHome", () => {
		it("returns 200 with the service response", async () => {
			// Arrange
			const serviceOutput = "Hello from service";
			const serviceMock = {
				getHome: vi.fn().mockResolvedValue(serviceOutput),
			} as unknown as HomeService;
			const controller = new HomeController(serviceMock);
			const sendMock = vi.fn();
			const statusMock = vi.fn().mockReturnValue({
				send: sendMock,
			});
			const responseMock = {
				status: statusMock,
			} as unknown as Response;
			// Act
			await controller.getHome({} as Request, responseMock);
			// Assert
			expect(serviceMock.getHome).toHaveBeenCalledOnce();
			expect(statusMock).toHaveBeenCalledWith(HTTP_CODES.OK);
			expect(sendMock).toHaveBeenCalledWith(serviceOutput);
		});
	});
});
