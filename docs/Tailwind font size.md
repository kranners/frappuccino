---
id: Tailwind font size
date: "10 November, 2024"
---

# Tailwind font size

Use the `text-*` utility classes to set the font size.

- `text-xs` →  ... `text-base` ... →  ... `text-9xl`

What these values actually mean is configurable - so will change.
See the documentation for the default values.

See [Font Size from the Tailwind documentation](https://tailwindcss.com/docs/font-size)

### `line-height`

To set `line-height` at the same time as `font-size`, [use a "line height modifier"](https://tailwindcss.com/docs/font-size#setting-the-line-height).

Meaning, a `/` followed by a value representing the line height.

The value is anything that would follow the utility class `leading-*`.

```html
<button class="text-sm/relaxed">
    relaxin' 🏝️
</button>
```

See [Line Height from the Tailwind documentation](https://tailwindcss.com/docs/line-height)

