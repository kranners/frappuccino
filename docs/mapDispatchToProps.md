---
id: 1725602180-QDOK
aliases:
  - mapDispatchToProps
tags: []
---

# mapDispatchToProps

This function determines what dispatches your component has access to, and how it will call them.

The second argument passed into the `connect()` function for a given component.

See [[1726021092-SORA|Redux dispatches]]

### Doing nothing

When this function is not provided to `connect()`, the component will just receive `store.dispatch()` directly.

```jsx
function IncrementButton = ({ dispatch }) => {
    return (
        <button onClick={() => dispatch({ type = 'INCREMENT' })}>
            CLICK ME 🤑
        </button>
    );
}

// This will pass dispatch through to IncrementButton
connect(mapStateToProps, /* no second argument */)(IncrementButton);
```

### Function form

**NOTE:** This is no longer the recommended way to pass this argument. [See object form below.](#Object%20form).

The most flexible way to map your dispatches is with the function form of this argument.

The function should return an object which will be injected into the component being `connect()`ed.

The keys of the object are the names of props being passed in, and the values are functions which wrap actions or action creators in `dispatch()` to be called directly.

[_From the Redux documentation_](https://react-redux.js.org/using-react-redux/connect-mapdispatch#return)
```js
const increment = () => ({ type: 'INCREMENT' })
const decrement = () => ({ type: 'DECREMENT' })
const reset = () => ({ type: 'RESET' })

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching actions returned by action creators
    increment: () => dispatch(increment()),
    decrement: () => dispatch(decrement()),
    reset: () => dispatch(reset()),
  }
}
```

This could be shortened using [[1726020995-DSEV|bindActionCreators]]:
```js
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ increment, decrement, reset }, dispatch);
}
```

These two code blocks do the same thing.

### Object form

Since this behaviour is so common, there's a shorthand for it.

From the same code block example above ☝️
```js
// This also does the same thing! Under the hood 8)
const mapDispatchToProps = {
    increment, decrement, reset
};
```

See [[1725599028-DEWZ|mapStateToProps Redux]].

