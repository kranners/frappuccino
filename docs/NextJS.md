---
tags:
  - web
  - development
  - javascript
  - typescript
  - react
---

# NextJS

[Next](https://nextjs.org/) is a [[React]] framework for building and deploying [SSR](Web%20Terminology#SSR) applications.

## Setup

Next provides their own [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app) CLI tool.
```shell
# Interactive setup of a new Next app
yarn create next-app
```

## Configuration

### robots.txt

Adding a [[robots.txt]] to your Next app is just, adding it to the root of your `app` directory.

```
package.json
next-env.d.ts
src/
--> app/
    --> robots.txt
```