---
id: Ignoring dependency types in Dependabot
date: "17 April, 2025"
---

# Ignoring dependency types in Dependabot

Use the `update-types` key in an `ignore` group to ignore that type of dependencies.

For example:
```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "daily"
    ignore:
      - dependency-name: "@types/node"
        # For Node types, ignore any patch versions
        update-types: ["version-update:semver-patch"]
        # Ignore all major version updates, since they're breaking
      - dependency-name: "*"
        update-types: ["version-update:semver-major"]
```


Here patch versions of `@types/node` are ignored, as well as all major versions.

See [Controlling which dependencies are updated by Dependabot](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/controlling-dependencies-updated#specifying-the-semantic-versioning-level-to-ignore)
See [Dependabot options reference](https://docs.github.com/en/code-security/dependabot/working-with-dependabot/dependabot-options-reference#update-types-groups)
