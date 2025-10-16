---
id: Web Storage API
date: "15 October, 2025"
---

# Web Storage API

`localStorage` and `sessionStorage` are properties on `window` which are
populated on supporting browsers. At this point every browser is a supporting
browser.

Use like:
```ts
localStorage.setItem("petName", "Jerome");

localStorage.getItem("petName"); // "Jerome"

localStorage.removeItem("petName");

// Clears everything
localStorage.clear();
```

Commonly people will store entire objects in storage, to do this you'll need to
serialize and unserialize the data:
```ts
const STORAGE_KEY = "fruit";

const FRUIT = {
    name: "apple",
    price: 2.5,
    weight: 0.2,
};

localStorage.setItem(STORAGE_KEY, JSON.stringify(FRUIT));

const fruit = JSON.parse(localStorage.getItem(STORAGE_KEY));

/* ... */
```

You could combine this with [[zod]] schemas to validate the data.

See [localStorage property](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

See [Using the Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API)

## Usage in Node

In a [[Node]] environment, you don't have access to `window` or the globals
stored on it.

Added as of Node 12, there is a `globalThis` property which you can use to
access the global properties in a portable way across environments.

## `localStorage` vs `sessionStorage`

`sessionStorage` is similar to `localStorage` except that while `localStorage`
is "partitioned" by the page origin, `sessionStorage` is also partitioned along
the browser tab.

This means that `localStorage` will persist between browser tabs and browser
restarts.

`sessionStorage` will still last over page reloads and page restores within the
same tab. But not within new browser sessions or new tabs.

See [sessionStorage property](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)

## Reacting to storage changes

If you're using [[React]], then you'll want to be able to update a state or
force rerenders whenever `localStorage` or `sessionStorage` changes.

Otherwise, your components will sit there doing nothing.

To do this, [you can use the builtin `storage` event.](https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event)

The `storage` event contains a `key` which you can use to determine whether the
thing that changed you care about or not.

See [storage event](https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event)

