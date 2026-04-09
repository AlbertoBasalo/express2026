import type { Request, Response } from "express";
import { createValidator } from "../../middleware/validate.middleware.js";
import { HTTP_CODES } from "../../shared/rest.consts.js";
import { HomeService } from "./home.service.js";
import { validateGetHome } from "./home.validation.js";

export const getHomeValidator = createValidator(validateGetHome);

export class HomeController {
	constructor(private readonly service: HomeService = new HomeService()) {}

	getHome = async (_req: Request, res: Response): Promise<Response> => {
		const message = await this.service.getHome();
		return res.status(HTTP_CODES.OK).send(message);
	};
}
