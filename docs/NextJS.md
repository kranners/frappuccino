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

**NOTE:** By default Next uses SSR. This means some packages which rely on React hooks will fail, with something that looks like this:
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
import React, { useEffect, useState } from 'react';

export default function CSRPage() {
	const [username, setUsername] = useState<string | undefined>();

	useEffect(() => {
		async function getUsername() {
			const response = await fetch('some/api');
			const { username } = await response.json();

			setUsername(username);
		}

		getUsername();
	}, [setUsername]);

	return (
		<div>Hi, {username}!</div>
	)
}
```

#### Client components

[Client components](https://nextjs.org/docs/app/building-your-application/rendering/client-components) are components explicitly marked to be rendered on the client-side.

```tsx
// This part is the important bit!
"use client"

export default function SomeState() {
	const [name, setName] = useState<string>("Joffrey");

	/* Imagine there's some state stuff in here */

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