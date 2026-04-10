import type { Request } from "express";
import { err, ok, type Result } from "../../shared/result.type.js";

export class HomeValidator {
	validateGetHome = (req: Request): Result<void, string> => {
		const hasParameters = Object.keys(req.query).length > 0;
		if (hasParameters) {
			return err("Query parameters are not allowed");
		}
		return ok(undefined);
	};
}
