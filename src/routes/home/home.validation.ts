import type { Request } from "express";

export class HomeValidator {
	validateGetHome = (req: Request): string | null => {
		// Home endpoint does not accept query parameters.
		if (Object.keys(req.query).length > 0) {
			return "Query parameters are not allowed";
		}

		return null;
	};
}
