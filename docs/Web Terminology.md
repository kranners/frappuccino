---
tags: web, terminology, programming, javascript
---

# Web Terminology

## Hydration

[Hydration](https://www.builder.io/blog/why-progressive-hydration-is-harder-than-you-think) is adding dynamic behaviour to otherwise static or declarative content.

Modern hydration is usually achieved through a kind of lazy-loading of [[JavaScript]] whenever the user actually interacts with an interactive component.

An example of hydration can be seen with the [Astro islands concept](Astro.md#Islands).

## SSR

Server-side rendering (SSR) is where a server backend, usually [[Node]] or [[Deno]] (or [[PHP]]!) will build/render out static HTML on the backend per user request, then respond to the browser with that rendered HTML.

This is as opposed to client-side rendering (sometimes called CSR) which is where a server will simply serve all the files to the browser at once.

The benefits here are that SSR pages generally force lesser and smaller files to be sent to the browser, making load times faster. The benefit of CSR is that you don't need any workaround like [hydration](#Hydration) to make things interactive.

## MIME Types

[MIME Types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_Types) or Media Types ([Multipurpose Internet Mail Extensions](https://en.wikipedia.org/wiki/MIME)) are a short snippet of text defining the nature and format of a file generally for a browser.

Media types are [defined and maintained by IANA](https://www.iana.org/assignments/media-types/media-types.xhtml).

MDN maintains a [list of common MIME types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types) with their file extensions.

These are usually structured as `type/subtype` with examples like:
- `text/html`
- `text/javascript`
- `image/jpeg`
- `application/gzip`

The two media types to use when in doubt are:

`text/plain` for any textual file (non-binary).
`application/octet-stream` for any other kind of non-human-readable file.

### MIME Sniffing

Often, you'll encounter an arbitrary file and be required to figure out its' type. This is called [MIME sniffing](https://mimesniff.spec.whatwg.org/#matching-a-mime-type-pattern).

File extensions are just conventions and cannot be used as a reliable indicator of MIME type.
If you're a nerd.

### Match the file extension (naive method)
The most basic way which will work, so long as the files are not being input by a user is to just match the files you need based on file extension.

```typescript
function getMimeType(file: string): string {
	const [ extension ] = file.split('.').slice(-1);

	switch (extension) {
		case 'js':
			return 'text/javascript';
		case 'html':
			return 'text/html';
		case 'css':
			return 'text/css';
		default:
			return 'application/octet-stream';
	}
}
```

#### FileReader API (non-naive method)
If in a browser, you can use the [FileReader API](https://developer.mozilla.org/en-US/docs/Web/API/FileReader) to check for a [file's magic number header](https://en.wikipedia.org/wiki/List_of_file_signatures).

Read in the first 16 bytes of the file, convert them into string hex values, then match them against the magic numbers.

You'll pretty much never need to do this, unless handling a file input with no library in raw [[JavaScript]] from scratch.

If in [[Node]], you can do something similar using the `fs` library.

## Fragments

A fragment (in [[JavaScript]], a [DocumentFragment](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment)) represents a minimal [[DOM]] node.

For example, a minimal [React component](React#Components) would contain only a single fragment, and look like this:

```jsx
import React from 'react';

// The <></> bit is the fragment.
const Minimal = () => <></>;
```

## PWA

A **progressive web app** is like a website that can be installed to your device as though it was a native app.

A bit out-of-fashion now, PWAs can provide offline native-like functionality while still just being a web app.

See [Progressive web apps | MDN](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)

