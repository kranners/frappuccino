---
id: padStart
date: "16 June, 2025"
---

# padStart

```js
const hour = "5";

console.log(hour.padStart(2, "0"));
// Expected output: "05"
```

Takes in a target length and the string to pad with.

```js
"abc".padStart(10);          // "       abc"
"abc".padStart(10, "foo");   // "foofoofabc"
"abc".padStart(6, "123465"); // "123abc"
"abc".padStart(8, "0");      // "00000abc"
"abc".padStart(1);           // "abc"
```

[See the MDN documentation on `padStart`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart)
