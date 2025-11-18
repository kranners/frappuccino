---
id: Astro islands
date: "07 November, 2025"
---

# Astro islands

An Island in Astro is a portion of the webpage which is made functional.

This is a technique called "partial [hydration](Web%20Terminology#Hydration)",
and allows portions of the page which don't need any functionality to remain
purely static.

See [Front-end frameworks | Docs](https://docs.astro.build/en/guides/framework-components/#using-framework-components)

## Setting up islands for a project

To add an island, you'll need to pick one of the [[Astro custom integrations]].

For example, to add React:
```shell
npx astro add react
```

See [@astrojs/react | Docs](https://docs.astro.build/en/guides/integrations-guide/react/).

To add a React component into an Astro project, make a component file as usual:
counter/index.tsx_
```tsx
export const Counter = () => {
    const [count, setCount] = useState(0);

    return (
        <>
            <div>{count}</div>
            <button onClick={() => setCount(count + 1)}>+1</button>
        </>
    );
}
```


And then import into your Astro source like:
_index.astro_
```astro
---
import { Counter } from "./counter";
---

<!-- hydrate straight away -->
<Counter client:load />

<!-- hydrate when visible -->
<Counter client:visible />
```
