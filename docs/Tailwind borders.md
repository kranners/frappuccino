---
id: Tailwind borders
date: "20 August, 2025"
---

# Tailwind borders

To get a 1px border width, the class is just `border`.

```tsx
<!-- It's a box ⬜ -->
<div className="border its-a-box w-16 h-16" />
```

Border widths and colors are set seperately.

```tsx
<div class="border border-darkgoldenrod-200 ..."></div>
```

Border sides are set in the same classname.

```tsx
<div class="border-l-4 border-darkgoldenrod-200 ..."></div>
```

`x` and `y` are for left & right or top & bottom respectively.


See [the Tailwind documentation for borders](https://tailwindcss.com/docs/border-width)
