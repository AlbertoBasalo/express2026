import express, { type Express } from "express";
import { createApiRouter } from "./api.routes.js";
import { createErrorHandler } from "./middleware/error.middleware.js";
import { createRequestLogger } from "./middleware/logger.middleware.js";
import { consoleLogger } from "./shared/logger.utils.js";

export const createApp = (): Express => {
  const app = express();
  const requestLogger = createRequestLogger(consoleLogger);
  const errorHandler = createErrorHandler(consoleLogger);
  const apiRouter = createApiRouter();


  app.use(express.json());
  app.use(requestLogger);
  app.use(apiRouter);
  app.use(errorHandler);

  return app;
};
