import type { Request, Response } from "express";
import { homeService } from "./home.service.js";

export const homeController = {
	getHome: (_req: Request, res: Response): Response => {
		const message: string = homeService.getHome();
		return res.status(200).send(message);
	},
};
