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