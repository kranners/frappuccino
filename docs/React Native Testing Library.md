---
id: React Native Testing Library
aliases:
  - React Native Testing Library
tags: []
---

# React Native Testing Library

React Native Testing Library (RNTL) is a library inspired by React Testing Library.

It is not developed by, or affiliated with React Testing Library 😖.

Historically, there were two libraries:
- [`@testing-library/react-native`](https://github.com/testing-library/native-testing-library)
- [`react-native-testing-library`](https://github.com/callstack/react-native-testing-library)

However, the former has been deprecated in favor of the latter.
This document concerns `react-native-testing-library`. Clarified!

### `render()`

`render()` takes in similar arguments and options to the RTL equivalent:
```tsx
const TestProviders = ({ children }) => {
    return ( 
        <StateProvider>
            <ThemeProvider>
                {children}
            </ThemeProvider>
        </StateProvider>
    );
}

it('can render', () => {
    render(<SomeAppComponent />, {
        wrapper: TestProviders,
    });

    expect(screen.getByText("Hi!")).toBeDefined();

    // Or maybe with jest-dom
    expect(screen.getByText("Hi!")).toBeVisible();
})
```

:::warning
[This function returns all of the same queries & utilities as using `screen` directly.](https://callstack.github.io/react-native-testing-library/docs/api/render#render-result)

[Use `screen` instead.](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library#not-using-screen)
:::
