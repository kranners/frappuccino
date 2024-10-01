---
id: Lua generic for (iterating in Lua)
aliases:
  - Lua generic for (iterating in Lua)
tags: []
---

# Lua generic for (iterating in Lua)

Use the `for` keyword to traverse values made by iterator functions.

```lua
local fruits = { "apple", "banana" }

-- "1 apple"
-- "2 banana"
for index, value in ipairs(fruits) do
    print(index .. " " .. value)
end
```

[See the Lua documentation on generic for](https://www.lua.org/pil/4.3.5.html)
[See the Lua documentation on iterators and closures](https://www.lua.org/pil/7.1.html)

