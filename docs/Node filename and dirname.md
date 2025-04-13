---
id: Node filename and dirname
date: "13 April, 2025"
---

# Node filename and dirname

For getting access to the current module's absolute filepath or directory:

For a given script, executing `node example.js`:
```example.js
console.log(__filename); // /Users/aaron/example.js
console.log(__dirname); // /Users/aaron
```

Using `__dirname` is equivalent to:
```path.js
import { dirname } from 'path';

// This is the same as __dirname:
console.log(dirname(__filename));
```

See [dirname documentation](https://nodejs.org/api/modules.html#__dirname)
See [filename documentation](https://nodejs.org/api/modules.html#__filename)
