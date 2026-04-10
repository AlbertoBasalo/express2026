import type { NextFunction, Request, Response } from "express";
import type { RequestLocals } from "../shared/request-context.types.js";

const REQUEST_ID_HEADER = "x-request-id" as const;
const NO_REQUEST_ID = "no-request-id" as const;

export const createRequestIdMiddleware = () => {
	return (
		req: Request,
		res: Response<unknown, RequestLocals>,
		next: NextFunction,
	): void => {
		const requestIdHeader = req.header(REQUEST_ID_HEADER);
		const requestId = requestIdHeader?.trim() || Date.now().toString();
		// assign to locals for use in middleware or any other handlers
		res.locals.requestId = requestId;
		// set header for response for client to use
		res.setHeader(REQUEST_ID_HEADER, requestId);
		next();
	};
};

export const getRequestId = <T>(res: Response<T, RequestLocals>): string => {
	return (res.locals.requestId as string) ?? NO_REQUEST_ID;
};
