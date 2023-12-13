---
tags:
  - javascript
  - web
  - programming
  - development
---

# Storybook

[Storybook](https://storybook.js.org/) is a space for building and testing frontend components and designs.

### Configuration

[Storybook configuration](https://storybook.js.org/docs/configure) is managed via a *.storybook* folder in your project root.

In it there are two files:
1. *main.js*, this contains the actual Storybook configuration object.
2. *preview.js*, an optional file to wrap the `<iframe>` which renders the story.

#### Static Files

[Static files in Storybook](https://storybook.js.org/docs/configure/images-and-assets) are loaded via *main.js* in the option `staticDir` or `staticDirs`.

```js
module.exports = {
	// This will define a single deep folder
	staticDir: '../public',
	// You can also define a bunch of folders
	staticDirs: ['../public', '../static'],
};
```

If you need to load fonts, you will also need to import the relevant fonts into *preview.js*, unless the fonts are only served statically.

You can do this by adding a decorator like:
```jsx
// Obviously this will differ depending on which framework you're using.
import React from 'react';
import { addDecorator } from '@storybook/react';

addDecorator((story) => (
	<>
		<style>
		@font-face {
			font-family: 'Wingdings',
			...,
		}
		</style>
		{story}
	</>
))
```