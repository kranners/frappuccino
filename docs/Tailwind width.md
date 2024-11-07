---
id: Tailwind width
aliases:
  - Tailwind width
tags: []
---

# Tailwind width

Width, min-width, and max-width are set with the `w-*`, `min-w-*`,
and `max-w-*`, where `*` is a spacing value.

```jsx
<div class="min-w-56 w-3/4 max-w-[5.65px]" />
```

:::warning
Values like `lg`, `md`, `sm` etc _only_ work for `max-w-*`.

🤷

```jsx
// This is invalid:
<div class="min-w-md" />

// But this is ok:
<div class="max-w-md" />
```
:::

See:
- [Width - Tailwind CSS](https://tailwindcss.com/docs/width)
- [Min-Width - Tailwind CSS](https://tailwindcss.com/docs/min-width)
- [Max-Width - Tailwind CSS](https://tailwindcss.com/docs/max-width)

