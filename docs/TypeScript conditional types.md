---
id: TypeScript conditional types
date: "22 October, 2025"
---

# Conditional types

[A conditional type](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html) is a kind of [generic type](https://www.typescriptlang.org/docs/handbook/2/generics.html) which passes the generic through a condition before resolving to one of two types.

**Syntax**

```typescript
type Conditional<T> = T extends Condition ? TrueType : FalseType;
```

This happens at compile-time.

Say, we have a `Success` type which contains some data, and we want to get the type of that data at compile time.

```typescript
type Success = { success: true; data: unknown };
type Failure = { success: false; error: Error };

// Error! Type "data" cannot be used to index type T.
type SuccessData<T> = T["data"];
```

To fix this issue, you could restrict that `SuccessData` **only** takes in a `Success` object.

```typescript
// This is happy now :)
type SuccessData<T extends Success> = T["data"];

// However, if we try to use this in practice it'll end up less good.
const response: Success | Failure = goGetAnAPI();

// Error! The response object might not have a data key.
const data: SuccessData<typeof response> = response.data;
```

However you run into that last issue. No bueno.
A solution here would be to let `SuccessData` take in anything, and only unwrap if it's required.
Otherwise, default to something like `never` to indicate that its value is not to be used.

```typescript
type SuccessData<T> = T extends Success ? T["data"] : never;

// never | unknown
const data: SuccessData<typeof response>;
```

