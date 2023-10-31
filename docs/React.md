---
tags:
  - react
  - javascript
  - typescript
  - web
---

# React

[React](https://react.dev/) is a widespread web / native framework made by Facebook.

*For more info, check out [React's API reference](https://react.dev/reference/react).*

```shell
# Start a new React app
yarn create react-app
```

## Hooks

### `useContext()`

[The `useContext()` hook](https://react.dev/reference/react/useContext) is used by components to [subscribe to a context](https://react.dev/learn/passing-data-deeply-with-context).
*Contexts are pieces of state available to all children underneath a provider.*

The main use case of this is generally [to avoid "prop drilling"](https://react.dev/learn/passing-data-deeply-with-context#the-problem-with-passing-props). This is where the component managing state and a component accessing it are so far from each other that props need to be passed through many intermediate layers.

*A minimal sample usage of contexts:*
```tsx
// First you need to define some contexts.
// (Some linters may complain about this empty function in SetCountContext)
const CountContext = createContext<number>(0);
const SetCountContext = createContext<(value: number) => void>(() => {});

// You could provide this context from your main app, or somewhere more
// deeply nested, which might make more sense.
function App() {
	const [count, setCount] = useState<number>(0);

	// Then you need to provide some value to the contexts, and provide them.
	// Usually the value here will be a useState().
	return (
		<CountContext.Provider value={count}>
			<SetCountContext.Provider value={setCount}>
				{/* Imagine a very deep nested, super complicated app. */}
				<CounterControls />
			</SetCountContext.Provider>
		</CountContext.Provider>
	);
}

// Then you can use the context in your deeply nested components.
function CounterControls() {
	const count = useContext(CountContext);
	const setCount = useContext(SetCountContext);

	const incrementCount = () => setCount(count + 1);

	return <div onClick={incrementCount}>{count}</div>
}
```

For more customising, you can wrap contexts in your [own custom hooks](#Custom%20hooks):
```tsx
function useCount() {
	return [useContext(CountContext), useContext(SetCountContext)];
}

function CounterControls() {
	const [count, setCount] = useCount();

	/* ... */
}
```

### Custom hooks

[*See React's page on custom hooks*](https://react.dev/learn/reusing-logic-with-custom-hooks)

### Troubleshooting

#### `Rendered more hooks than during the previous render`

This error says that multiple renders of the same component had different hooks.

It'll pretty much only come up in instances where you do conditional rendering on a component.

*Bad, this will throw the error*
```jsx
export function Counter({ shouldRender }) {
	const [count, setCount] = useState(0);
	const countRef = useRef(null);

	const incrementCount = () => setCount(count + 1);

	if (!shouldRender) {
		return <></>;
	}

	// This hook might not be rendered! That's the issue.
	useEffect(() => {
		countRef.current?.addEventListener('keydown', incrementCount);

		return () => {
			countRef.current?.removeEventListener('keydown', incrementCount);
		}
	}, [countRef]);

	return <div ref={countRef}>{count}</div>;
}
```

**The fix is** to ensure all hooks come before any rendering logic in your components.
So in this case, you'd just move the `useEffect()` hook up above the conditional render.