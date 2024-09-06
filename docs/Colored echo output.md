---
id: 1725627583-MTLT
aliases:
  - Colored echo output
tags: []
---

# Colored echo output

Use the [ANSI escape sequences](https://en.wikipedia.org/wiki/ANSI_escape_code).

```
Black        0;30     Dark Gray     1;30
Red          0;31     Light Red     1;31
Green        0;32     Light Green   1;32
Brown/Orange 0;33     Yellow        1;33
Blue         0;34     Light Blue    1;34
Purple       0;35     Light Purple  1;35
Cyan         0;36     Light Cyan    1;36
Light Gray   0;37     White         1;37
```

### Example
```
RED='\033[0;31m'
NC='\033[0m' # No Color

# Be sure to use the echo command with the -e flag
echo -e "${RED}tomato${NC} <-- damn"
```

[Ripped direct from the top search result.](https://stackoverflow.com/questions/5947742/how-to-change-the-output-color-of-echo-in-linux)

