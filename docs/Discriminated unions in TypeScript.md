---
id: Discriminated unions in TypeScript
date: "02 July, 2025"
---

# Discriminated unions in TypeScript

[A discriminated union is a union type who could be any of a given set of types, but not eachother.](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions)

It's useful for a situation where you have several different, conflicting
shapes that a single given value could be.

It means that you'll be able to get [[TypeScript]] compiler errors for
non-exhaustive checks, rather than finding out in production.

## The naive approach

Naively, it looks like:
```ts
type Rectangle = {
    width: number;
    height: number;
}

type Circle = {
    radius: number;
}

type Shape = Rectangle | Circle;
```

However, you'll find this doesn't work quite like you'd expect.
```ts
const rectangle: Shape = {
    width: 50,
    height: 50,
};

const circle: Shape = {
    radius: 50,
};

// This is technically a valid Shape!
const thing: Shape = {
    radius: 50,
    width: 50,
};
```

The `thing` down there, with a `radius` and a `width` but no height is still a valid `Shape`.

The documentation isn't clear on this, but I suspect that this is because:
1. `thing` satisfies `Circle`, which satisfies `Shape`
2. `thing` only contains known properties of `Shape`

## Discriminating the types

Often this pattern is done to differentiate from a number of known interface
responses. Maybe that interface is a library, API, whatever.

Like:
```ts
type SuccessResponse = {
    result: "ok";
    data: SuccessBody;
};

type ErrorResponse = {
    result: "error";
    error: Error;
};

type Response = SuccessResponse | ErrorResponse;

const doApiRequest = () => {
    const response: Response = fetch(...);

    if (response.result === error) {
        // Here TS can type narrow to know this is an ErrorResponse
        throw new Error(response.error);
    }

    // Here TS can type narrow to know this is a SuccessResponse
    // ...
};
```

This works because the two types being discriminated have a literal `result`
which differentiates them.

### Using `never` to differentiate the types

But you can also do this using `never`, if you need an input type, maybe for
component props rather than one coming from an interface.

Like:
```ts
type Rectangle = {
    width: number;
    height: number;

    radius?: never;
};

type Circle = {
    radius: number;

    width?: never;
    height?: never;
};

type Shape = Rectangle | Circle;
```

This makes the `thing` from earlier no longer allowed:
```ts
// Type '{ radius: number; width: number; }' is not assignable to type 'Shape'.
//   Types of property 'width' are incompatible.
//     Type 'number' is not assignable to type 'undefined'.(2322)
const thing: Shape = {
    radius: 50,
    width: 50,
};
```

[See this example on TS Playground.](https://www.typescriptlang.org/play/?#code/C4TwDgpgBAShDGwCGA7A5gG2gXigbwCgpioB3ASwBNgALALihQFcBbAIwgCcBuIkmiOTQ1gDZuy68+xTkkrkmAZwD8YiADdJBAL5TQkKAGFyneFii5CJKLPlKxrDjwLSyVWqsYat1gUJGeKN7Oui760ADKNEgGuHCIqJjQAD5GJmYQUvAA9iiKwDYIyOhYDFExOPiuFNT0UACsAAwANK5+wqINLTpZuflQ8OmlUOWxVda2CooMTa2hBDl5BbTk6GXRY1Ykk-ZdrdY1tDPdoUA)
