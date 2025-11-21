---
id: Koa
date: "19 November, 2025"
---

# Koa

[Koa is a Node web framework by the same team behind Express.](https://koajs.com/)

Koa is supported for any [[Node]] version with ES2015 and async support.

Install in the usual way:
```shell
npm i koa

# Optionally, for TypeScript install the DefinitelyTyped package
npm i -D @types/koa
```

## Application

A Koa application, made with `new Koa()` is a series of async middleware functions.

Each middleware function takes in two arguments:
- A ParameterizedContext, typically called `ctx`
This is the context for the request, containing the body, headers, etc.

- A Next function, typically called `next`
This is a function which will run the next middleware function in the series.

Here is the example from the Koa website:
```ts
const Koa = require('koa');
const app = new Koa();

// This is the top-most middleware function
// It gets the X-Response-Time header that is set in the second function
// And logs it out

app.use(async (ctx, next) => {
  // This will run the next middleware function on the context
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// This is the second middleware function, run by the first
// It will time how long it takes to run the third middleware function
// And will set the X-Response-Time header to that.

app.use(async (ctx, next) => {
  const start = Date.now();
  // This will run the final middleware function.
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// This is the last middleware function, which sets the response body.

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);
```

Settings are saved as properties on the application eg `app.env = "development"`.

## Context

A Koa Context (the ParameterizedContext from before) includes both the Request and Response.

```ts
ctx.request;    // Koa Request
ctx.response;   // Koa Response

ctx.req;        // Node Request
ctx.res;        // Node Response
```

State can be passed between middleware functions using `ctx.state`.

```ts
ctx.state.user = await User.find(id);
```

### Error handling

The context provides a `.throw()` method for early-exiting with an error response.

```ts
ctx.throw(400, 'access denied', { user: user });
```

This is equivalent to throwing an error with `status` and `expose` properties set:
```ts
const error = new Error('access denied', { user: user });

error.status = 400;
error.expose = true;

throw error;
```

There is also a `.assert()` method, which will throw when a given value is falsy:
```ts
const isAdmin = user.role === 'admin';

ctx.assert(isAdmin, 400, 'access denied');
```

## Routing

[Routing is handled through the official middleware library `@koa/router`.](https://github.com/koajs/router)

Install with:
```shell
npm i @koa/router
```

To use, create middleware functions using a `new Router`:
```ts
const Router = require('@koa/router');

const router = new Router();

router.get('/', (ctx, next) => {
  // ctx.router available
});

```

Then register them in your Koa app as usual:
```ts
const Koa = require('koa');

const app = new Koa();

app
  // This registers your routes and their handlers
  .use(router.routes())
  // This registers OPTIONS handlers for your routes
  .use(router.allowedMethods());
```

There are handlers for each of the HTTP verbs:
```ts
router
  .get('/', (ctx, next) => {
    ctx.body = 'Hello World!';
  })
  .post('/users', (ctx, next) => {
    // ...
  })
  .put('/users/:id', (ctx, next) => {
    // ...
  })
  .del('/users/:id', (ctx, next) => {
    // ...
  })
  // This registers this route on all handlers
  .all('/users/:id', (ctx, next) => {
    // ...
  });
```

### Named routes

Routes can have names:
```ts
router.get('user', '/users/:id', (ctx, next) => {
 // ...
});

router.url('user', 3);
// => "/users/3"
```

Which you can use to redirect without knowing the exact URL:
```ts
router.use((ctx, next) => {
  // ctx contains the router instance
  ctx.redirect(ctx.router.url('user', 3));
})
```

