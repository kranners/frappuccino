---
tags: apollo, cache, client, graphql
---

### Cache

Apollo Client stores [[GraphQL]] queries in a local, in-memory cache.

This can be viewed using their [Apollo Client Devtools](https://www.apollographql.com/docs/react/development-testing/developer-tooling/#apollo-client-devtools).

You can manually store [[GraphQL Fragments]] directly into the cache by using [`readFragment`](https://www.apollographql.com/docs/react/caching/cache-interaction/#readfragment) and [`writeFragment`](https://www.apollographql.com/docs/react/caching/cache-interaction/#writefragment) functions.

### Mutations

Mutations are executed using the `useMutation` [[React]] hook.
Call that hook inside a [React component](React#Components) and pass it a [[GraphQL]] mutation to execute.

Example:
```ts
const RENAME_USER = gql`
	mutation IncrementCounter {
		value
	}
`;

export default function Counter() {
	const [mutateCount, { data, error, loading }] = useMutation(RENAME_USER);
}
```
