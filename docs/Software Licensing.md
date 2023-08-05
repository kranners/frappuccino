---
tags: licenses, programming, software
---

[An open-source license](https://choosealicense.com/) is a pseudo-requirement when writing any publicly facing code or software package.

The software license is typically stored at the root of the repository, under `LICENSE.md` or simply `LICENSE`.

### Failure to write a license

By default, all software created is under exclusive copyright by the creator. By default, you have also accepted to all [terms & agreements](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service) that you may have signed up for in the process.

As a software *user*, any software missing a license will generally mean that you cannot use it.
If a piece of unlicensed software is on GitHub, you may view or fork the code, but not necessarily use it or distribute it.

In a case where you (as the software creator) want to simply opt-out of all licensing at all, you could opt for the [Unlicense](#Unlicense).

# License use in [[Node]]

### package.json `license` key

The `license` key in a [[Node]] project's package.json file represents to the [[npm]] repository what license your package falls under.

Its value should be set to any [SPDX license ID](https://spdx.org/licenses/).

```json
{
	...,
	"license": ""
}
```

### `yarn licenses`

[[yarn]] provides [commands to support licenses](https://classic.yarnpkg.com/lang/en/docs/cli/licenses/).

```shell
# Outputs all dependency licenses to stdout.
yarn licenses generate-disclaimer > DISCLAIMER.md
```

# Licenses

### MIT

The [MIT license](https://choosealicense.com/licenses/mit/) is possible the most common one. It provides no liability or warranty for usage, and allows for closed-source commercial use. However, it requires copyright to be included in all future versions.

### GPLv3

The [GNU GPLv3 license](https://choosealicense.com/licenses/gpl-3.0/) provides full usage rights with no warranty, so long as all future derivative works are fully open source - and also use the GPLv3 license.

### Unlicense

The [Unlicense](https://choosealicense.com/licenses/unlicense/) allows users to do anything with the software, and provides no warranty or liability if things don't work.

