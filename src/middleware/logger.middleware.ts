import type { NextFunction, Request, Response } from "express";
import type { Logger } from "../shared/logger.utils.js";
import type { RequestLocals } from "../shared/request-context.types.js";
import { NO_REQUEST_ID } from "../shared/rest.consts.js";

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
			const requestId = res.locals.requestId ?? NO_REQUEST_ID;
			const message = `[${requestId}] ${req.method} ${req.path} ${res.statusCode} ${duration}ms`;
			logger.info(message);
		});

		next();
	};
};

function shouldSkipLogging(path: string): boolean {
	return (
		path === FAVICON_PATH ||
		SKIPPED_PATH_SEGMENTS.some((segment) => path.includes(segment))
	);
}
