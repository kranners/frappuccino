---
id: Testing Library fireEvent vs userEvent
date: "22 November, 2024"
---

# Testing Library fireEvent vs userEvent

TLDR: **Use `userEvent` for representing user input. Use `fireEvent` for special circumstances involving events.**

[See the Testing Library docs on user-event](https://testing-library.com/docs/user-event/intro/#differences-from-fireevent)

### fireEvent

`fireEvent` came first, and uses [the regular generic `dispatchEvent()` API](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent) to fire an event on an element in the DOM. And only that event.

So to click a button in Testing Library:
```jsx
const submitButton = screen.getByRole("button", { name: "Submit" });

// Click that thang!
fireEvent.click(submitButton);
```

### Why userEvent?

When a real user does something in their browser (say, clicking a button), they're not just firing a single `click`.

They're doing all kinds of stuff, a `mouseOver`, a `focus`, a `blur` on a parent element, etc.

`userEvent` attempts to mimic this behaviour, instead of just firing a single event.

See [kentcdodds call regarding userEvent vs fireEvent](https://kentcdodds.com/calls/01/81/using-user-event-vs-fire-event).
