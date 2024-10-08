---
id: 1726122696-JCDL
aliases:
  - React Testing Library TextMatch
tags: []
---

# React Testing Library TextMatch

React Testing Library functions take in a type called `TextMatch` as their sole argument.

The argument can be:

- A string, in which it will match only for exact strings, or substrings.
- A regex pattern, which will match for substrings by default, but has access to regex logic
- A function, which returns a `boolean` for whether or not to match the given `element`

[For more info, see the React Testing Library docs on TextMatch.](https://testing-library.com/docs/queries/about/#textmatch)

For a given DOM like:

```html
<div id="a">
  <div id="b">
    <div id="c"><span>this</span> text <a>is</a> <strong>broken</strong></div>
    <div id="d">I Am Complete Text :)</div>
  </div>
</div>
```

##### To select the `div` D with a full string search:

```tsx
screen.getByText("I Am Complete Text :)");
```

##### To select the `div` D with non-case-sensitive substring search:

Use the option `exact`, [for all the available options see the ByText API docs.](https://testing-library.com/docs/queries/bytext#api)

```tsx
// No you are NOT complete!!
screen.getByText("am complete", { exact: false });
```

##### To select the `div` C with a function (useful for weird selectors, broken elements):

```tsx
const doesElementHaveContent = (element?: Element | null) => {
  return element?.textContent === "this text is broken";
};

screen.getByText((content?: string, element?: Element | null) => {
  const elementHasContent = doesElementHaveContent(element);
  const childHasContent = element?.children?.some(doesElementHaveContent);
  return elementHasContent && !childHasContent;
});
```

:::tip
If that `childHasContent` check was _not_ there, the function would return `div`s A, B and C.
:::

[For what you can do with `Element`, check out the MDN documentation.](https://developer.mozilla.org/en-US/docs/Web/API/Element)
