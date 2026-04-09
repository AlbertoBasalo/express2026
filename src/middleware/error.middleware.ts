import type { NextFunction, Request, Response } from "express";
import { AppError } from "../shared/error.class.js";
import type { Logger } from "../shared/logger.utils.js";
import type { RequestLocals } from "../shared/request-context.types.js";
import { type ApiErrorResponse, HTTP_CODES } from "../shared/rest.consts.js";

export const createErrorHandler = (logger: Logger) => {
	return (
		err: Error,
		_req: Request,
		res: Response<ApiErrorResponse, RequestLocals>,
		_next: NextFunction,
	): void => {
		const requestId = res.locals.requestId ?? "missing-request-id";

		if (err instanceof AppError) {
			res.status(err.statusCode).json({
				requestId,
				error: err.code,
				message: err.message,
			});
			return;
		}

		logger.error(`[${requestId}] Unhandled application error`, err);
		res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({
			requestId,
			error: "INTERNAL_ERROR",
			message: "An unexpected error occurred",
		});
	};
};
