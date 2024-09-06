---
id: 1725585130-UJOJ
aliases:
  - Splitting and joining strings in Lua
tags: []
---

# Splitting and joining strings in Lua

Joining strings from a table is done with `table.concat`
```lua
-- "a,b,c"
table.concat({"a", "b", "c"}, ",")
```

Splitting strings is done using `string.gmatch`, it's a bit different than usual, it:
- Returns an iterator, rather than a table
- Takes in a pattern of all the characters that are NOT the delimiter

Split on whitespace:
```lua
local example = "an example string"

-- an
-- example
-- string
for i in string.gmatch(example, "%S+") do
   print(i)
end
```

[From lua-users.org](http://lua-users.org/wiki/SplitJoin)

