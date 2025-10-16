---
id: RTL waitFor
date: "16 October, 2025"
---

# RTL waitFor

:::tip
**TLDR**

Whenever you `waitFor`, try to assert something that will never happen.

This way, you can test that your test actually works, before pushing to
production :)

```jsx
// The test needs to be async
it('flips', async () => {
  render(<CoinFlipper />);

  expect(screen.getByText('tails')).toBeVisible();

  shortlistButton.click();

  // waitFor needs to be awaited
  await waitFor(() => {
    expect(screen.getByText('heads')).toBeVisible();
  });
});
```
:::

See [Async Methods | Testing Library](https://testing-library.com/docs/dom-testing-library/api-async/)

## Context

Often when writing [[React]] tests, you'll want to test that a component is
reactive.

That is, that something about it changes when you do something to it.

The issue is that the change to a component can often take multiple render
cycles to happen.

Given a component like:
```jsx
export const CoinFlipper = () => {
    const [isHeads, setIsHeads] = useState(false);

    const flip = () => {
        setIsHeads(!isHeads);
    }

    return (
        <button onClick={flip}>{isHeads ? "heads" : "tails"}</button>
    );
}
```

A test like this:

```jsx
it('flips', async () => {
  render(<CoinFlipper />);

  expect(screen.getByText('tails')).toBeVisible();

  shortlistButton.click();

  expect(screen.getByText('heads')).toBeVisible();
});
```

Would fail.

This is because `<CoinFlipper />` has only been rendered once, and so hasn't
had a chance to re-render the new value in.

[In this case, you could `rerender()`.](https://testing-library.com/docs/react-testing-library/api/#rerender)

However, in most more advanced setups (fetching data, waiting for events to
fire), even your synchronous rerender will be too fast.

## Pitfalls

It can be very easy to make a `waitFor()` which always passes.

Look at `waitFor` with suspicion.

```jsx
it('flips', () => {
  /* ... */ 

  // This is not being awaited, so the test doesn't have a chance to fail
  waitFor(() => expect(screen.getByText('heads')).toBeVisible());
});
```

