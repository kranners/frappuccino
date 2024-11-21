---
id: At symbol bash
date: "19 November, 2024"
---

# At symbol bash

`@` is considered a special variable in bash for expansion.
`$@` expands to all the positional arguments, starting from one.

### Example

That is, for a given command:
```
./shop.sh apple banana
```

The arguments are:
- `$0`, `"./shop.sh"`
- `$1`, `"apple"`
- `$2`, `"banana"`

And `$@` would expand to `"apple banana"`.

See [Special Parameters - Bash Reference Manual](https://www.gnu.org/software/bash/manual/bash.html#index-_0040)

