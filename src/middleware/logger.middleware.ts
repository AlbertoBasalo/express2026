import type { NextFunction, Request, Response } from "express";
import type { Logger } from "../shared/logger.utils.js";

type RequestLocals = {
	requestId?: string;
};

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
			const requestId = res.locals.requestId ?? "no-request-id";
			const message = `[${requestId}] ${req.method} ${req.path} ${res.statusCode} ${duration}ms`;
			logger.info(message);
		});

		next();
	};
};

function shouldSkipLogging(path: string): boolean {
	return path === "/favicon.ico" || path.includes("/com.chrome.devtools.json");
}
