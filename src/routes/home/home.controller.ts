import type { Request, Response } from "express";
import { homeService } from "./home.service.js";

export const homeController = {
	getHome: (_req: Request, res: Response): any => {
		return res.status(200).send(homeService.getHome());
	},
};
