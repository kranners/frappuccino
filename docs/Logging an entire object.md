---
id: Logging an entire object
date: "13 January, 2026"
---

# Logging an entire object

[Use `console.dir`.](https://nodejs.org/api/console.html#console_console_dir_obj_options)

Pass in your object as the first argument, and an object of options as the second.

The option you care about is `depth`, indicating how many properties deep to log.

A `depth` of `Infinity` or of `null` indicates infinite depth, enumerate forever.
You may not want this to avoid recursive properties.

```ts
console.dir(myComplicatedObject, { depth: null, showHidden: false, colors: false });
```

