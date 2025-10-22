---
id: TypeScript infer keyword
date: "22 October, 2025"
---

## The `infer` keyword

[The `infer` keyword](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types) is used for declaring a new inline generic type inside of another type declaration.

This is usually used for extracting types from inside of generic wrapper and conditional types.

That is a pretty meaningless statement, so here are some examples.

You could use this as an alternative for the `T["data"]` from [[TypeScript conditional types|Conditional types]]
to get the success data.

```typescript
type SuccessData<T> = T extends { data: infer Data } : Data : never;
```

You could use this to unwrap an array into its type.

```typescript
type ArrayType<T> = T extends Array<infer Item> : Item : T;
```

You can do the same thing to the return types of functions.

```typescript
type FunctionReturns<T> = T extends () => infer Return ? Return : void;

type StringFunction = () => string;

// Str = string
type Str = FunctionReturns<StringFunction>;
```
