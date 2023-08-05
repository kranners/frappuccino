---
tags: testing, vite, vitest, npm, node, typescript, javascript
---

[Vitest](https://vitest.dev/guide/) is a unit test framework for [[JavaScript]] and [[TypeScript]] built on [[Vite]].

```shell
yarn add -D vitest
```

# Basic Usage

Vitest has two modes, *watch mode* and *run mode*. 

Watch mode is for local development, and will re-run altered tests automatically. Like HMR in [[Vite]].

Run mode will run once, then fail or pass. This is intended for CI pipelines.

```shell
# Vitest will default to watch mode.
vitest

# Run in watch mode.
vitest watch

# Run in run mode.
vitest run
```

# Test examples

**Basic test case**

```typescript
import { describe, it, expect } from 'vitest';

describe('myFunction', () => {
	it('returns banana', () => {
		expect(myFunction()).toBe('banana');
	})
})
```

**Vitest mock function**

```typescript
import { describe, it, expect, vi } from 'vitest';

const fn = vi.fn();

describe('callbacker', () => {
	it('calls back', () => {
		callbacker(fn);

		expect(vi.isMockFunction(fn)).toBe(true)
		expect(fn).toHaveBeenCalled();
	})
})
```

**Test that something throws an error**

The use of `test` is just an alternative to `describe` and `it`.
```typescript
import { test, expect } from 'vitest';

const div = (a: number, b: number): number => {
	if (b === 0) {
		throw new MathError('You cannot divide by zero!');
	}

	if (a === 5) {
		throw new PreferenceError('Please do not divide five.');
	}

	return a / b;
}

test('throws on zero', () => {
	// Tests that the error contains the phrase 'divide by zero'.
	expect(() => div(1, 0)).toThrowError('divide by zero');

	// .toThrow() is an alias for the same thing.
	expect(() => div(5, 2)).toThrow('five');
});
```