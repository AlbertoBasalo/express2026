import { Router } from "express";
import { makeMiddleware } from "../../middleware/validate.middleware.js";
import { HomeController } from "./home.controller.js";

const homeController = new HomeController();

export const homeRouter = Router();

homeRouter.get(
	"/",
	makeMiddleware(homeController.validateGetHome.bind(homeController)),
	homeController.getHome.bind(homeController),
);
