---
tags:
  - vscode
  - typescript
  - javascript
  - programming
  - development
---

# VSCode

[VSCode](https://code.visualstudio.com/) is a ubiquitous IDE developed by [[Microsoft]].

# Extension Development

## Getting started

*Check out the [Your First Extension](https://code.visualstudio.com/api/get-started/your-first-extension) docs page for more information.*

### Using their generator

If you are completely new to VSCode extension development, then this method is recommended.

Install [yo](https://yeoman.io/) and [generator-code](https://www.npmjs.com/package/generator-code), as well as [vsce](https://github.com/microsoft/vscode-vsce) for packaging later.
```shell
# This is using Bun, but you could just as easily use any other manager.
# NOTE! vsce could be a dev dependency here instead. You decide :)
bun install --global yo generator-code vsce
```

Then follow the on-screen prompts to complete the setup.

After this I personally recommend that you take stock of what it's set up, and if you need it or not. **This scaffolding function is very opinionated, and will create [[ESLint]] and [[TypeScript]] configuration files for you.**

### From scratch

*(If you previously globally installed those build tools, you can remove them now.)*
```shell
# Again, you can use whatever you want here.
bun uninstall --global yo generator-code vsce
```

1. Set up a directory.
```shell
mkdir <my-extension> ; cd <my-extension>
```

2. Initialise this folder to be a from-scratch [[TypeScript]] project. You can do that a number of ways:
```shell
# Bun's defaults are surprisingly good for this.
bun init

# You could use npm, yarn, whatever.
npm init

# If using npm or yarn, install TypeScript and run their init.
npm install -D typescript
npx tsc --init
```

3. Specify the [`engines`](https://docs.npmjs.com/cli/v6/configuring-npm/package-json#engines), [`categories`](https://code.visualstudio.com/api/references/extension-manifest#:~:text=is%20and%20does.-,categories,-string%5B%5D), [`activationEvents`](#Activation), [`main`](https://docs.npmjs.com/cli/v6/configuring-npm/package-json#main), and [`contributes`](#Contributes) keys in your *package.json*:
```json
{
	...,
	// This just tells NPM what this package runs on (VSCode).
	"engines": {
		"vscode": "^1.82.0"
	},
	// This is VSCode extension metadata.
	"categories": [],
	// This tells VSCode when to run your code.
	"activationEvents": [],
	// This tells VSCode what the entrypoint to your extension is.
	"main": "./out/index.js",
	// This tells VSCode what your extension does.
	"contributes": {},
	...
}
```

4. Install `@vscode/vsce` for packaging, and any other required library.
```shell
# You will always need this one.
bun add -D @vscode/vsce

# If you're using TypeScript, these ones are practically required.
bun add -D typescript @types/node @types/vscode
```

At this stage, unless you *really* know what you're doing - I'd also suggest [installing a recommended tsconfig.json](https://github.com/tsconfig/bases#available-tsconfigs).

```shell
bun add -D @tsconfig/recommended
```

Replace your TSConfig with:
```json
{
	"extends": "@tsconfig/recommended/tsconfig.json",
	"compilerOptions": {
		"outDir": "dist",
		"types": ["bun-types", "vscode", "node"]
	}
}
```

5. *(Optional if using [[TypeScript]])* Add the types to your TSConfig
```json
{
	"compilerOptions": {
		"types": [
			// This one is only needed if you're using Bun. Like a cool guy.
			"bun-types",
			"node",
			"vscode"
		]
	}
}
```

6. Export two functions from your *index.ts*, `activate()` and `deactivate()`.
```typescript
export function activate() {}

export function deactivate() {}
```

7. Create a *LICENSE.md*. See [[Software Licensing]] to see one to pick.

8. Set up your [[Git]] repository, filling out the `repository` field in your *package.json*.
```json
{
	"repository": {
		"url": "https://really-cool.repository.com"
	}
}
```

#### Running a test build

You now have all the source needed for a VSCode extension 🥳!

To build:
```shell
# Build to the final JavaScript bundle
bunx tsc

# Package into a VSCode extension
bunx vsce package
```

Ensure that the `main` key in your *package.json* is the same as the `outDir`/`outFile` as specified in your *tsconfig.json*.

You can then install the extension to your local VSCode by running:
```shell
# Replacing <whatever> with your extension.
code --install-extension whatever-0.0.0.vsix
```

#### Wrapping up the start

From here, I'd recommend a couple of scripts added to *package.json*:
```json
{
	...,
	"scripts": {
		"compile": "tsc",
		"package": "vsce package",
		// vscode:prepublish is a special script as used by vsce.
		"vscode:prepublish": "bun compile"
	}
}
```
## Configuration

[*For more configuration options than are listed here, check out the extension manifest.*](https://code.visualstudio.com/api/references/extension-manifest)

### Activation

Your extension will start doing things in the editor when it is both '*loaded*' and '*activated*'.

This is because VSCode will lazyload extensions to save on resources - you don't need the [Python extension](https://marketplace.visualstudio.com/items?itemName=ms-python.python) loaded if you aren't editing [[Python]] files.

The most common activation type is `onLanguage`, which will activate when a file matching one of [VSCode's language identifiers](https://code.visualstudio.com/docs/languages/identifiers) gets opened.

```json
{
	...,
	"activationEvents": [
		// For my really cool Java NetBeans extension.
		// It'll take off, I swear 😎.
		"onLanguage:java"
	],
	...,
}
```

To break out of this system entirely (and be a bit of a jerk) VSCode provides a `*` activation event, which will just always run.

```json
{
	// I am a real jerk. Take that, other extensions 😈.
	"activationEvents": [ "*" ]
}
```

[*For more information, check out the VSCode documentation on activation events.*](https://code.visualstudio.com/api/references/activation-events)

### Contributes

VSCode can keep track of things that your extension does *without* it being activated, these are registered in the extension using *[contribution points](https://code.visualstudio.com/api/references/contribution-points).*



[*For more information, check out the VSCode documentation on contribution points.*](https://code.visualstudio.com/api/references/contribution-points)