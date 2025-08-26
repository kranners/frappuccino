---
id: Parse query parameters in JS
date: "02 August, 2025"
---

# Parse query parameters in JS

[Use `URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams).

This is available both in browser, and in Node.

When cast to a string, `URLSearchParams` will automatically URL encode the
params.

If empty, casting to a string will result in an empty string.

To construct and then use URLSearchParams in a `fetch()`:
```javascript
const params = new URLSearchParams({
  date_updated_gt: "2025-07-29T00:00:00.000Z",
  date_updated_lt: "2025-07-29T17:00:00.000Z",
});

const empty = new URLSearchParams({});

// ""
empty.toString();

// "date_updated_gt=2025-07-29T00%3A00%3A00.000Z&date_updated_lt=2025-07-29T17%3A00%3A00.000Z"
params.toString();

fetch(`${baseUrl}?${params}`);
```
