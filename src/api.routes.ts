import {
	type NextFunction,
	type Request,
	type Response,
	Router,
} from "express";
import { HomeRouter } from "./routes/home/home.router.js";
import { NotFoundError } from "./shared/error.class.js";
import { HTTP_CODES } from "./shared/rest.consts.js";

export const createApiRouter = (): Router => {
	const apiRouter = Router();

	const noContent = (_req: Request, res: Response) =>
		res.status(HTTP_CODES.NO_CONTENT).end();
	apiRouter.get("/favicon.ico", noContent);

	const homeRouter = new HomeRouter();
	apiRouter.use("/", homeRouter.router);

	const notFound = (req: Request, _res: Response, next: NextFunction) =>
		next(new NotFoundError(`Route: ${req.path}`));
	apiRouter.use(notFound);

	return apiRouter;
};
