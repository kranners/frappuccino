---
tags:
  - javascript
  - web
  - components
---

# Custom Elements

[Custom elements (web components)](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) are a means of introducing some code reuse into what would otherwise be vanilla HTML.

```html
<html>
	<body>
		<!-- Note the hypen in the name this is mandatory! -->
		<my-custom-component />
	</body>
</html>
```

## Defining custom elements

Elements are defined as a [[JavaScript]] [class which extends `HTMLElement` or its derivatives](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#implementing_a_custom_element).

```javascript
// This is the minimum custom element.
class MyCustomComponent extends HTMLElement {
	constructor() {
		super();
	}
}
```

They can then be loaded in the same module:
```javascript
class MyCustomComponent extends HTMLElement { ... };

// When the module is loaded, this will get run.
customElements.define('my-custom-component', MyCustomComponent);
```

The two main functions we care about within this spec are `connectedCallback()` and `disconnectedCallback()`.
