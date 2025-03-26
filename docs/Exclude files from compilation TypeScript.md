---
id: Exclude files from compilation TypeScript
date: "25 March, 2025"
---

# Exclude files from compilation TypeScript

To ignore a source file from compilation, add the `exclude` option from **outside** your `compilerOptions` in the tsconfig.json.

The default value for this option is:
```json
[
    "node_modules",
    "bower_components",
    "jspm_packages",
    "<outDir>"
]
```

Example:
```json
{
  "compilerOptions": {
    ...,
  },
  "exclude": ["test-samples", "dist", "node_modules"]
}
```

See [TSConfig reference for the exclude option](https://www.typescriptlang.org/tsconfig/#exclude)
