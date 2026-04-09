export const HTTP_CODES = {
	OK: 200,
	CREATED: 201,
	NO_CONTENT: 204,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	INTERNAL_SERVER_ERROR: 500,
} as const;

export type ApiErrorResponse = {
	requestId: string;
	error: string;
	message: string;
};

export const NO_REQUEST_ID = "no-request-id" as const;
