---
id: DefinitelyTyped
date: "29 November, 2024"
---

# DefinitelyTyped

DefinitelyTyped is the source of the `@types/*` packages.

See [the DefinitelyTyped repository](https://github.com/DefinitelyTyped/DefinitelyTyped)

### Versioning with their respective packages

:::note
**TLDR**: The patch version doesn't matter. Keep the major and minor versions
synced.
:::

The `@types/*` packages [are versioned internally with `MAJOR.MINOR.9999`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/node/package.json#L4)
(Where `MAJOR.MINOR` are the same as the package that the respective `@types`
package is declaring types for).

That's just to ensure that development on DefinitelyTyped always uses the
latest versions.

Otherwise, for release, they are started at `MAJOR.MINOR.0` and the patch
version is incremented for each DefinitelyTyped release of that respective
minor version.

See [How do DefinitelyTyped package versions relate to versions of the corresponding library?](https://github.com/DefinitelyTyped/DefinitelyTyped#how-do-definitely-typed-package-versions-relate-to-versions-of-the-corresponding-library)

