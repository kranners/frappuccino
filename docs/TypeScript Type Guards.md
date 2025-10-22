---
id: TypeScript Type Guards
date: "22 October, 2025"
---

# Type Guards

A [type guard](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates) is a TypeScript-unique function whose return type is a 'type predicate' notated as `argument is T`. However, their 'actual' return type is `boolean`.

Type guards are used as an advanced form of [type narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html).

```typescript
// You don't necessarily need to use 'unknown' as the argument type.
function isDuck(given: unknown): given is Duck {
	// If it quacks like a duck 🦆.
	return Boolean(given) && 'quack' in given;
}

// This could also be written as an anonymous function in the same way.
const isDuck = (given: unknown): given is Duck => {
	...
}
```

These can later be used to narrow the type of a variable at runtime.

```typescript
function attemptGetDuck(): Duck | undefined {
  // handful is unknown
  const handful: unknown = scoopFromPond();

  // The isDuck type guard is used here to early return.
  if (!isDuck(handful)) return undefined;

  // The compiler is smart enough to know that at this point,
  // handful is Duck
  return handful;
}
```

