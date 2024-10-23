---
id: const assertions
aliases:
  - const assertions
tags: []
---

# const assertions

A const assertion is a type assertion where `const` is the type given.
It limits the scope of whatever is cast to the most specific form the expression can take.

[TypeScript documentation](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions)
[The relevant pull request](https://github.com/Microsoft/TypeScript/pull/29510)

### Syntax

Where a normal type assertion would look something like:
```ts
const fruit = "banana" as string;

// fruit is string
```

A const assertion looks like:
```ts
const fruit = "banana" as const;

// fruit is "banana"
```

If not in TSX, you can use the alternative angle bracket assertion syntax instead:
```ts
const fruit = <const>"banana";
```

### Caveats

These only work with literal expressions, object literals & array literals.
As in, this won't work:
```ts
// error!
const millisInMinute = (1000 * 60) as const;

// no error 😌
const millisInMinute = 60000 as const;
```

They also don't convert an expression to be fully immutable, so this is possible:
```ts
const shelf = {
    fruits: ["banana", "apple"],
} as const;

// woah!
shelf.fruits.push("pomegranate");
```

