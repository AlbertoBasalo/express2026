import type { NextFunction, Request, Response } from "express";
import { AppError } from "../shared/error.class.js";
import type { Logger } from "../shared/logger.utils.js";

export const createErrorHandler = (logger: Logger) => {
	return (
		err: Error,
		_req: Request,
		res: Response,
		_next: NextFunction,
	): void => {
		if (err instanceof AppError) {
			res.status(err.statusCode).json({
				error: err.code,
				message: err.message,
			});
			return;
		}

		logger.error("Unhandled application error", err);
		res.status(500).json({
			error: "INTERNAL_ERROR",
			message: "An unexpected error occurred",
		});
	};
};
