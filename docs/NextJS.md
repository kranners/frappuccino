---
tags:
  - web
  - development
  - javascript
  - typescript
  - react
---

# NextJS

[Next](https://nextjs.org/) is a [[React]] framework for building and deploying [SSR](Web%20Terminology#SSR) applications (can also be configured to run normal client-side React).

**NOTE:** By default Next uses SSR. This means some packages which rely on React hooks will fail, with something that looks like this:
```
 ⨯ TypeError: (0 , react__WEBPACK_IMPORTED_MODULE_0__.createContext) is not a function
```
To fix these up, you can configure Next to run as a client-side SPA, or you can 

## Setup

Next provides their own [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app) CLI tool.
```shell
# Interactive setup of a new Next app
yarn create next-app
```

## Usage

### Client-side rendering



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