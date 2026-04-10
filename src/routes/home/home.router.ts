import { Router } from "express";
import { createValidator } from "../../middleware/validate.middleware.js";
import { HomeController } from "./home.controller.js";
import { HomeValidator } from "./home.validator.js";

export class HomeRouter {
	readonly router = Router();

	constructor(
		private readonly controller = new HomeController(),
		private readonly validator = new HomeValidator(),
	) {
		this.initializeRoutes();
	}

	private initializeRoutes(): void {
		this.router.get(
			"/",
			createValidator(this.validator.validateGetHome),
			this.controller.getHome,
		);
	}
}
