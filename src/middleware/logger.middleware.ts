import type { NextFunction, Request, Response } from "express";
import type { Logger } from "../shared/logger.utils.js";
import type { RequestLocals } from "../shared/request-context.types.js";
import { getRequestId } from "./request-id.middleware.js";

const SKIPPED_PATH_SEGMENTS = ["/com.chrome.devtools.json"] as const;
const FAVICON_PATH = "/favicon.ico";

export const createRequestLogger = (logger: Logger) => {
	return (
		req: Request,
		res: Response<unknown, RequestLocals>,
		next: NextFunction,
	): void => {
		if (shouldSkipLogging(req.path)) {
			next();
			return;
		}
		const start = Date.now();
		res.on("finish", () => {
			const duration = Date.now() - start;
			const message = buildMessage(req, res, duration);
			logger.info(message);
		});
		next();
	};
};

const shouldSkipLogging = (path: string): boolean => {
	const shouldSkip =
		path === FAVICON_PATH ||
		SKIPPED_PATH_SEGMENTS.some((segment) => path.includes(segment));
	return shouldSkip;
};

const buildMessage = (
	req: Request,
	res: Response,
	duration: number,
): string => {
	const requestId = getRequestId(res);
	return `[${requestId}] ${req.method} ${req.path} ${res.statusCode} ${duration}ms`;
};
