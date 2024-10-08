---
id: React Testing Library wrapper option
aliases:
  - React Testing Library wrapper option
tags: []
---

# React Testing Library wrapper option

### In the docs

The `wrapper` option lets you pass in a component to be wrapped around the given `ui` in a RTL `render()`.

```jsx
const RenderWrapper = ({ children }) => {
    return ( 
        <ThemeProvider theme="light">
            {children}
        </ThemeProvider>
    )
}

const customRender = (ui, options) => {
    return render(ui, { wrapper: RenderWrapper, ...options });
}
```

[See Custom Render in the React Testing Library API docs](https://testing-library.com/docs/react-testing-library/setup/#custom-render)

### In the source

[`wrapper` is passed in to the `renderRoot` function](https://github.com/testing-library/react-testing-library/blob/3dcd8a9649e25054c0e650d95fca2317b7008576/src/pure.js#L143), it's renamed to `WrapperComponent`.

[Which is then passed in to `wrapUiIfNeeded`](https://github.com/testing-library/react-testing-library/blob/3dcd8a9649e25054c0e650d95fca2317b7008576/src/pure.js#L86) as `wrapperComponent`

```js
function wrapUiIfNeeded(innerElement, wrapperComponent) {
  return wrapperComponent
    ? React.createElement(wrapperComponent, null, innerElement)
    : innerElement
}
```
