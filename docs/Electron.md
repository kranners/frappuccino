---
id: Electron
date: "07 July, 2025"
---

# Electron

Electron is a desktop application framework using web technologies and Node.

It embeds both a Chromium webview and a [[Node]] instance into the binaries it
produces.

## Installation

### Manual

Do this one if you want to understand and configure everything yourself.

Get started either by installing Electron into a new [[Node]] project like:
```bash
npm install -D electron
```

Follow the [[New Node project quickstart guide]] to get started on that front.

With electron installed, a basic project would look like:
```index.js
const { app, BrowserWindow } = require("electron");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();
});
```

And an _index.html_ file like:
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Desktop App</title>

  <style>
    .container {
      width: 100%;
      height: 100%;

      display: flex;
      justify-content: center;
      align-items: center;
    }
  </style>
</head>

<body>
  <div class="container">
    <h1>
      Hello Electron!
    </h1>
  </div>
</body>
</html>
```

This is roughly what you'll be targetting with [[TypeScript]].

### Electron Forge

This is the official all-in-one toolset. It is maintained by Electron. It is
however, less mature than electron-builder.

Use their [[Node]] initialisation CLI tool:
```bash
npx create-electron-app@latest my-app
```

Electron recommend using one of their templates when initialising:
```bash
# One of these
npx create-electron-app@latest my-app --template=webpack
npx create-electron-app@latest my-app --template=webpack-typescript
npx create-electron-app@latest my-app --template=vite
npx create-electron-app@latest my-app --template=vite-typescript
```

### electron-builder

OR you can use [Electron Builder](https://www.electron.build/#installation)

Which has a more mature ecosystem.

[I didn't get far looking into this one as they require that you use Yarn.](https://github.com/electron-userland/electron-builder/issues/1147#issuecomment-276284477)

### Vite

OR, get this, there are even more ways to initialise an Electron app.

Initialise using the Vite Electron TS template by:
1. `npm create vite`
2. Select _Other_ for the framework.
3. Select _Electron_.
4. Select the frontend framework of choice. I chose React.

