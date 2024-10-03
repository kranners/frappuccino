---
id: React forceUpdate
aliases:
  - React forceUpdate
tags: []
---

# React forceUpdate

Use `forceUpdate(callback?)` to force a component to re-render. Optionally, call a callback after the update is done.

The one given usecase for this is for external data sources which don't hook into React's lifecycle.

[React notes that this usecase has been superseded by `useSyncExternalStore()`](https://react.dev/reference/react/useSyncExternalStore)

[See the legacy React docs on `forceUpdate` workaround](https://legacy.reactjs.org/docs/hooks-faq.html#is-there-something-like-forceupdate)
[See the React docs for more info on `forceUpdate()`](https://react.dev/reference/react/Component#forceupdate)

