import type { NextFunction, Request, Response } from "express";
import { AppError } from "../shared/error.class.js";
import type { Logger } from "../shared/logger.utils.js";
import type { RequestLocals } from "../shared/request-context.types.js";
import {
	type ApiErrorResponse,
	HTTP_CODES,
	NO_REQUEST_ID,
} from "../shared/rest.consts.js";

export const createErrorHandler = (logger: Logger) => {
	return (
		err: Error,
		_req: Request,
		res: Response<ApiErrorResponse, RequestLocals>,
		_next: NextFunction,
	): void => {
		const requestId = res.locals.requestId ?? NO_REQUEST_ID;
		const apiErrorResponse: ApiErrorResponse = {
			requestId,
			error: "INTERNAL_ERROR",
			message: "An unexpected error occurred",
		};
		let apiStatusCode: number = HTTP_CODES.INTERNAL_SERVER_ERROR;

		if (err instanceof AppError) {
			apiStatusCode = err.statusCode;
			apiErrorResponse.error = err.code;
			apiErrorResponse.message = err.message;
		}

		logger.error(`[${requestId}] Got an error`, err);
		res.status(apiStatusCode).json(apiErrorResponse);
	};
};
