---
id: Lua system calls
date: "24 November, 2024"
---

# Lua system calls

See [Lua Other system calls](https://www.lua.org/pil/22.2.html)

### `os.getenv()`

Takes in the name of an environment variable and returns the string of its value:
```lua
os.getenv("HOME") -> /home/me
```

### `os.execute()`

Runs a system command, takes in a string of the command and returns its error code.

```lua
function move_file_to_home(filepath)
    local mv_command = string.format("mv %s %s", filepath, os.getenv("HOME"))
    os.execute(mv_command)
end
```
