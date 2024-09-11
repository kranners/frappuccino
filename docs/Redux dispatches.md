---
id: 1726021092-SORA
aliases:
  - Redux dispatches
tags: []
---

# Redux dispatches

The Redux store has a method `store.dispatch()`, which takes in an action and applies an immutable change to the store state.

This is the only way in Redux to change the store state.

Actions typically come from action creators, and are objects with a property of `type`.
That `type` is a unique identifier for that action.

`type` is typically a `SCREAMING_SNAKE_CASE` string.

### Example

```tsx
import * as IncrementActionCreators from './IncrementActionCreators';

console.log(IncrementActionCreators);
// { increment: Function, decrement: Function }

function Counter({ dispatch }) {
    const handleIncrement = () => {
        // On its own, this action won't do anything. 😔
        const action = IncrementActionCreators.increment();

        // But, we can dispatch it. Now it does stuff! 🎉
        dispatch(action);
    }

    return (
        <button onClick={handleIncrement}>+</button>
    )
}
```

[See Redux dispatch documentation for more info.](https://redux.js.org/tutorials/essentials/part-1-overview-concepts#dispatch)

