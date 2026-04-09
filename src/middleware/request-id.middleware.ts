import { randomUUID } from "node:crypto";
import type { NextFunction, Request, Response } from "express";
import type { RequestLocals } from "../shared/request-context.types.js";

const REQUEST_ID_HEADER = "x-request-id";

export const createRequestIdMiddleware = () => {
	return (
		req: Request,
		res: Response<unknown, RequestLocals>,
		next: NextFunction,
	): void => {
		const requestIdHeader = req.header(REQUEST_ID_HEADER);
		const requestId = requestIdHeader?.trim() || randomUUID();

		res.locals.requestId = requestId;
		res.setHeader(REQUEST_ID_HEADER, requestId);
		next();
	};
};
