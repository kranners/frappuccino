---
id: React testing library renderHook
date: "20 October, 2025"
---

# React testing library renderHook

`renderHook` is a convenience wrapper for testing hooks.

This is so that you don't need to make dummy components for testing hooks.

It takes in a callback which calls your hook, and returns a custom
_RenderHookResult_.

The _RenderHookResult_ contains a `result` key, which is a ref of the result of
your hook call.

```tsx
// Yoinked from the documentation
import { renderHook } from '@testing-library/react'

test('returns logged in user', () => {
  const { result, rerender } = renderHook((props = {}) => props, {
    initialProps: { name: 'Alice' },
  });

  expect(result.current).toEqual({ name: 'Alice' });

  rerender();

  expect(result.current).toEqual({ name: undefined });
})
```

See [renderHook from the RTL documentation](https://testing-library.com/docs/react-testing-library/api/#renderhook)

