---
id: Getting the tmp directory Node
date: "09 August, 2025"
---

# Getting the tmp directory Node

This can be done with the `os` module, using `os.tmpdir()`.

Example:

```js
const os = require('os');
const path = require('path');

const filePath = path.join(os.tmpdir(), "hello.txt"); // /tmp/hello.txt
```

