---
id: Transition multiple properties CSS
date: "20 May, 2026"
---

# Transition multiple properties CSS

You can transition a single property:
```css
.fader {
    transition: opacity 500ms ease;
}
```

Or all properties:
```css
.fancy {
    transition: all 500ms ease;
}
```

Or some specific properties:
```css
.mover-and-fader {
    transition: all 500ms ease;
    transition-property: opacity, transform, width, height;
}
```

[See transition-property from the MDN documentation.](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transition-property)

