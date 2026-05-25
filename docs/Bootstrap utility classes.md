---
id: Bootstrap utility classes
date: "01 May, 2026"
---

# Bootstrap utility classes

## Z-index

> [!NOTE] NOTE
> These were added in Bootstrap 5.3.

`z-3`, `z-2`, `z-1`, `z-0`, `z-n1`

[See Z-index in the Bootstrap documentation.](https://getbootstrap.com/docs/5.3/utilities/z-index/)

## Typography

### Text decoration

```html
<p class="text-decoration-underline">Underlined</p>
<p class="text-decoration-line-through">Strikethrough'd</p>
<a href="#" class="text-decoration-none">Link without decoration</a>
```

[See Text decoration in the Bootstrap documentation.](https://getbootstrap.com/docs/5.2/utilities/text/#text-decoration)

## Interactions

### Text selection

```html
<p class="user-select-all">Instantly select everything</p>
<p class="user-select-auto">Default</p>
<p class="user-select-none">None</p>
```

[See Text selection in the Bootstrap documentation.](https://getbootstrap.com/docs/5.3/utilities/interactions/#text-selection)

### Pointer events

```html
<a href="#" class="pe-none">This link</a> can not be clicked.
<a href="#" class="pe-auto">This link</a> can be clicked (this is default behavior).
```

[See Pointer events in the Bootstrap documentation.](https://getbootstrap.com/docs/5.2/utilities/interactions/#pointer-events)

## Border

To add or remove borders:
```html
<span class="border"></span>
<span class="border-top"></span>
<span class="border-end"></span>
<span class="border-bottom"></span>
<span class="border-start"></span>
<span class="border border-0"></span>
<span class="border border-top-0"></span>
<span class="border border-end-0"></span>
<span class="border border-bottom-0"></span>
<span class="border border-start-0"></span>
```

To color or set opacity on a border:
```html
<div class="border border-success p-2 mb-2 border-opacity-50">This is 50% opacity success border</div>
```

## Opacity

```html
<div class="opacity-100">...</div>
<div class="opacity-75">...</div>
<div class="opacity-50">...</div>
<div class="opacity-25">...</div>
<div class="opacity-0">...</div>
```

[See Opacity in the Bootstrap documentation.](https://getbootstrap.com/docs/5.3/utilities/opacity/)

## Vertical align

```html
<span class="align-baseline">baseline</span>
<span class="align-top">top</span>
<span class="align-middle">middle</span>
<span class="align-bottom">bottom</span>
<span class="align-text-top">text-top</span>
<span class="align-text-bottom">text-bottom</span>
```
- [ ] 
[See Vertical alignment in the Bootstrap documentation.](https://getbootstrap.com/docs/5.3/utilities/vertical-align/)

## Position

```html
<!-- Set position: whatever -->
<div class="position-static">...</div>
<div class="position-relative">...</div>
<div class="position-absolute">...</div>
<div class="position-fixed">...</div>
<div class="position-sticky">...</div>

<!-- Set top, left etc. 0 = 0%, 50 = 50%, 100 = 100% -->
<div class="position-absolute top-0 end-0"></div>
<div class="position-absolute top-50 start-50"></div>
<div class="position-absolute bottom-100 end-100"></div>
```

[See position in the Bootstrap documentation](https://getbootstrap.com/docs/5.2/utilities/position/).

