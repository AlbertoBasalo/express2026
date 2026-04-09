import type { NextFunction, Request, Response } from "express";
import type { Logger } from "../shared/logger.utils.js";

export const createRequestLogger = (logger: Logger) => {
	return (req: Request, res: Response, next: NextFunction): void => {
		const start = Date.now();

		res.on("finish", () => {
			const duration = Date.now() - start;
			logger.info(`${req.method} ${req.path} ${res.statusCode} ${duration}ms`);
		});

		next();
	};
};
