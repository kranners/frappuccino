---
title: Vitepress
tags: vitepress, vite, obsidian, meta, typescript, javascript
---

# Vitepress

[Vitepress](https://vitepress.dev/guide/getting-started) is a static site generator built on [[Vite]], using [[Markdown]] documents for the content.

It's what my wiki is built using! 🚀

Vitepress renders using the [Inter font](https://fonts.google.com/specimen/Inter) by default.

### Getting started

```shell
# Install Vitepress
yarn add vitepress

# Initialize Vitepress
yarn vitepress init
```

When prompted, if installing Vitepress as a standalone, then the default of `./`  is fine. Otherwise, it should be nested into its own folder like `./docs`.

## Page config

Configuration per-page (like, the title) is [defined in Frontmatter (the metadata)](https://vitepress.dev/reference/frontmatter-config#titletemplate).

As a sample, here's the configuration for this page:
```
---
title: Vitepress
tags: vitepress, vite, obsidian, meta, typescript
---
```

## Site config

#### Dead links

By default, [Vitepress will fail build if it detects dead links](https://vitepress.dev/reference/site-config#ignoredeadlinks). To get rid of this behaviour, add:
```typescript
export default {
	ignoreDeadLinks: true,
}
```
To your Vitepress *site config* (not the theme section).

## Theme config

The theme config is stored at `./vitepress-location/.vitepress/config.ts`.

#### Social links

Valid social link icons are: `discord`, `facebook`, `github`, `instagram`, `linkedin`, `mastodon`, `slack`, `twitter`, `youtube`, or an [[Object]] with `{ svg: string }`.

### Search

Vitepress supports [local search out of the box](https://vitepress.dev/reference/default-theme-search#local-search).

#### Sidebar

The [sidebar](https://vuepress.vuejs.org/theme/default-theme-config.html#sidebar) allows you to change or set what appears in the sidebar explicitly.
For a more implicit, automatic configuration of the sidebar, use the [`vitepress-sidebar`](https://github.com/jooy2/vitepress-sidebar/tree/0cf2f1f11d8024ced72f3a659e937f9f6de75053) plugin.

```shell
yarn add -D vitepress-sidebar
```

```typescript
import { defineConfig } from 'vitepress';
import { generateSidebar } from 'vitepress-sidebar';

export default defineConfig({
	themeConfig: {
		sidebar: generateSidebar({
			documentRootPath: "docs/"
		}),
	},
});
```

## Wikilinks

Wikilinks are a common [[Markdown]] format for linking between pages hosted under the same thing. This is a technique used extensively in [[Obsidian]].

```markdown
This is my [[Wikilink]]
```

For support in Vitepress, there is a [[markdown-it]] plugin for it called [markdown-it-wikilinks](https://github.com/jsepia/markdown-it-wikilinks).

#### Usage

Install with:
```shell
yarn add markdown-it-wikilinks
```

Add to config with:
```typescript
import wikilinks from 'markdown-it-wikilinks';

export default defineConfig({
	...,
	markdown: {
		config: (md) => {
			md.use(wikilinks({
				/* Your wikilinks options. */
			}))
		}
	}
});
```

#### Inner workings

Generally how this function works is something like the following:
```typescript
function wikilink(match: string): string {
	let label = match;

	let pageName = options.generatePageNameFromLabel(label);

	// Apply postprocessing options
	label = options.postProcessLabel(label)
	pageName = options.postProcessPageName(pageName)

	// Make the href.
	const href = options.baseUrl + pageName + options.uriSuffix;

	return `<a href=${href}>${label}</a>`;
}
```

To fix things like URL encoding in the link, you should use either `generatePageNameFromLabel` or `postProcessPageName`.
