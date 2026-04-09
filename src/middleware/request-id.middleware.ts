import type { NextFunction, Request, Response } from "express";

const REQUEST_ID_HEADER = "x-request-id";

type RequestLocals = {
	requestId: string;
};

export const createRequestIdMiddleware = () => {
	return (
		req: Request,
		res: Response<unknown, RequestLocals>,
		next: NextFunction,
	): void => {
		const requestIdHeader = req.header(REQUEST_ID_HEADER);
		const timestamp = Date.now();
		const requestId = requestIdHeader?.trim() || `${timestamp}`;

		res.locals.requestId = requestId;
		res.setHeader(REQUEST_ID_HEADER, requestId);
		next();
	};
};
