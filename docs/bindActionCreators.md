---
id: 1726020995-DSEV
aliases:
  - bindActionCreators
tags: []
---

# bindActionCreators

**NOTE**: _You almost certainly do not need this function anymore._

[Instead, check out the object shorthand of `mapDispatchToProps`.](https://react-redux.js.org/using-react-redux/connect-mapdispatch#defining-mapdispatchtoprops-as-an-object)

`bindActionCreators()` is a utility function which wraps actions in `dispatch()` so they may be called directly.

See [[1726021092-SORA|Redux dispatches]] for what an action creator or a dispatch are.

```js
import * as IncrementActionCreators from './IncrementActionCreators';

console.log(IncrementActionCreators);
// { increment: Function, decrement: Function }

const boundIncrementActionCreators = bindActionCreators(
    IncrementActionCreators,
    // One must assume we got dispatch from somewhere ¯\_(ツ)_/¯
    dispatch,
);

// This will just make an action, and not do anything
IncrementActionCreators.increment();

// This will make that same action, then dispatch it
boundIncrementActionCreators.increment();
```

[See the Redux documentation for more info](https://redux.js.org/api/bindactioncreators)

