---
id: Writing a Neovim plugin
date: "04 September, 2025"
---

# Writing a Neovim plugin

See [Lua-plugin - Neovim docs](https://neovim.io/doc/user/lua-plugin.html)
See [Usr_05 - Neovim docs](https://neovim.io/doc/user/usr_05.html#_adding-a-plugin)

## How plugins are loaded

Any Lua or Vimscript file placed under `$VIMRUNTIME/plugin` will be executed when [[Neovim]] launches.

For example, given a file:
```lua
vim.print('Hey there bucko')
```

And placed under `~/.local/share/nvim/site/plugin/bucko.lua`, the message _"Hey
there bucko"_ will be displayed on launch.

## Splitting plugins into modules

The `plugin/` Lua file is eagerly executed at start.

So, if your plugin does anything non-trivial, it's recommended to split it out
into modules and defer `require` calls to them.

Your modules will go into a `lua/` folder.

So, `require('foo')` would go to a `lua/foo.lua` or `lua/foo/init.lua`.

This just means, instead of having `require` calls at the top of your `plugin/`
file, to move them to where the respective modules are used.

Yoinked from the Neovim docs, instead of:
```lua
local foo = require('foo')
vim.api.nvim_create_user_command('MyCommand', function()
    foo.do_something()
end, {
  -- ...
})
```

Do:
```lua
vim.api.nvim_create_user_command('MyCommand', function()
    local foo = require('foo')
    foo.do_something()
end, {
  -- ...
})
```

See [Programming in Lua : 8.1](https://www.lua.org/pil/8.1.html)

## The `setup()` function

:::tip
**TLDR**:
- Any initialization logic (setting up keymaps, etc) should use deferred
  `require` calls and use a default configuration
- Any specific overrides to your config should go into a `setup` function.
:::

The `setup()` function is a common pattern (antipattern?) for running
initialization logic or setting config options.

On the setup function, the documentation reads:
> If you do this, users will be forced to call this function in order to use
> your plugin, even if they are happy with the default configuration. Strictly
> separated configuration and smart initialization allow your plugin to work
> out of the box.

Many plugin managers, like lazy.nvim expect this `setup()` function as it is
such a common convention.

For example, a lazy plugin spec for a plugin with a `setup()` function looks
like:
```lua
return {
    "kranners/cool-plugin.nvim",
    opts = {
        foo = "bar",
    },
}
```

In this case, `opts` is effectively shorthand for:
```lua
require("cool-plugin").setup(opts)
```

See [Initialization - Neovim docs](https://neovim.io/doc/user/lua-plugin.html#lua-plugin-init)

## Packspec

As of writing, there is no standard package spec file format for a Neovim
plugin. Don't worry about it.

[There is an open issue about this now.](https://github.com/neovim/packspec/issues/41)

### Loading a local plugin in Lazy

A plugin spec which loads from a local path looks like:
```lua
return {
    "[plugin_name]",
    name = "[plugin_name]",
    dir = "/path/to/plugin/folder",
    dev = {
        path = "~/projects",
        ---@type string[] plugins that match these patterns will use your local versions instead of being fetched from GitHub
        patterns = {}, -- For example {"folke"}
        fallback = false, -- Fallback to git when local plugin doesn't exist
    },
}
```

For example:
```lua
return {
  "kranners/ts-refactor.nvim",
  name = "ts-refactor",
  dir = "/Users/aaronpierce/workspace/ts-refactor.nvim",
  dev = {
    fallback = false,
  },
}
```

