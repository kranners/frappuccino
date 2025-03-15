---
id: Pointer media feature
date: "13 March, 2025"
---

# Pointer media feature

`pointer` is a media feature (something queryable with a media-query) which can
test how accurate the "pointing device" of the user is.

Typically, a `coarse` pointer means a touchscreen. A `fine` pointer means a mouse.

To add a hover state that excludes touchscreen:
```css
@media (pointer: fine) {
  &:hover {
    background-color: #d3d3d3;
  }
}
```

See [pointer - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer#syntax)

