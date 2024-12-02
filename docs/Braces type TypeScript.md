---
id: Braces type TypeScript
date: "29 November, 2024"
---

# Braces type TypeScript

The `{}` type in TypeScript doesn't do what you'd think it does.

`{}` actually means "anything that isn't `null` or `undefined`".
An optional `{}` will generally mean "anything that isn't `null`".

This is generally a mistake.

This is true in any context, [including as part of an `extends`](https://www.typescriptlang.org/play/?#code/GYVwdgxgLglg9mABMOcA8AVRBTAHlbMAEwGdEBvAXwD4AKABwEMAnRgWwC5EMBKCygFACUcWlGYhsPANzDUtAIwy5oqspG0wIADbaZiAPQGcuetmjYiOZszjMBQA).

This is also true of the `Object` type, which behaves the same way.

See [this relevant typescript-eslint issue](https://github.com/typescript-eslint/typescript-eslint/issues/2063#issuecomment-675156492)

### Alternatives

Here are some alternative types named after what you might want to use `{}` for:
```ts
type AnyValidObject = Record<string, unknown>;
type EmptyObject = Record<string, never>;

type AnyValueAtAll = unknown;
```

### Interfaces

It's worth noting that an empty interface means the same thing as `{}`:
```ts
interface NonNullable {}

type AnotherNonNullable = {};

const a: NonNullable = () => {};
const b: AnotherNonNullable = { anObject: "can contain anything 👻" };
```

