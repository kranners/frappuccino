---
id: Webpack
date: "19 January, 2025"
---

# Webpack

[Webpack](https://webpack.js.org/) is a ubiquitous JavaScript bundler.

## Getting started

Start with a fresh Node project - webpack recommends the current LTS version.

Install Webpack and it's surrounding tools
```shell
npm install -D webpack webpack-cli webpack-dev-server
```

Create a new config using the Webpack CLI:
```shell
npx webpack init
```

That's it!

See [the Webpack Getting Started guide](https://webpack.js.org/guides/getting-started).

See [Webpack Configuration page](https://webpack.js.org/configuration/#root)

## Configuring

### What does `mode` do?

`mode` sets several (many) default options in your Webpack config for you.

It can be set to `production`, `development`, or `none`.
- `production` builds slower, with more optimised builds, and without sourcemaps.
- `development` just means _non-production_. Faster, less optimised builds with sourcemaps.
- `none` means to opt out of this defaulting behaviour completely.

For [which options are specifically affected, check out the webpack source.](https://github.com/webpack/webpack/blob/main/lib/config/defaults.js)

(Search for "production" 👆)

### Setting up for TypeScript

By default Webpack does not look for `.ts` files, and does not know what to do with them.

Start by installing the requirements to run TS to begin with:
```shell
# You can also use babel-loader
npm install -D typescript ts-loader
```

Then configure Webpack to resolve `.ts` extensions and to load them with `ts-loader`:
```ts
import webpack from "webpack";

const config: webpack.Configuration = {
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js", ".html", ".json"],
    },
    /* ... */
};

export default config;
```

See [TypeScript setup from the Webpack documentation](https://webpack.js.org/guides/typescript/)

See [Webpack cant resolve TypeScript modules](https://stackoverflow.com/questions/43595555/webpack-cant-resolve-typescript-modules)

## Troubleshooting

### TypeError: Unknown file extension ".ts" for ./webpack.config.ts

This means you're using ESM imports and Webpack doesn't know how to resolve that.

Off the bat, Webpack only knows how to use CJS.

So, to fix this error - you need to build at the very least the config in CJS.

The perfect fix would be updating the overall TSConfig `compilerOptions` to:
```diff
 {
   "compilerOptions": {
-    "module": "es2022",
-    "target": "es2017",
-    "moduleResolution": "bundler",
+    "module": "commonjs",
+    "target": "es5",
```

Otherwise, create a separate `compilerOptions` section just for ts-node:
```json
{
    "compilerOptions": {
        "module": "esnext",
        /* ... */
    },
    "ts-node": {
        "compilerOptions": {
            "module": "commonjs"
        }
    }
}
```

