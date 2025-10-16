---
id: Updating outdated npm packages
date: "20 September, 2025"
---

# Updating outdated npm packages

Check for any outdated plugins with:
```shell
npm outdated
```

This should output a table of versions and packages like:
```
Package            Current   Wanted   Latest  Location                        Depended by
@astrojs/check       0.8.2    0.8.3    0.9.4  node_modules/@astrojs/check     folio
...
react               18.3.1   18.3.1   19.1.1  node_modules/react              folio
react-dom           18.3.1   18.3.1   19.1.1  node_modules/react-dom          folio
sass                1.77.8   1.93.0   1.93.0  node_modules/sass               folio
svelte              4.2.18   4.2.20   5.39.3  node_modules/svelte             folio
tailwindcss          3.4.6   3.4.17   4.1.13  node_modules/tailwindcss        folio
typescript           5.5.3    5.9.2    5.9.2  node_modules/typescript         folio
vue                 3.4.33   3.5.21   3.5.21  node_modules/vue                folio
```

Update to the latest that still satifies your package.json range restriction with:
```shell
npm update
```

See [npm update documentation](https://docs.npmjs.com/updating-packages-downloaded-from-the-registry)

### Update to latest, ignoring installed range

To update everything to the latest ignoring the installed range, start by
changing the range of your packages to update to `"*"`, like:
```json
{
  "dependencies": {
    "@astrojs/check": "*",
    ...
    "react": "*",
    "react-dom": "*",
    "svelte": "*",
    "tailwindcss": "*",
    "typescript": "*",
    "vue": "*"
  },
  "devDependencies": {
    "sass": "*"
  }
}
```

And then run:
```shell
npm update --save
```

To save the updated version ranges to package.json.

Then `npm install` to install the new versions of the packages, and watch in
glee as everything is now broken.

If some stragglers don't make it with the first `npm update --save`, and still
have a `*` range, then give them a quick `npm install <package>`.

Like:
```shell
# Update that pesky vue package range
npm install vue
```


#### npm-check-updates

[npm-check-updates](https://www.npmjs.com/package/npm-check-updates) is a
package you can run to do a similar task.

You can run it with:
```shell
npx npm-check-updates -u
```

This will update the version ranges of every package to their latest.

This does not take into account any kind of peer dependency resolution, so your
package versions will likely be incompatible with eachother and need more work.

Do this if you are totally crazy and enjoy throwing entire days away at a wall.

