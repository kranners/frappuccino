---
tags: graphql, fragments, query
---

Fragments are repeatable portions of [[GraphQL Query]]s, for multiple queries that may use the same repeated syntax.

In GraphQL, fragments are defined with `fragment`.

Example:
```gql
fragment userProfile on User {
	name
	age
	avatar
}
```

And can later be reused with the spread operator `...`
Example:
```gql
query GetAdminProfile {
	rootUser {
		 ...userProfile
	}
}
```

