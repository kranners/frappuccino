---
id: TypeScript generic functions
date: "22 October, 2025"
---

# TypeScript generic functions

[Generic functions](https://www.typescriptlang.org/docs/handbook/2/generics.html#hello-world-of-generics) are strongly-typed functions which take in a type parameter, which can be used in the signature of the function.

```typescript
type Maybe = unknown | undefined;

function unwrap<T extends Maybe>(maybe: T = null): unknown | null {
  return maybe;
}

function asList<T>(item: T): Array<T> {
  return [item];
}
```

`const` arrow function generics have a bit of a wonky syntax when dealing in `.tsx` files:

```tsx
// This is the most commonly accepted answer.
// The comma indicates that this is a generic type with only one argument.
const asList<T, >(item: T) => [ item ];

// This also works, but is considered more of a hack.
const asList<T extends unknown>(item: T) => [ item ];

// This ALSO works but is considered even more of a hack.
const asList<T extends {}>(item: T) => [ item ];
```

This is because the parser can't distinguish between `<T>` (as in a generic) and `<T/>` (as in a HTML tag).

