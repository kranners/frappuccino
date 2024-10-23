---
id: Reselect createSelector
aliases:
  - Reselect createSelector
tags: []
---

# Reselect createSelector

Helper for grabbing data from a Redux store.

Takes in two arguments, the first is an array of 'input selectors' (functions which take in RootState).
The second is a 'result function', which takes the result of the input selectors as its arguments, and returns the final value.

```typescript
const getFavoriteFruitPrice = createSelector(
    [
        (state: RootState) => state.user.favorites.fruit,
        (state: RootState) => state.shelf.prices,
    ],
    (prices: Record<Fruit, number>, favorite: Fruit) => {
        return prices[favorite];
    }
);
```

[See Selectors Redux documentation for more general info on selectors](https://redux.js.org/usage/deriving-data-selectors)

[See Reselect createSelector documentation](https://reselect.js.org/api/createselector/)

