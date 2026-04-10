import express, { type Express } from "express";
import { createApiRouter } from "./api.routes.js";
import { createErrorHandler } from "./middleware/error.middleware.js";
import { createRequestLogger } from "./middleware/logger.middleware.js";
import { createRequestIdMiddleware } from "./middleware/request-id.middleware.js";
import { consoleLogger } from "./shared/logger.utils.js";

export const createApp = (): Express => {
	const app = express();
	app.use(express.json());
	app.use(createRequestIdMiddleware());
	app.use(createRequestLogger(consoleLogger));
	app.use(createErrorHandler(consoleLogger));
	app.use(createApiRouter());
	return app;
};
