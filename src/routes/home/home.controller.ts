import type { Request, Response } from "express";
import { HTTP_CODES } from "../../shared/rest.consts.js";
import { HomeService } from "./home.service.js";

export class HomeController {
	constructor(private readonly service: HomeService = new HomeService()) {}

	getHome = async (_req: Request, res: Response): Promise<Response> => {
		const message = await this.service.getHome();
		return res.status(HTTP_CODES.OK).send(message);
	};
}
