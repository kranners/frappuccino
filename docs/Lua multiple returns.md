---
id: 1725599721-KUUD
aliases:
  - Lua multiple returns
tags: []
---

# Lua multiple returns

Lua supports multiple returns per function, like Golang!

It also supports multiple assignments from multiple returns. Like Golang.

```lua
function get_stuff()
    return "apple", "banana"
end

-- "apple", "banana"
local a, b = get_stuff()
```

[See the Lua documentation for more](https://www.lua.org/pil/5.1.html)

