---
tags:
  - bun
  - javascript
  - typescript
---
# Bun

[Bun](https://bun.sh/) is a recent [[Node]] replacement and competitor.

```shell
# To install:
curl -fsSL https://bun.sh/install | bash
```

Bun sells itself as being much faster than Node. It's worth [verifying that this is actually true for your usecase first](https://youtu.be/EVMMoDWN79E?si=8B5QPsYiHqOzDiHR).

## Configuration

Bun stores all configuration for the runtime [in a bunfig.toml file](https://bun.sh/docs/runtime/bunfig).

### Private registries

```toml
[install]
# This is the default install location.
"registry" = "https://registry.npmjs.org/"

[install.scopes]
# Environment variables are supported in this config.
"@custom" = { url = "https://npm.pkg.github.com", token = "$GITHUB_OAUTH_TOKEN" }
"@again" = { url = "https://npm.pkg.github.com", token = "$GITHUB_OAUTH_TOKEN" }
```

[For more info, see their page on Scopes and registries](https://bun.sh/docs/install/registries).