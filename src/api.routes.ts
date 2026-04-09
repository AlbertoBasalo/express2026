import { Router } from "express";
import {
  createHomeController,
  getHomeValidator,
  type HomeController,
} from "./routes/home/home.controller.js";
import { NotFoundError } from "./shared/error.class.js";
import { HTTP_CODES } from "./shared/rest.consts.js";

export const createApiRouter = (): Router => {
  const apiRouter = Router();
  const homeController: HomeController = createHomeController();
  apiRouter.get("/favicon.ico", (_req, res) =>
    res.status(HTTP_CODES.NO_CONTENT).end(),
  );
  apiRouter.get(`/`, getHomeValidator, homeController.getHome);
  apiRouter.use((req, _res, next) =>
    next(new NotFoundError(`Route: ${req.path}`)),
  );

  return apiRouter;
};
