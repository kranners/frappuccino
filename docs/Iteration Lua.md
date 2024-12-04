---
id: Iteration Lua
date: "24 November, 2024"
---

# Iteration Lua

:::info
**TLDR** To just iterate over a table of elements:

```lua
local fruits = { "apple", "banana", "pear" }

for index, fruit in ipairs(fruits) do
    print(index, fruit)
end
```
:::

Iteration in Lua is done [by Iterators and Closures](https://www.lua.org/pil/7.1.html).

Common [builtin iterators (like pairs & ipairs) are Stateless](https://www.lua.org/pil/7.3.html)
