---
id: ThreeJS
date: "03 December, 2024"
---

# ThreeJS

[three.js is a 3D library for JavaScript](https://threejs.org/) using WebGL

## Fundamentals

The Renderer is the main object, it takes in a Scene and a Camera object.
A Camera defines information about the camera. duh.

A Scene defines the root of the 'scenegraph', and also base properties like background color and fog.

A 'scenegraph' is a tree structure of various objects which are tied to eachother in a parent/child relationship.
For example, you might have objects of wheels which are children of a car parent.
Those wheels would follow, and be tied to, the car.

See [Fundamentals - three.js manual](https://threejs.org/manual/#en/fundamentals)

## Getting started

You could do this in all kinds of ways, since ThreeJS is a Node package.

I'll be setting it up with Vite as the server.

```shell
# Install ThreeJS
npm install three

# Install Vite
npm install -D vite
```

Set up an index.html which loads a script as a module:
```html
<body>
  <script type="module" src="./main.js"></script>
</body>
```

Set up a `public/` folder to contain assets.

In your main.js (loaded by index.html), create and append a renderer:
```js
import * as THREE from 'three';

// Create and append the renderer to the body
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
```

Run `npm start` and see a blank image.
Inspecting the DOM at this point should show something like:
```html
<body>
    <script type="module" src="./main.js"></script>
    <canvas
        data-engine="three.js r171"
        width="1244"
        height="854"
        style="display: block; width: 1244px; height: 854px;"
    ></canvas>
</body>
```

At this point, ThreeJS will be set up. But not rendering anything!

To render something, use `renderer.setAnimationLoop()`, passing in a `() => void` function for what to do on each render cycle.

Generally this will just be `renderer.render(scene, camera)` with a Scene and Camera object referenced earlier.
