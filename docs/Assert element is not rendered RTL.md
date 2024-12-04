---
id: Assert element is not rendered RTL
date: "04 December, 2024"
---

# Assert element is not rendered RTL

Using `getBy...` will throw an error if the element is not present.

So use either `queryBy` or `queryAllBy`.

```jsx
// If queryByRole finds nothing, it'll return null
expect(screen.queryByRole('heading', { name: 'Log in' })).toBeNull();

// If you have jest-dom, you probably want to use expect().not.toBeInTheDocument()
expect(screen.queryByRole('heading', { name: 'Log in' })).not.toBeInTheDocument();

// For elements that you'd otherwise expect multiple of, maybe you wanna use this method? Or not. I'm not your dad.
expect(screen.queryAllByText('todo')).toHaveLength(0);
```

See [Appearance and Disappearance | Testing Library](https://testing-library.com/docs/guide-disappearance/#asserting-elements-are-not-present)
