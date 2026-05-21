# Naming Conventions — Express2026

## Domain Language

- **Business terms**: English (e.g. `home`, `message`, `HomeContent`)
- **Technical terms / suffixes**: English (e.g. `Controller`, `Service`, `.middleware.ts`, `Router`)
- **Code comments**: English (Arrange / Act / Assert in tests)
- **Commit messages**: English, conventional commits per `AGENTS.md`

## Folders

### Back (`src/`)
- **Pattern**: Hybrid — feature folders under `routes/{domain}/`, cross-cutting `middleware/` and `shared/`
- **Casing**: kebab-case for multi-word segments (`request-id` in file names maps to folder-less flat `middleware/`)
- **Examples**: `src/routes/home/`, `src/middleware/`, `src/shared/`

### E2E (`tests/`)
- **Pattern**: Flat test folder (no mirror of `src/routes/` subfolders yet)
- **Casing**: lowercase single segment
- **Examples**: `tests/`

## Files

### Back (`src/`)
- **Route module (layer)**: `{domain}.{role}.ts` — `home.router.ts`, `home.controller.ts`, `home.service.ts`, `home.repository.ts`
- **Domain type**: `{domain}-{concept}.type.ts` — `home-content.type.ts`
- **Middleware**: `{concern}.middleware.ts` — `error.middleware.ts`, `validate.middleware.ts`
- **Shared utility / contract**: `{concern}.{kind}.ts` — `error.class.ts`, `result.type.ts`, `file.utils.ts`, `rest.consts.ts`
- **Composition / bootstrap**: `{purpose}.{kind}.ts` — `app.factory.ts`, `api.routes.ts`, `env.config.ts`, `server.ts`
- **Unit test**: `{module}.test.ts` colocated — `home.controller.test.ts`, `home.service.test.ts`

### E2E (`tests/`)
- **Spec file**: `{area}.test.ts` — `home.test.ts`, `routes.test.ts`

## Language Elements

### Back (TypeScript)
- **Classes**: PascalCase — `HomeController`, `HomeService`, `AppError`
- **Interfaces / Types**: PascalCase — `HomeContent`, `AppConfig`, `Result`, `ApiErrorResponse`
- **Methods / Functions**: camelCase — `getHome`, `validateGetHome`, `createApp`, `makeMiddleware`
- **Variables / Fields**: camelCase — `homeContent`, `apiErrorResponse`, `requestId`
- **Constants (module-level)**: UPPER_SNAKE — `HOME_CONTENT_FILE_NAME`, `PORT_ENV_KEY`, `DEFAULT_PORT`
- **Constant objects**: PascalCase export name, UPPER_SNAKE keys — `HTTP_CODES.OK`, `HTTP_CODES.NOT_FOUND`
- **Router exports**: camelCase + `Router` suffix — `homeRouter`; factory routers — `createApiRouter`
- **Error codes (string)**: UPPER_SNAKE — `"NOT_FOUND"`, `"BAD_REQUEST"`

### E2E (TypeScript / Playwright)
- **Imports**: `test`, `expect` from `@playwright/test`
- **Describe blocks**: English feature name — `"Home route"`, `"Route handling"`

## Detected Inconsistencies

- **Shared file suffixes**: mix of `.class.ts` (`error.class.ts`), `.type.ts`, `.utils.ts`, `.consts.ts` — all valid; pick suffix by artifact kind when adding files.
- **Top-level router naming**: aggregate router uses `api.routes.ts` + `createApiRouter()` while feature routers use `{domain}.router.ts` + `{domain}Router` — intentional split between API composition and feature modules.
