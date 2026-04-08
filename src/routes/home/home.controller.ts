import type { Request, Response } from "express";
import { HTTP_CODES } from "../../shared/rest.consts.js";
import { homeService } from "./home.service.js";

export const homeController = {
	getHome: async (_req: Request, res: Response): Promise<Response> => {
		const message = await homeService.getHome();
		return res.status(HTTP_CODES.OK).send(message);
	},
};
