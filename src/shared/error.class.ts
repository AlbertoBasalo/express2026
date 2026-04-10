import { HTTP_CODES } from "./rest.consts.js";

export class AppError extends Error {
	constructor(
		public statusCode: number,
		public override message: string,
		public code: string = "INTERNAL_ERROR",
	) {
		super(message);
		this.name = "AppError";
	}
}

export class NotFoundError extends AppError {
	constructor(resource: string) {
		super(HTTP_CODES.NOT_FOUND, `${resource} not found`, "NOT_FOUND");
	}
}

export class BadRequestError extends AppError {
	constructor(message: string) {
		super(HTTP_CODES.BAD_REQUEST, message, "BAD_REQUEST");
	}
}

export class InternalServerError extends AppError {
	constructor(message: string) {
		super(HTTP_CODES.INTERNAL_SERVER_ERROR, message, "INTERNAL_SERVER_ERROR");
	}
}
