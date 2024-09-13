---
id: Astro
aliases: []
tags:
  - astro,
  - javascript,
  - typescript,
  - framework,
  - web
---
# Astro

[Astro](https://astro.build/) is a web framework built for speed and ease of use when building content-focused websites.

For building something more interactive, like a SPA or similar, use [[React]] (or any of the other modern frameworks).

# Getting started

The [preferred method for starting an Astro project is to use the provided setup wizard](https://docs.astro.build/en/tutorial/1-setup/2/#launch-the-astro-setup-wizard):
```shell
npm create astro@latest
```

# Islands

An Island in Astro is a portion of the webpage which is made functional.

This is a technique called "partial [hydration](Web%20Terminology#Hydration)", and allows portions of the page which don't need any functionality to remain purely static.

The point of this is to make things fast 🏎.

# Routing

[Routing](https://docs.astro.build/en/core-concepts/routing/#static-ssg-mode) is typically done with files under `src/pages`.

The files can be `.astro` or `.md files`.

# Components

Astro components (indicated by `.astro` file extensions) are much closer to plain HTML/JS than something like a [React component](React#Components).

Components are typically in UpperCamelCased files ending with `.astro`.

*Sample.astro*
```tsx
---
// Props definitions must be called Props.
interface Props {
	name: string;
}

const { name } = Astro.props;
---

<h1>Hi, {name}!</h1>
```

Passing children through in Astro is used using the reserved `<slot />` component.

*Wrapper.astro*
```tsx
---
// We don't necessarily need an interface.
const { name } = Astro.props;
---

<div>
	<h1>Hi, {name}!</h1>
	<!-- Component children are rendered here. -->
	<slot />
	<h2>Bye {name} :(</h2>
</div>
```

## External components and directives

A component built in [[React]] or [[Svelte]] or [[Vue]] will likely need to load some [[JavaScript]] code before it executes.

Astro by default won't do this, so a major pitfall to worry about is whether or not your component is properly hydrated.

To do this, you'll need to use one of [Astro's client directives](https://docs.astro.build/en/reference/directives-reference/#client-directives).

```tsx
---
import MyReactComponent from './components/ReactComponent';
---

// This will likely not work! The component needs to be hydrated.
<MyReactComponent />

// This version will hydrate the component on page load, high priority.
<MyReactComponent client:load />

// This version will hydrate the component when in view, low priority.
<MyReactComponent client:visible />
```

## `Astro.glob()`, dynamic imports

For managing arbitrary content, you should use the builtin [`Astro.glob()`](https://docs.astro.build/en/guides/imports/#astroglob).

For importing and rendering out JSON files which look like this:
```json
{
	"fruit": "banana"
}
```

```tsx
---
type ExpectedOutput = {
	fruit: string;
}

// IDE will tell you how many files this matches.
const sources = await Astro.glob<ExpectedOutput>('./*.json');

// [ 'banana' ]
const fruits = sources.map((source) => source.fruit);
---
<div>{fruits}</div>
```

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
