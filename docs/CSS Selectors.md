---
tags: css, selectors, typescript, ui, frontend
---

### Selecting a element containing another element

Use the `:has` selector.

```css
div:has(p) { background: red; } 
/* 
<div> 
	<!-- selected! --> 
	<p></p> 
<div>

<div>
	<!-- not selected -->
</div>  

<div> 
	<!-- not selected -->
	<section></section>
</div>
*/
```
