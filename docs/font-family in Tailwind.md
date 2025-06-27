---
id: font-family in Tailwind
date: "19 June, 2025"
---

# font-family in Tailwind

See [font-family in the Tailwind documentation](https://tailwindcss.com/docs/font-family)

### Basic usage

Basics are done through `font-sans`, `font-serif` and `font-mono`.

These set [the `font-family` CSS property](https://developer.mozilla.org/en-US/docs/Web/CSS/font-family).

To one of `--font-sans`, `--font-serif`, or `--font-mono`.
By default, these are:
- Sans: 
`ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
'Segoe UI Symbol', 'Noto Color Emoji'`

- Serif: 
`ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif`

- Mono: 
`ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
'Courier New', monospace`

### Custom fonts

Use the `@theme` at-rule in your Tailwind setup:
```css
@theme {
  --font-cool: "Omnes", ui-sans-serif; 
}
```

Then use in your markup like `font-cool`.
