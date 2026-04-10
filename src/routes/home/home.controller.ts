import type { Request, Response } from "express";
import { HTTP_CODES } from "../../shared/rest.consts.js";
import { err, ok, type Result } from "../../shared/result.type.js";
import { HomeService } from "./home.service.js";

export class HomeController {
	constructor(private readonly service = new HomeService()) {}

	validateGetHome(req: Request): Result<void, string> {
		const hasParameters = Object.keys(req.query).length > 0;
		if (hasParameters) {
			return err("Query parameters are not allowed");
		}
		return ok(undefined);
	}

	async getHome(_req: Request, res: Response): Promise<Response> {
		const message = await this.service.getHome();
		return res.status(HTTP_CODES.OK).send(message);
	}
}
