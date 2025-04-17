---
id: Reference package attributes Node
date: "15 April, 2025"
---

# Reference package attributes Node

npm scripts (`npm run ...`) are run with several environment variables passed in which reference package attributes. 

For example, `npm_package_version` or `npm_package_name`:

With a package.json:
```package.json
{
    "name": "coolpack",
    "version": "1.2.3"
}
```
```js
// "coolpack"
console.log(process.env.npm_package_name);

// "1.2.3"
console.log(process.env.npm_package_version);
```

See [the NPM documentation](https://docs.npmjs.com/cli/v8/using-npm/scripts#packagejson-vars)
See [config | npm Docs](https://docs.npmjs.com/cli/v10/using-npm/config#shorthands-and-other-cli-niceties)
