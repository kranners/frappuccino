---
tags:
  - web
  - development
  - javascript
  - typescript
  - react
---

# NextJS

[Next](https://nextjs.org/) is a [[React]] framework for building and deploying [SSR](Web%20Terminology#SSR) applications.

:::tip
By default Next uses SSR. This means some packages which rely on React hooks will fail, with something that looks like this:
:::

```
 ⨯ TypeError: (0 , react__WEBPACK_IMPORTED_MODULE_0__.createContext) is not a function
```

To fix these up, you can configure Next to run as a client-side SPA, or you can

## Setup

Next provides their own [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app) CLI tool.

```shell
# Interactive setup of a new Next app
yarn create next-app
```

## Routing

Routing in Next projects is done using one of two different built-in routers.
Either the [App Router](https://nextjs.org/docs/app) (the new and recommended one) or the [Pages Router](https://nextjs.org/docs/pages/building-your-application).

You can [use both routers simultaneously](https://nextjs.org/docs/app/building-your-application/routing#the-app-router), however the App Router will take priority.

### Making a new route

For the app router, [you can create a new route](https://nextjs.org/docs/app/building-your-application/routing/defining-routes#creating-routes) by adding any level of nesting folders - which contain a file named `page.js` (or `page.jsx` or `page.tsx`) - which has a single default export of a [React server component](https://nextjs.org/docs/app/building-your-application/rendering/server-components).

To define a new route under `<site>/cool`, it would look like:

```
app/
	page.tsx
	cool/
		page.tsx
```

_app/cool/page.tsx_

```tsx
export default function CoolPage() {
  return <div>This is my really cool page :)</div>;
}
```

## Built-ins and API

### `<Image />` component

Resolving local images is done for you in Next by using their [Image component](https://nextjs.org/docs/pages/api-reference/components/image).

```tsx
import Image from 'next/image';

export function Cat ({ catSource?: string }) {
	return (
		<Image
			src={catSource ?? 'http://placekitten.com/200/300'}
			/* The 'fill' forces the image to stretch to fill the container */
			fill={true}

			/* Without a fill key, you need to specify the width/height */
			/* in pixels. */
			width={200}
			height={300}
		/>
	);
}
```

## Usage

### Default styles

NextJS comes with several default styles for their demo app, which can all be found under `globals.css` as a sibling to the root page.

```
--> src/app (if using src/ folder)
	--> page.tsx
	--> globals.css - this file is required by the router
```

### Client-side rendering

**TLDR:** If you just need to make something render on the client, use the [React 'use client' directive](https://react.dev/reference/react/use-client).

[Client-side rendering](https://nextjs.org/docs/pages/building-your-application/rendering/client-side-rendering) in Next is (seemingly) enabled on a page-by-page basis. Imagine this like [Astros islands](Astro#Islands) only less explicit.

Next will enable CSR for any page which contains a `useEffect()` hook.

```tsx
import React, { useEffect, useState } from "react";

export default function CSRPage() {
  const [username, setUsername] = useState<string | undefined>();

  useEffect(() => {
    async function getUsername() {
      const response = await fetch("some/api");
      const { username } = await response.json();

      setUsername(username);
    }

    getUsername();
  }, [setUsername]);

  return <div>Hi, {username}!</div>;
}
```

#### Client components

[Client components](https://nextjs.org/docs/app/building-your-application/rendering/client-components) are components explicitly marked to be rendered on the client-side.

```tsx
// This part is the important bit!
"use client";

export default function SomeState() {
  const [name, setName] = useState<string>("Joffrey");

  // Imagine there's some state stuff in here 👻

  return <>{name}</>;
}
```

## Configuration

### robots.txt

Adding a [[robots.txt]] to your Next app is just, adding it to the root of your `app` directory.

```
package.json
next-env.d.ts
src/
--> app/
    --> robots.txt
```

### Import Aliases

```js
// Don't do this!
import { Text } from "../../../../components/typography";

// Do this 😎
import { Text } from "@components/typography";

// Or, here's an example absolute import, from the root directory
// In this case 'components' resolves to 'src/components'.
import { Text } from "components/typography";
```

Configure these either in a [TSConfig](TypeScript#Configuration) or in an equivalent `jsconfig.json`.

_Example configuration using only paths:_

```json
{
  "compilerOptions": {
    "paths": {
      "@components/*": ["src/components/*"],
      "@hooks/*": ["src/hooks/*"]
    }
  }
}
```

_Example configuration using paths and `baseUrl`_:

```json
{
  "compilerOptions": {
    "baseUrl": "src/",
    "paths": {
      "@components/*": ["components/*"],
      "@hooks/*": ["hooks/*"]
    }
  }
}
```

#### Import Aliases and [[ESLint]]
