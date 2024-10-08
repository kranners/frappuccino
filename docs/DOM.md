---
tags: dom, javascript, html, internet
---

# DOM

[The DOM (Document Object Model)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) is a tree of objects for accessing, managing, and adding [[HTML]] elements.

Generally, DOM methods are handled by the framework of your choice ([[React]], [[Vue]], [[Svelte]]) but in rare circumstances - or when dealing with vanilla [[JavaScript]], it may become necessary to deal with.

## Accessing DOM elements

There are a slew of methods for accessing or selecting DOM elements from the page.
Given a document that looks like:

```html
<body>
  <div id="container">
    <h1>My cool website</h1>

    <!-- Usually you want to avoid <div> for text elements. -->
    <!-- This is for demo purposes :) -->
    <div>This is epic 🚀</div>
  </div>
</body>
```

You might access this with:

```javascript
// Node | undefined
const container = document.getElementById("container");

// Node | undefined
const firstDiv = document.querySelector("div");

// Node[]
const allDivs = document.querySelectorAll("div");
```

For more info, check out the [MDN page on DOM element locating](https://developer.mozilla.org/en-US/docs/Web/API/Document_object_model/Locating_DOM_elements_using_selectors).

## Creating DOM elements

For making new elements, check out the [document.createElement()](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement) method.

```javascript
const newDiv = document.createElement("div");
newDiv.textContent = "OK gamers";
```

For appending them to something, see the [Node.appendChild()](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild).

Also check out the [document.createDocumentFragment()](https://developer.mozilla.org/en-US/docs/Web/API/Document/createDocumentFragment) for making a new [fragment](Web%20Terminology#Fragments).

```javascript
// This could also be = new DocumentFragment();
const fragment = document.createDocumentFragment();

const people = ["Steven", "John", "Abigail", "Mary"];
const updatedFragment = people.reduce((person) => {
  const li = document.createELement("li");
  li.textContent = person;
  fragment.append(li);

  return fragment;
}, fragment);
```

:::tip
the DOM will not let you modify it into an invalid state, [and will throw errors when you attempt to do so](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild#exceptions).
:::

```javascript
const body = document.querySelector("body");

const child = document.createElement("div");

body.appendChild(child);

// HierarchyRequestError!
child.appendChild(body);
```
