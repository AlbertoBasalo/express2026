import type { NextFunction, Request, Response } from "express";
import { AppError } from "../shared/error.class.js";

export type RequestValidator = (req: Request) => string | null;

export const createValidator = (validate: RequestValidator) => {
	return (req: Request, _res: Response, next: NextFunction): void => {
		const validationError = validate(req);

		if (validationError) {
			next(new AppError(400, validationError, "BAD_REQUEST"));
			return;
		}

		next();
	};
};
