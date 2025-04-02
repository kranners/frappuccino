---
id: Resizing an SVG
date: "27 March, 2025"
---

# Resizing an SVG

An SVG can contain a `viewBox` attribute, a `width` and `height` attribute, _or both_.

In the case of both being set, the viewBox is used for scaling the path inside the `svg` tag, and the width/height are used for setting the overall svg size.

If there is no `viewBox` set, width/height is used as the viewBox.
If there is no width/height set, the size of the SVG will scale automatically.

