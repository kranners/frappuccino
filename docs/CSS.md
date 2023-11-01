---
tags:
  - css
  - web
  - javascript
  - development
---

# CSS

[CSS (Cascading-Style-Sheets)](https://developer.mozilla.org/en-US/docs/Web/CSS) is a language for defining how a document, typically written in [[HTML]] is presented.

## Common usages

#### Position two elements on top of eachother

**Using `position: absolute`:**
```html
<section class="container">
	<div class="child">B1</div>
	<div class="child">B2</div>
</section>
```

```css
/* With this method, the child will always be positioned absolutely. */
/* This might be what you want, but likely you'll want it to stick */
/* to the container. */
.child {
	position: absolute;
}
```

**Using `position:absolute` with a relative parent**
```css
.container {
	position: relative;
}

.child {
	position: absolute;

	/* Position up the top left of the container at all times. */
	top: 0;
	left: 0;
}
```