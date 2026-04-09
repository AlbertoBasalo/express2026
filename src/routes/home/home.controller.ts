import type { Request, Response } from "express";
import { createValidator } from "../../middleware/validate.middleware.js";
import { HTTP_CODES } from "../../shared/rest.consts.js";
import { createHomeService, type HomeService } from "./home.service.js";
import { validateGetHome } from "./home.validation.js";

export interface HomeController {
	getHome: (_req: Request, res: Response) => Promise<Response>;
}

export const getHomeValidator = createValidator(validateGetHome);

export const createHomeController = (
	service: HomeService = createHomeService(),
): HomeController => {
	return {
		getHome: async (_req: Request, res: Response): Promise<Response> => {
			const message = await service.getHome();
			return res.status(HTTP_CODES.OK).send(message);
		},
	};
};
