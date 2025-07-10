---
id: Electron IPC
date: "10 July, 2025"
---

# Electron IPC

Electron uses an internal IPC to communicate between its embedded Node and
Chromium processes.

Electron likes to call the Node process "main" and the Chromium process
"renderer". So this note will go with that.

### Renderer to main (2-way)

On the Electron index:

_index.ts_
```typescript
app.whenReady().then(() => {
  ipcMain.on("ping", (_event, count: number) => {
    return count; // We can return a value from here
  });

  createWindow();
});
```

In preload:

_preload.ts_
```typescript
import { contextBridge, ipcRenderer } from "electron/renderer";

contextBridge.exposeInMainWorld("electronAPI", {
  ping: (count: number) => {
    // Here we return the result of ipcRenderer.send()
    return ipcRenderer.send("ping", count); 
  },
});
```

In your renderer:

_App.tsx_
```tsx
const App = () => {
  const [count, setCount] = useState(0);

  const sendPing = () => {
    // You'll need to declare electronAPI somehow.
    const pong = window.electronAPI.ping(count);

    /* one must imagine we do something with the value */
  };

  return (
    <>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={sendPing}>ping</button>
    </>
  );
};
```

