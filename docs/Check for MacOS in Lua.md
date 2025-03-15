---
id: Check for MacOS in Lua
date: "15 March, 2025"
---

# Check for MacOS in Lua

To check for MacOS or other 'features', use the `has()` function.
To do so in Lua, use `vim.fn.has()` using the Vimscript bridge.

```lua
local is_darwin = vim.fn.has('macunix')
```

List of features from the docs:
```
List of supported pseudo-feature names:
acl		|ACL| support.
bsd		BSD system (not macOS, use "mac" for that).
clipboard	|clipboard| provider is available.
fname_case	Case in file names matters (for Darwin and MS-Windows
        this is not present).
gui_running	Nvim has a GUI.
iconv		Can use |iconv()| for conversion.
linux		Linux system.
mac		    MacOS system.
nvim		This is Nvim.
python3		Legacy Vim |python3| interface. |has-python|
pythonx		Legacy Vim |python_x| interface. |has-pythonx|
sun		    SunOS system.
ttyin		input is a terminal (tty).
ttyout		output is a terminal (tty).
unix		Unix system.
*vim_starting*	True during |startup|.
win32		Windows system (32 or 64 bit).
win64		Windows system (64 bit).
wsl		    WSL (Windows Subsystem for Linux) system.
```

See [Neovim docs for the Lua-Vimscript bridge](https://neovim.io/doc/user/lua.html#_lua-vimscript-bridge)
See [vimhelp for has()](https://vimhelp.org/builtin.txt.html#has%28%29)

