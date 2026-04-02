---
id: Node memory management
date: "01 April, 2026"
---

# Node memory management

Node is built on the V8 engine, and uses the same memory management as that.

[V8 uses a generational garbage collector](https://www.memorymanagement.org/glossary/g.html#term-generational-garbage-collection), which is based on [the generational hypothesis](https://www.memorymanagement.org/glossary/g.html#term-generational-hypothesis).

The generational hypothesis states:
> In most cases, young objects are much more likely to die than old objects.

Or, most objects are short-lived. For example, a short-lived object might be
the body of an API response. A long-lived object may be a static config or some
singleton. There are many API responses, but only one config.

V8 splits its heap memory into two _spaces_, one _New Space_ (or `semi-space`
in command-line arguments) for short-lived objects, and an _Old Space_, where
long-lived objects are promoted to.

By default, V8 will determine how often to run its garbage collection, but this
can be tuned.

[See Understanding and Tuning Memory from the Node documentation](https://nodejs.org/en/learn/diagnostics/memory/understanding-and-tuning-memory)

## Tuning and diagnosing memory usage

You can tune Node's garbage collection using CLI flags, for example:
```shell
node
    # Set Old Space size to 4096MB
    --max-old-space-size=4096
    # Set New Space size to 64MB
    --max-semi-space-size=64
    # Manually set the interval the GC runs to 100ms
    --gc-interval=100
    # Allow usage of `global.gc()` to trigger GCs
    --expose-gc
    index.js
```

When `--expose-gc` is set, you can manually trigger a garbage collection like:
```ts
someMemoryIntensiveProcess();

// Trigger collection
global.gc();
```


You can monitor memory usage in a running Node process like:
```ts
// process.memoryUsage() returns an object
console.log(process.memoryUsage());
```

