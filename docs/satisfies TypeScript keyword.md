---
id: satisfies TypeScript keyword
date: "22 October, 2025"
---

# satisfies TypeScript keyword

[`satisfies` is a keyword introduced in TypeScript 4.9](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator), in late 2022.

`satisfies` is used when you want to validate that an expression matches a
type, without also casting that expression to that type.

It's a bit confusing.

:::tip TLDR
I don't think `satisfies` is generally necessary. What it does is not
immediately obvious, and can be done more explicitly with regular type
narrowing.

See [[TypeScript Type Guards|Type Guards]].
:::

## The problem `satisfies` solves

For an example, check out this:
```ts
type Color = 'red' | 'blue' | 'green';

type Circle = {
    radius: number;
    color?: Color;
}

const dot = {
    size: 10,
    color: 'red',
};

function paint(color: Color) {
    console.log(`Painting ${color} paint everywhere`);
}

// This throws an error! 😵
paint(dot.color);
```

This throws an error since the `paint()` function expects _exactly_ the strings
`"red"` or `"blue"` or `"green"`.

In this case, `dot` has no type narrowing or validation, so has this type:
```ts
const dot: {
    size: number;
    color: string;
}
```
TypeScript will infer broadly by default.

`string` does not match `Color`, so we get a type error.

There is a second problem, in the `dot` object we have the property `size`,
when it should have been `radius`!

There are tons of ways we could solve this.

### Using type assertions

The first way you might think of would be an assertion. We can assert in two
different ways:
1. Type casting using `as`
```ts
type Circle = {
    radius: number;
    color?: Color;
}

const dot = {
  // New type error! This one we want, since this is the wrong property name.
  size: 10,
  color: 'red'
} as Circle;

// However, this still errors! 😵
paint(dot.color):
```

2. Type annotation
```ts
const dot: Circle = {
  size: 10,
  color: 'red'
};
```

Both of these have the same issue. The type of `Circle.color` is `Color | undefined`.

However, our `paint()` function needs a `Color`. Not a `Color | undefined`! So
it errors out.

### `const` assertion

[We can use the `as const` construct introduced in TypeScript 3.4 instead here.](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions)

The `as const` construct will narrow the type of an expression to its
_narrowest possible interpretation_.

This means that all properties on any object will be marked as `readonly` and
be narrowed to their literal type.

In this case, we can either assert on `dot` or just on `dot.color`:
```ts
// Either of these do get the job done
const dot = {
    size: 10,
    color: 'red' as const,
};

// Or
const dot = {
    size: 10,
    color: 'red',
} as const;

// No more type error 😌
paint(dot.color);
```

In both of these cases, the type of `dot.color` becomes `readonly "red"`.

Since `readonly "red"` satisfies `"red" | "blue" | "green"`, this all passes.

However, maybe marking everything as `readonly` is either undesirable or
impossible for your expression.

### `satisfies`

Using `satisfies` we can check that the `dot` object conforms to the `Circle`
type without overly casting its properties.

```ts
const dot = {
    radius: 10,
    color: 'red',
} satisfies Circle;

// No type error here either 😌
paint(dot.color);
```

After `satisfies`, the type of `dot` is:
```ts
const dot: {
    radius: number;
    color: "red";
}
```

`"red"` satisfies `"red" | "blue" | "green"`, this all passes.

### Using [[TypeScript Type Guards|Type Guards]]

We want `dot` to be a `Circle`.

We want to `paint` the `dot`'s `color` property.

If we make `dot` a `Circle` then `color` becomes `Color | undefined`.

Personally, I would solve this using type narrowing like:
```ts
const dot: Circle = {
    radius: 10,
    color: 'red',
};

function paint(color: Color) {
    console.log(`Painting ${color} paint everywhere`);
}

function paintCircle(circle: Circle) {
    if (circle.color === undefined) {
        return;
    }

    paint(circle.color);
}

paintCircle(dot);
```

Now `dot` _is_ the type we want, and any future `Circle`s (like those coming
from function arguments) have a happy path to `paint()`.

