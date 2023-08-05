---
tags: astro, javascript, typescript, framework, web
---

[Astro](https://astro.build/) is a web framework built for speed and ease of use when building content-focused websites.

For building something more interactive, like a SPA or similar, use [[React]] (or any of the other modern frameworks).

# Getting started

```shell
# Use Yarn!
yarn create astro
```

# Islands

An Island in Astro is a portion of the webpage which is made functional.

This is a technique called "partial [hydration](Web%20Terminology#Hydration)", and allows portions of the page which don't need any functionality to remain purely static.

The point of this is to make things fast 🏎.

# Routing

[Routing](https://docs.astro.build/en/core-concepts/routing/#static-ssg-mode) is typically done with files under `src/pages`.

# Components

### Node builtins

Astro components support [[Node]] builtins [out of the box](https://docs.astro.build/en/guides/imports/#node-builtins), although it is not necessarily recommended to use.



# Integrations

[Astro integrations](https://astro.build/integrations) are plugins to add support for various things like [[Tailwind]], [[React]], and other web frameworks.

Official documentation is found under the  [Astro Integration API](https://docs.astro.build/en/reference/integrations-reference/).

### Adapters

An [adapter](https://docs.astro.build/en/reference/adapter-reference/#what-is-an-adapter) is a special kind of [integration](#Integrations) which is used for giving Astro the ability to deploy as a [SSR](Web%20Terminology#SSR) project.

There's a list of [existing adapters](https://docs.astro.build/en/guides/server-side-rendering/#adding-an-adapter) for supporting things like [[Node]] or [[Deno]] as an SSR backend.

### Usage

Installing an integration is generally done using the `astro add` command.

```shell
astro add react
```

However, all this really does is a couple things for you automatically:

1. Install the [[npm]] dependencies
2. Update the [Astro config](#Config) to include the integration.

### Creating a local Integration

In [[TypeScript]], an Astro integration is of type `AstroIntegration` and is typically a default export.

*integrations/my-integration.ts*
```typescript
import type { AstroIntegration } from 'astro';

type MyIntegrationConfig = { ... };

export default function ({ ...config }: MyIntegrationConfig): AstroIntegration {
	return {
		name: 'my-integration',
		hooks: {
			...,
		}
	}
}
```

This could then be installed into your [config](#Config) like:

*astro.config.mjs*
```typescript
import { defineConfig } from 'astro/config';
import myIntegration from './integrations/my-integration';

export default defineConfig({
	...,
	integrations: [ myIntegration({ ... }) ],
});
```

### Integration hooks

[Full documentation of hooks](https://docs.astro.build/en/reference/integrations-reference/#hooks) is available.

#### Options

##### `injectRoute`

`injectRoute` is a callback function for providing new routes to an Astro project. This is generally for breaking out of the typical file-based routing of everything going in `src/pages` and doing something else.

`injectRoute` takes in a pattern and an entry point.

The pattern (a `string`) can either be a static value like `'/404'` or can be an Astro pattern like `/people/[...person]`.

The entry point is *one of*:
- A relative path to a `.astro` page or a [handler](https://docs.astro.build/en/core-concepts/endpoints/#static-file-endpoints) like `'./src/404.astro'`
- A static path from `./pages` to a `.astro` page or a [handler](https://docs.astro.build/en/core-concepts/endpoints/#static-file-endpoints), like `'404.astro'`
- A path to a [[npm]] package containing one of those things, like `'@cool/404.astro'`

A simple 404 page route injection might look like:
```typescript
// Note that this injection is pointless, as Astro does this already.
"astro:config:setup": ({ injectRoute }) => {
	injectRoute({
		pattern: "/404",
		entryPoint: "404.astro"
	});
},
```

###### Route Handlers

[A custom handler](https://docs.astro.build/en/core-concepts/endpoints/#static-file-endpoints) is any file which exports a (optionally [async](Promises)) `get` function of type `APIRoute`, and a `getStaticPaths` function which returns all possible params.

`getStaticPaths` is required as all paths must be known by Astro at build time.
```typescript
type Route = { params: Record<string, string> };

export function getStaticPaths(): Route[];
```
Note that any param as returned by `getStaticPaths` **MUST NOT** contain a `/`, `#` or `?`, as these are reserved.

This function will take in a [context object](https://docs.astro.build/en/reference/api-reference/#endpoint-context) (usually you'll only care about the `params`).
Note that whatever you specified as the pattern will be the param passed into this API route.

The `get` function will return either a [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) or a `EndpointObject`:
```typescript
type EndpointOutput = {
	body: Body; // Body is an alias for string.
	encoding?: any; // 99% of the time you will not care about this.
};
```

*handler.ts*
```typescript
import type { APIRoute, APIContext } from 'astro';

type PersonRoute = {
	params: { person: string };
}

export function getStaticPaths(): PersonRoute[] {
	return [
		{ params: { person: 'Helen' } },
		{ params: { person: 'George' } },
		{ params: { person: 'Michael' } },
	];
}

export const get: APIRoute = (context: APIContext) => {
	const { person } = context.params;

	return {
		body: `Hello ${person}!`,
	};
};
```

This custom route will return a text document with:
```
Hello Helen!
```
If the user navigates to */helen*.

**To render out actual HTML, you need to use a `Response` object.**

*custom-page-handler.ts*
```typescript
const html = "<body>...</body>";

export const get: APIRoute = () => {
	return new Response(html, {
		status: 200,
		headers: {
			"Content-Type": "text/html",
		}
	});
};
```