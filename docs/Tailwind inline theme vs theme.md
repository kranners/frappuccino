---
id: Tailwind inline theme vs theme
date: "08 July, 2025"
---

# Tailwind inline theme vs theme

Tailwind v4 introduced a new `@theme` directive.

The directive replaces most of what you could accomplish in v3's Tailwind config file.

[See the old Tailwind config file.](https://v3.tailwindcss.com/docs/configuration)

Either one you pick, the `@theme` directive does two things for everything you put in it:
1. It makes a CSS variable
2. It makes a series of respective utility classes using that CSS variable

If you use `@theme inline` instead of `@theme`, then those utility classes will
reference the actual value itself.

[See the Tailwind documentation](https://tailwindcss.com/docs/theme#theme-variable-namespaces)

[The Tailwind documentation](https://tailwindcss.com/docs/theme#referencing-other-variables)
suggests that if your `@theme` variables reference other variables, that you
use `inline`.

## Example

This is what it looks like using regular `@theme`:
```css
@theme {
    --color-red: red;
}

/* Outputs */
:root {
    --color-red: red;
};

.bg-red {
  background-color: var(--color-red);
}
```

vs `@theme inline`

```css
@theme inline {
    --color-red: red;
}

/* Outputs */
:root {
    --color-red: red;
};

.bg-red {
  background-color: red;
}
```

[See this Tailwind issue](https://github.com/tailwindlabs/tailwindcss/discussions/17826)

[This is also a good explainer of the difference here.](https://github.com/tailwindlabs/tailwindcss/discussions/15122#discussioncomment-11356322)
