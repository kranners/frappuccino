---
id: Stacking DOM elements on top of eachother
date: "09 October, 2025"
---

# Stacking DOM elements on top of eachother

Given HTML like:
```html
<div className="outer">
  <div className="inner"></div>
  <div className="inner"></div>
</div>
```

How do you stack the two inner `div`s on top of eachother?

### Using absolute position

```css
.parent {
  position: relative;
}

.child {
  position: absolute;
}
```

This will stack the child elements on top of eachother, relative to the
parent's position.

Without the relative position on the parent, the child elements will be
absolutely positioned to the whole screen.

From here, you can shuffle the position of the children around with `top`,
`left` etc.

### Using grid

You can also position two elements on top of eachother by placing them onto a
grid.

The benefit here is that you can align them however you want without relying on
specific measurements. It's a bit more fluid.

The simplest example is a 1x1 grid, where both children span over that one row
and one column.

```css
.parent {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;

  /* If you want them to be center-aligned on top of eachother */
  justify-items: center;
  align-items: center;
}

.child {
  grid-row: 1;
  grid-column: 1;
}
```

See [How to Stack Elements in CSS | CSS-Tricks](https://css-tricks.com/how-to-stack-elements-in-css/)
See [Stacking DIVs on top of each other?](https://stackoverflow.com/questions/1909648/stacking-divs-on-top-of-each-other)

