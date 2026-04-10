import type { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../shared/error.class.js";
import type { Result } from "../shared/result.type.js";

export type RequestValidator = (req: Request) => Result<unknown, string>;

export const makeMiddleware = (validate: RequestValidator) => {
	return (req: Request, _res: Response, next: NextFunction): void => {
		const result = validate(req);
		if (result.isOk) {
			next();
			return;
		}
		next(new BadRequestError(result.error));
	};
};
