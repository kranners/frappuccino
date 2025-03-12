---
id: Window matchMedia
date: "07 March, 2025"
---

# Window matchMedia

[`matchMedia()` is a function on the `window` interface which is used for determining if a page matches a given media query.](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia)

It also allows you to make an [[Event]] handler for when the match state changes.

`matchMedia()` takes in a media query surrounded by parenthesis as a string, and returns a [MediaQueryList.](https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList)

```js
const mediaQueryList = window.matchMedia("(orientation: portrait)");
```

That MediaQueryList [has a `matches` boolean property for if the page matches the media query at the time of the function call.](https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList/matches)

```js
const mediaQueryList = window.matchMedia("(orientation: portrait)");

const isPortrait = mediaQueryList.matches;
```

It also has a writable `onchange` method, [which is an event handler for a `MediaQueryListEvent`.](https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryListEvent)

```js
const mediaQueryList = window.matchMedia("(orientation: portrait)");

mediaQueryList.onchange = (e) => {
    console.log("Currently portrait: ", e.matches);
}
```

Although, you should probably add these as an event handler on the MediaQueryList itself:
```js
const mediaQueryList = window.matchMedia("(orientation: portrait)");

const onMediaChange = (e) => {
    console.log("Currently portrait: ", e.matches);
}

mediaQueryList.addEventListener("change", onMediaChange);

// When you're done with it, remove the event listener
mediaQueryList.removeEventListener("change", onMediaChange);
```

See [Window: matchMedia() method - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia)
See [MediaQueryList - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList)
See [MediaQueryList: change event - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList/change_event)

### Polyfilling

`matchMedia` is not implemented in JSDOM as of writing.

So, you need to polyfill it for any media queries to work in [[Jest]].

This is particularly useful for MaterialUI, which uses lots of media queries.

```js
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    // This is a mock implementation, so you can make the matches
    // field here actually work, or just be static. Up to you!
    matches: true,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
```
See [Media queries in React for responsive design - Material UI](https://mui.com/material-ui/react-use-media-query/#testing)
See [Manual Mocks · Jest](https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom)

