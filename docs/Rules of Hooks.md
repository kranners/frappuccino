---
id: Rules of Hooks
aliases:
  - Rules of Hooks
tags: []
---

# Rules of Hooks

Hooks are not supported...:

- after a conditional return statement.
- inside conditions or loops.
- in event handlers.
- in class components.
- inside functions passed to useMemo, useReducer, or useEffect.
- inside try/catch/finally blocks.

[See the React documentation](https://react.dev/reference/rules/rules-of-hooks)
