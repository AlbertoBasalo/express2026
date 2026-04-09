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
		super(404, `${resource} not found`, "NOT_FOUND");
	}
}
