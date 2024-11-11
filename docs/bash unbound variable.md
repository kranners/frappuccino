---
id: bash unbound variable
date: "11 November, 2024"
---

# bash unbound variable

Errors like this:
```
 "$NOTHING_HERE": unbound variable
```

Come up when bash is run with unset variables disallowed.

```shell
# Allow unset variables in a script
set -o unset

# Disallow unset variables in a script
set -o nounset

# Run a script with unset variables disallowed
bash -u /path/to/script
```

See [The Set Builtin (Bash Reference Manual)](https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html)

