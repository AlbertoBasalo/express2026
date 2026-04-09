import {
	type NextFunction,
	type Request,
	type Response,
	Router,
} from "express";
import { createValidator } from "./middleware/validate.middleware.js";
import { HomeController } from "./routes/home/home.controller.js";
import { HomeValidator } from "./routes/home/home.validation.js";
import { NotFoundError } from "./shared/error.class.js";
import { HTTP_CODES } from "./shared/rest.consts.js";

export const createApiRouter = (): Router => {
	const apiRouter = Router();

	const noContent = (_req: Request, res: Response) =>
		res.status(HTTP_CODES.NO_CONTENT).end();
	apiRouter.get("/favicon.ico", noContent);

	const homeController = new HomeController();
	const homeValidator = new HomeValidator();
	apiRouter.get(
		`/`,
		createValidator(homeValidator.validateGetHome),
		homeController.getHome,
	);

	const notFound = (req: Request, _res: Response, next: NextFunction) =>
		next(new NotFoundError(`Route: ${req.path}`));
	apiRouter.use(notFound);

	return apiRouter;
};
