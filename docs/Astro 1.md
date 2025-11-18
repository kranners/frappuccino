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

[Astro](https://astro.build/) is a web framework built for speed and ease of
use when building content-focused websites.

For building something more interactive, like a SPA or similar, use [[React]]
(or any of the other modern frameworks).

# Getting started

The [preferred method for starting an Astro project is to use the provided setup wizard](https://docs.astro.build/en/tutorial/1-setup/2/#launch-the-astro-setup-wizard):
```shell
npm create astro@latest
```

# Routing

[Routing](https://docs.astro.build/en/core-concepts/routing/#static-ssg-mode) is typically done with files under `src/pages`.

The files can be `.astro` or `.md files`.

# Components

Astro components (indicated by `.astro` file extensions) are much closer to
plain HTML/JS than something like a [React component](React#Components).

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
