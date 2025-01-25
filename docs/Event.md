---
id: Event
date: "30 December, 2024"
---

# Event

An [Event](https://developer.mozilla.org/en-US/docs/Web/API/Event) is a signal fired by the browser whenever something happens.

Events are fired within the context of a single browser window, and must take place "attached" to an [EventTarget](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget).

A system can respond to events through event handlers using `addEventListener()`.

:::info
_Event handler_ and _event listener_ are interchangable terms.

But, if you want to be a real stickler, then an _event listener_ is just the bit which listens for the event.
The _event handler_ is the callback.

```js
const button = document.querySelector("button");

/* ... suppose this part is the listener ... */
button.addEventListener("click", () => {
    /* ... this part is the handler ... */
});
```
:::

All events have shared properties like `Event.type` or `Event.timeStamp`.

### Builtin events

There are a number of builtin events for responding to common browser happenings, like mouse clicks or key presses.

All mouse related events use [`MouseEvent`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent).

See [Event reference](https://developer.mozilla.org/en-US/docs/Web/Events)

#### Keyboard events

All keyboard related events use [`KeyboardEvent`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).

To get the key from a KeyboardEvent, [use the `.key` property.](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key)

See [Key values for keyboard events - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values)

See [Key.js for keycodes relating to keyboard events](https://keyjs.dev/)

### Custom events

Custom events can be made using the regular base [`Event` class constructor](https://developer.mozilla.org/en-US/docs/Web/API/Event/Event) for anything which doesn't require custom data dispatched alongside the event.

```js
const wave = new Event("wave", { /* custom non-data options here */ });

// hi!
document.dispatchEvent(wave);
```

For any events which _do_ need custom data, use the [`CustomEvent` class constructor](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent).

```js
const greeting = new CustomEvent("wave", { detail: { from: "Jim" }});

document.addEventListener("wave", ({ detail: { from }}) => {
    console.log(`Waving back to ${from}!`);
});

// Waving back to Jim!
document.dispatchEvent(greeting);
```

See [Creating and triggering events](https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events#adding_custom_data_%E2%80%93_customevent)

### Event bubbling

Events by default will "bubble" up to their respective parent elements in the DOM.

Bubbling up here just means that the event can be caught by parent elements.

For a DOM like:
```html
<body>
  <div id="container">
    <button id="increment">Increment</button>
  </div>
</body>
```

Then dispatching a `click` event to the button would cause the same event to be caught on the container and in the body.

As in:
```js
const handleClick = () => console.log("hee hee you clicked mee mee");

document.body.addEventListener("click", handleClick);
document.querySelector("#container").addEventListener("click", handleClick);
document.querySelector("#increment").addEventListener("click", handleClick);
```

If the button was clicked, the message would be logged three times.

To prevent or alter this behaviour, you can:
- [`stopPropagation()`, call all other event handlers on this level and then stop](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation)
- [`stopImmediatePropagation()`, fire this on no other event handlers](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopImmediatePropagation)

See [Event bubbling](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling).

See [DOM events to explore bubbling behaviour](https://domevents.dev/)
