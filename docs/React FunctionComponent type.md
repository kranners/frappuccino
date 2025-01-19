---
id: React FunctionComponent type
date: "15 January, 2025"
---

# React FunctionComponent type

`React.FC` or `React.FunctionComponent` is a generic utility type for defining a functional React component.

For example:
```tsx
type ShoppingCartProps = {
    items?: Item[];
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({
    items = [],
}) => {
    /* ... one must assume there's a component here ... */
}
```

## Probably don't use it

[This was removed as of Jan 2020 from the create-react-app template](https://github.com/facebook/create-react-app/pull/8177).

Instead it's recommended to use inline types on the props of the component:
```jsx
const ShoppingCart = ({
    items = [],
}: ShoppingCartProps) => {
    - [ ] /* ... one must assume there's a component here ... */
}
```
