# Back Conventions — Express2026

## Summary

TypeScript 6 + Express 5 API with feature folders under `src/routes/{domain}/`, each exposing router → controller → service → repository. Validation lives on the controller as `validate*` methods returning `Result`; no per-route validation files. Dependencies are wired via constructor defaults (`new HomeRepository()`), not a DI container. Shared contracts and utilities live in `src/shared/`.

## Artifact Roles

### Domain type

**Dominant pattern**: `export type` with plain object shape; one type file per domain concept when needed.

**Canonical example** (from `home-content.type.ts`):

```typescript
export type HomeContent = {
	message: string;
};
```

**Anti-pattern**:
- Adding Zod/class-validator schemas in route folders — use controller `validate*` + `Result` instead (ADR-3).

### Error classes

**Dominant pattern**: Extend `AppError` with HTTP status, message, and string `code`; throw via `next(error)` in middleware/handlers.

**Canonical example** (from `error.class.ts`):

```typescript
export class BadRequestError extends AppError {
	constructor(message: string) {
		super(HTTP_CODES.BAD_REQUEST, message, "BAD_REQUEST");
	}
}
```

**Anti-pattern**:
- Returning ad-hoc `{ error: string }` objects from controllers — use `AppError` subclasses and the global error middleware.

### Repository

**Dominant pattern**: Class with async methods; read JSON via `readJsonFile` from `data/`; module-level `UPPER_SNAKE` file name constant.

**Canonical example** (from `home.repository.ts`):

```typescript
const HOME_CONTENT_FILE_NAME = "home.content.json";

export class HomeRepository {
	async readHomeContent(): Promise<HomeContent> {
		return readJsonFile<HomeContent>(HOME_CONTENT_FILE_NAME);
	}
}
```

**Anti-pattern**:
- Embedding `fs` calls in services or controllers — keep file I/O in repositories only.

### Service

**Dominant pattern**: Class with constructor-injected repository default; async methods orchestrate domain logic and return DTOs/primitives.

**Canonical example** (from `home.service.ts`):

```typescript
export class HomeService {
	constructor(private readonly repository = new HomeRepository()) {}

	async getHome(): Promise<string> {
		const homeContent = await this.repository.readHomeContent();
		const message = homeContent.message || "Hello World!";
		const timestamp = new Date().toISOString();
		return `${message} ${timestamp}`;
	}
}
```

**Anti-pattern**:
- Accessing `Request`/`Response` in services — HTTP stays in controllers.

### Controller

**Dominant pattern**: Class with service in constructor; `validate{Action}` returns `Result<void, string>` (or typed error); handlers are async, use `HTTP_CODES`, return `res.status().send()` or `.json()`.

**Canonical example** (from `home.controller.ts`):

```typescript
export class HomeController {
	constructor(private readonly service = new HomeService()) {}

	validateGetHome(req: Request): Result<void, string> {
		const hasParameters = Object.keys(req.query).length > 0;
		if (hasParameters) {
			return err("Query parameters are not allowed");
		}
		return ok(undefined);
	}

	async getHome(_req: Request, res: Response): Promise<Response> {
		const message = await this.service.getHome();
		return res.status(HTTP_CODES.OK).send(message);
	}
}
```

**Anti-pattern**:
- Separate `*.validation.ts` files per route — validation methods belong on the controller (ADR-5).

### Router

**Dominant pattern**: `export const {domain}Router = Router()`; instantiate controller once; chain `makeMiddleware(validate.bind(controller))` then handler `.bind(controller)`.

**Canonical example** (from `home.router.ts`):

```typescript
const homeController = new HomeController();

export const homeRouter = Router();

homeRouter.get(
	"/",
	makeMiddleware(homeController.validateGetHome.bind(homeController)),
	homeController.getHome.bind(homeController),
);
```

**Anti-pattern**:
- Inline validation logic in the router — keep validators on the controller and pass them to `makeMiddleware`.

### Middleware factory

**Dominant pattern**: Export `create*` or `make*` functions returning Express middleware; validation adapter maps `Result` errors to `BadRequestError`.

**Canonical example** (from `validate.middleware.ts`):

```typescript
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
```

**Anti-pattern**:
- Sending JSON error responses directly from validate middleware — delegate to error middleware via `next(error)`.

### App composition

**Dominant pattern**: `createApp()` in `app.factory.ts` registers global middleware then `createApiRouter()`; `server.ts` only listens.

**Canonical example** (from `app.factory.ts`):

```typescript
export const createApp = (): Express => {
	const app = express();
	app.use(express.json());
	app.use(createRequestIdMiddleware());
	app.use(createRequestLogger(consoleLogger));
	app.use(createErrorHandler(consoleLogger));
	app.use(createApiRouter());
	return app;
};
```

**Anti-pattern**:
- Registering route-specific middleware or routers in `server.ts` — keep composition in `app.factory.ts` and `api.routes.ts`.

## Wiring and Dependencies

See `back.arch.md` — Dependencies between modules, Constraints (composition root, `api.routes.ts` registration, `.js` import extensions).

Additional conventions:
- Use `import type` for type-only imports; relative imports end with `.js` (Node ESM `nodenext`).
- Feature routers are mounted in `createApiRouter()`; 404 uses `NotFoundError` via `notFoundHandler`.

## Error Handling

See `back.arch.md` — Key contracts (`ApiErrorResponse`), Constraints (`Result` + `makeMiddleware`, `AppError` mapping).

Additional conventions:
- Controllers return `err("message")` from validators; never throw for expected validation failures.
- Unexpected errors become `INTERNAL_ERROR` in error middleware unless `instanceof AppError`.

## Known Deviations

No deviations from the dominant pattern were detected.
