---
id: Array slice
date: "19 March, 2025"
---

# Array slice

`slice()` is used to create a shallow-copied subset of an Array. (See [[Arrays]]).

Slice takes in the inclusive (up to and including) start index and the
exclusive (up to) end index, and returns a shallow copy of the array with all
elements outside of the range omitted.

```js
const fruitsAndNuts = ["Banana", "Apple", "Mango", "Macadamia", "Almond", "Chestnut"];

// Here 0 is the first index, and 2(+1 = 3) is the last index
const fruits = fruitsAndNuts.slice(0, 3); // ["Banana", "Apple", "Mango"] 

// Using a negative index will count backwards
const nuts = fruitsAndNuts.slice(-3); // ["Macadamia", "Almond", "Chestnut"]

// Using an index AND a negative index will count from the starting index to the distance from the end
// Here, Mango is the 2-index item, and Macadamia is the -2-index end
const expensive = fruitsAndNuts.slice(2, -2); // ["Mango", "Macadamia"]
```

See [Array.prototype.slice() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)

