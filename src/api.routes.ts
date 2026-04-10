import {
	type NextFunction,
	type Request,
	type Response,
	Router,
} from "express";
import { homeRouter } from "./routes/home/home.router.js";
import { NotFoundError } from "./shared/error.class.js";
import { HTTP_CODES } from "./shared/rest.consts.js";

export const createApiRouter = (): Router => {
	const apiRouter = Router();
	apiRouter.get("/favicon.ico", noContentHandler);
	apiRouter.use("/", homeRouter);
	apiRouter.use(notFoundHandler);
	return apiRouter;
};

const noContentHandler = (_req: Request, res: Response): void => {
	res.status(HTTP_CODES.NO_CONTENT).end();
};

const notFoundHandler = (
	req: Request,
	_res: Response,
	next: NextFunction,
): void => next(new NotFoundError(`Route: ${req.path}`));
