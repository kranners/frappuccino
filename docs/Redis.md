---
tags: redis, cache, queue
---

# Redis

[Redis](https://redis.io/) is a ubiquitous in-memory cache.

### Installation

You'll need [[Homebrew]] installed first.
[Redis has their own installation instructions](https://redis.io/docs/getting-started/installation/install-redis-on-mac-os/), essentially it looks like:

```shell
# Install Redis
brew install redis
```

#### Running in the foreground / background

To run in the foreground, it's:
```shell
redis-server
```

To run in the background, it's:
```shell
# Start the Redis service
brew services start redis

# If this fails, it's probably because you haven't run a brew service before.
brew update
brew upgrade

# Generic command to get Homebrew to install the services package.
brew services
```