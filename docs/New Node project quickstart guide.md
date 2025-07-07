---
id: New Node project quickstart guide
date: "09 March, 2025"
---

# New Node project quickstart guide

Setting up a Node project with TS building and basically nothing else.
Each header is a step.

### Make your directory

```shell
mkdir my-project
cd my-project
```

### Initialise for git

```shell
git init
```

Optionally, create a new one or grab an existing .gitignore file from [Github](https://github.com/github/gitignore)
```shell
wget https://raw.githubusercontent.com/github/gitignore/refs/heads/main/Node.gitignore -O .gitignore
```

### Set up a Nix shell, maybe one from [[Nix Dev Template]]
```shell
# To accept a bunch of defaults, use:
nix flake init --template "https://flakehub.com/f/the-nix-way/dev-templates/*#node"

# To use something more barebones, use:
nix flake init --template github:nix-community/nix-direnv
```

From here, it's worth having a look through the `.envrc` and `flake.nix` files to ensure you have all the
dev tooling you need.

Like maybe, add the `nodejs` [[Nix]] package. Add it to the `packages` array like `pkgs.nodejs`
Check the [[Node release schedule]] to know which [[Node]] version to use. Generally latest LTS.

Also, probably add `.direnv` to your `.gitignore`:
```
echo .direnv >> .gitignore
```

At this point, I like to make a commit.

### Set up the npm repository

This is a pretty simple just `npm init` or `npm innit` for the British.

Chuck a `--yes` on the end to skip all the questions and just generate the package.json.
Like:
```shell
# British version 🫖 (this is a valid alias)
npm innit --yes
```

### Install & initialise TypeScript

```shell
npm install -D typescript

npx tsc --init
```

I like to remove all the comments and empty lines from the templated tsconfig, to keep it minimal.
```shell
# These are for MacOS sed.
# If you're on Linux, omit the ''.

# Remove all the comments
sed -i '' 's:/.*$::g' tsconfig.json 

# Remove all the empty lines
sed -i '' '/^\s*$/d' tsconfig.json 

# Remove all the trailing whitespace
sed -i '' 's:\s*$::' tsconfig.json  
```

### Optionally - Pick a license

See [[Software Licensing]] for what to pick here.
Realistically - this doesn't really matter. But I reckon it's worth it.

I like the GPLv3 license, paste the contents into either a LICENSE, LICENSE.md, or COPYING file.

Update the `license` key in the package.json to the same.

### Update the TSConfig, add relevant types

Update the TSConfig to output however you like.
You'll probably want one of `outDir` or `outFile`.

Emission here is what you're looking for.
See [[TypeScript]] for more info.

For types, you'll need to install their corresponding [[DefinitelyTyped]] package, and add
them to the TSConfig under `compilerOptions.types`.

eg. For Node types:
```shell
npm install -D @types/node
```

And in your tsconfig.json:
```json
{
    "compilerOptions": {
        "types": [
            "node"
        ]
    }
}
```

### Testing, linting, formatting

If you're looking for a Production Grade™ codebase, you'll want testing, linting and formatting.

See the page on [[Jest]] for installing testing.
See the page on [[Zero to linting and formatting]] to get linting and formatting going.

