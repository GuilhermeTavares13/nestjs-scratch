# NestJS Exercises

These exercises build on what you already have in this repo (module + controller + `@Get` routes).
Do them in order — each one depends on the previous. Solve them in `src/` of this repo.
When done, show me the files in another session and I'll review your answers.

## Setup (do once)

You don't have a runner installed yet. Run:

```bash
npm i -D ts-node @types/express
```

Then start the app with:

```bash
npx ts-node src/main.ts
```

Test endpoints with curl, e.g.:

```bash
curl http://localhost:3000/api/hi
```

---

## Exercise 1 — More HTTP methods

In `AppController`, add the following routes:

- `@Post("/message")` — returns `"created"`
- `@Put("/message")` — returns `"updated"`
- `@Patch("/message")` — returns `"patched"`
- `@Delete("/message")` — returns `"deleted"`

**Expected:** `curl -X POST http://localhost:3000/api/message` responds `created`, etc.

## Exercise 2 — Route parameters and query params

Add these routes to `AppController`:

- `@Get("/users/:id")` — returns `"user <id>"` (e.g. `/api/users/42` → `"user 42"`).
  Use `@Param('id')` to read the id.
- `@Get("/users")` — returns the value of the `?name=` query string, or `"all users"` if it's not
  provided. Use `@Query('name')`.

**Expected:**
- `curl http://localhost:3000/api/users/42` → `"user 42"`
- `curl http://localhost:3000/api/users?name=ann` → `"ann"`
- `curl http://localhost:3000/api/users` → `"all users"`

## Exercise 3 — Request body

Add a route:

- `@Post("/users")` — receives the JSON body of the request and returns it (echo).

**Expected:**

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"ann","age":30}'
```

returns the same JSON you sent.

## Exercise 4 — Services and dependency injection

This is the most important exercise.

1. Create `src/users.service.ts` with a class `UsersService` decorated with `@Injectable()`.
   It should keep an in-memory array of users (start with two hardcoded users having `id`, `name`).
   It should expose:
   - `findAll(): User[]`
   - `findOne(id: number): User` — returns `null` if not found
   - `create(name: string): User` — pushes a new user with an incremented id and returns it
2. In `AppController` (or better, a new controller from Exercise 6), inject `UsersService`
   **via the constructor** — do not instantiate it with `new`.
3. Make sure the app still starts. That means the service must be registered somewhere.

**Question to answer in your session:** where do providers get registered, and why does
constructor injection work without you calling `new UsersService()`?

## Exercise 5 — DTOs

Create a class `CreateUserDto` (in `src/dto/create-user.dto.ts` or similar) with typed fields
`name: string` and `age: number`. Use it as the type of the `@Body()` parameter in your
`@Post("/users")` route.

**Expected:** `POST /api/users` with a valid JSON body still works and the type of `body`
inside the method is `CreateUserDto`.

**Question:** what is a DTO and why don't we pass raw `any` bodies around?

## Exercise 6 — A separate feature module

Create a `users` feature module with proper separation:

```
src/users/
  users.module.ts      @Module({ controllers: [...], providers: [...] })
  users.controller.ts  @Controller("users") with GET /, GET /:id, POST /
  users.service.ts     (move your service here)
```

- `UsersModule` must declare the controller in `controllers` and the service in `providers`.
- `AppModule` must add `UsersModule` to its `imports` array.
- The old user routes in `AppController` should be removed (keep only the original
  `/hi` and `/bye`).

**Expected:** `GET /users` returns the user list, `POST /users` creates one.
Notice the URL is now `/users/...` and not `/api/users/...` — that's fine for now,
fix it in Exercise 9 if you want.

## Exercise 7 — Error handling with HTTP exceptions

In `UsersController.findOne`, when the user doesn't exist, throw
`new NotFoundException("user not found")` (from `@nestjs/common`) instead of returning `null`.
Also add `@HttpCode(201)` to the `POST` route so creating a user returns status `201`.

**Expected:**
- `curl -i http://localhost:3000/users/999` → HTTP `404` with body `"user not found"`
- `curl -i -X POST http://localhost:3000/users ...` → HTTP `201`

## Exercise 8 — Pipes

In `GET /users/:id`, the id arrives as a **string**. Add `ParseIntPipe`
(built into `@nestjs/common`) as the parameter's pipe:

```ts
@Get(':id')
findOne(@Param('id', ParseIntPipe) id: number) { ... }
```

**Expected:**
- `GET /users/1` works.
- `GET /users/abc` automatically returns HTTP `400` (no extra code from you).

**Bonus:** write your own custom pipe `ValidateNamePipe` implementing `PipeTransform`
that rejects names with more than 20 characters, and use it on the `@Body('name')` of POST.

## Exercise 9 — Guards and app-wide settings

1. **Guard:** write an `AuthGuard` implementing `CanActivate`. It receives
   `@Req() req` and returns `true` only if the request header `x-token` equals
   `secret-token`; otherwise return `false` (NestJS will answer `403`).
   Apply it to `POST /users` with `@UseGuards(AuthGuard)`.
2. **Global prefix:** in `main.ts`, call `app.setGlobalPrefix('api')` so all routes live
   under `/api` again.

**Expected:**
- `curl -i -X POST http://localhost:3000/api/users ...` without header → `403`
- Same request with `-H "x-token: secret-token"` → `201`
- `GET /api/users` still works (guards don't affect it).

## Exercise 10 — Interceptors

Write a `LoggingInterceptor` implementing `NestInterceptor`. In its `intercept()` method,
log `route started` before the request and `route finished` after it (hint: use
`ctx.switchToHttp()` and the observable's `pipe.tap(...)` from `rxjs/operators`).
Apply it globally in `main.ts` with `app.useGlobalInterceptors(new LoggingInterceptor())`.

**Expected:** the console prints started/finished around every request.

**Question:** what's the difference between a pipe, a guard, and an interceptor?

## Bonus (only if you finish the rest)

1. **Testing:** install `jest`, `ts-jest`, `@nestjs/testing`, `@types/jest`, `supertest`,
   `@types/supertest`. Write a test that bootstraps `UsersModule` with
   `Test.createTestingModule` and asserts `GET /users` returns the initial users.
2. **Config:** make the port come from `process.env.PORT` with default `3000`.

---

## Checklist for your answer session

When you come back, show me:

1. Every new/modified file under `src/`
2. Answers to the 3 questions (Ex. 4, Ex. 5, Ex. 10)
3. curl outputs for the "Expected" results you're unsure about
