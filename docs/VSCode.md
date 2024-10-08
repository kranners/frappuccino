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

_Check out the [Your First Extension](https://code.visualstudio.com/api/get-started/your-first-extension) docs page for more information._

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

_(If you previously globally installed those build tools, you can remove them now.)_

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

3. Specify the [`engines`](https://docs.npmjs.com/cli/v6/configuring-npm/package-json#engines), [`categories`](https://code.visualstudio.com/api/references/extension-manifest#:~:text=is%20and%20does.-,categories,-string%5B%5D), [`activationEvents`](#activation), [`main`](https://docs.npmjs.com/cli/v6/configuring-npm/package-json#main), and [`contributes`](#contributes) keys in your _package.json_:

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

For more info on [the `engines` property, see the official docs](https://code.visualstudio.com/api/working-with-extensions/publishing-extension#visual-studio-code-compatibility).

4. Install `@vscode/vsce` for packaging, and any other required library.

```shell
# You will always need this one.
bun add -D @vscode/vsce

# If you're using TypeScript, these ones are practically required.
bun add -D typescript @types/node @types/vscode
```

At this stage, unless you _really_ know what you're doing - I'd also suggest [installing a recommended tsconfig.json](https://github.com/tsconfig/bases#available-tsconfigs).

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

5. Export two functions from your _index.ts_, `activate()` and `deactivate()`.

```typescript
export function activate() {}

export function deactivate() {}
```

6. Create a _LICENSE.md_. See [[Software Licensing]] to see one to pick.

7. Set up your [[Git]] repository, filling out the `repository` field in your _package.json_.

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

Ensure that the `main` key in your _package.json_ is the same as the `outDir`/`outFile` as specified in your _tsconfig.json_.

You can then install the extension to your local VSCode by running:

```shell
# Replacing <whatever> with your extension.
code --install-extension whatever-0.0.0.vsix
```

#### Wrapping up the start

From here, I'd recommend a couple of scripts added to _package.json_:

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

### Adding a new command

[_For more info on extension commands, see their official documentation._](https://code.visualstudio.com/api/extension-guides/command)

1. Start by adding the command metadata to your _package.json_ `contributes` field:

```json
{
  "contributes": {
    "commands": [
      {
        // The internal ID of your command
        "command": "myExtension.internalName",

        // The display name of your command to users
        "title": "Go crazy aaaa",

        // Optional, also used in the display name "Stuff: Go crazy aaaa"
        "category": "Stuff",

        // Optional, 16x16 svg with 2px padding icon for display
        "icon": {
          "light": "path/to/light/icon.svg",
          "dark": "path/to/dark/icon.svg"
        }
      }
    ]
  }
}
```

2. In your extension entrypoint, register and push the command into your extension context:

```typescript
import { ExtensionContext, commands } from "vscode";

export function activate(context: ExtensionContext): void {
  context.subscriptions.push(
    commands.registerCommand("myExtension.internalName", () => {
      console.log("Hi 👋");
    })
  );
}

export function deactivate() {}
```

:::tip
The name given in `registerCommand()` MUST match the name in your `contributes`.
:::

## Debugging and Troubleshooting

### "Help! My extension won't activate and I don't know why!"

Failures at activation can be spotted in the Extension Host logs.

You can get to the Extension Host logs either from the Output tab, or if there is no output tab:

1. ⌘ + ⇧ + P to open the command palette (or the Windows equivalent)
2. Run the command _Output: Show output channels_
3. Type _Extension Host_ and hit enter.

## Configuration

[_For more configuration options than are listed here, check out the extension manifest._](https://code.visualstudio.com/api/references/extension-manifest)

### Activation

Your extension will start doing things in the editor when it is both '_loaded_' and '_activated_'.

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
  "activationEvents": ["*"]
}
```

[_For more information, check out the VSCode documentation on activation events._](https://code.visualstudio.com/api/references/activation-events)

### Contributes

VSCode can keep track of things that your extension does _without_ it being activated, these are registered in the extension using _[contribution points](https://code.visualstudio.com/api/references/contribution-points)._

[_For more information, check out the VSCode documentation on contribution points._](https://code.visualstudio.com/api/references/contribution-points)
