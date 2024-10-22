---
id: Running commands in Neovim Lua
aliases:
  - Running commands in Neovim Lua
tags: []
---

# Running commands in Neovim Lua

You can just run a command, no output and it's blocking:

```lua
os.execute('echo hello')
```

Or there's the Neovim job system:

```lua
local job = vim.fn.jobstart(
    'echo hello',
    {
        cwd = '/path/to/working/dir',
        on_exit = some_function,
        on_stdout = some_other_function,
        on_stderr = some_third_function
    }
)
```

https://www.reddit.com/r/neovim/comments/y2by27/is_there_a_way_to_run_terminal_commands_with_lua/
