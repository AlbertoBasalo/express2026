import type { Request } from "express";
import { err, ok, type Result } from "../../shared/result.type.js";

export class HomeValidator {
	validateGetHome = (req: Request): Result<void, string> => {
		// Home endpoint does not accept query parameters.
		if (Object.keys(req.query).length > 0) {
			return err("Query parameters are not allowed");
		}

		return ok(undefined);
	};
}
