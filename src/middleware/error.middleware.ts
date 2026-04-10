import type { NextFunction, Request, Response } from "express";
import { AppError } from "../shared/error.class.js";
import type { Logger } from "../shared/logger.utils.js";
import type { RequestLocals } from "../shared/request-context.types.js";
import { type ApiErrorResponse, HTTP_CODES } from "../shared/rest.consts.js";
import { getRequestId } from "./request-id.middleware.js";

export const createErrorHandler = (logger: Logger) => {
	return (
		err: Error,
		_req: Request,
		res: Response<ApiErrorResponse, RequestLocals>,
		_next: NextFunction,
	): void => {
		const requestId = getRequestId(res);
		const apiErrorResponse: ApiErrorResponse = {
			requestId,
			error: "INTERNAL_ERROR",
			message: "An unexpected error occurred",
		};
		let apiStatusCode: number = HTTP_CODES.INTERNAL_SERVER_ERROR;
		// handle AppError
		if (err instanceof AppError) {
			apiStatusCode = err.statusCode;
			apiErrorResponse.error = err.code;
			apiErrorResponse.message = err.message;
		}
		// log and send error response
		logger.error(`[${requestId}] Got an error`, err);
		res.status(apiStatusCode).json(apiErrorResponse);
	};
};
