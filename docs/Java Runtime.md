---
tags: java, evil, horror, jre, jdk
---

# Java Runtimes

On [[MacOS]], despite your best efforts you'll probably need a JRE ([[Java]] Runtime Environment) at some point. If doing development, it can be easier to install the whole JDK instead ([[Java]] Development Kit).

### Which do I pick?

For more complete information, check out [Java Is Still Free](https://medium.com/@javachampions/java-is-still-free-3-0-0-ocrt-2021-bca75c88d23b).

#### [OpenJDK](https://openjdk.org/)

**NOTE:** [AdoptOpenJDK](https://adoptopenjdk.net/releases.html) and OpenJDK are the same thing. AdoptOpenJDK are just prebuilt binaries.

```shell
# Install the JDK itself
brew install openjdk

# Follow the instructions under 'Caveats'. Usually it'll be
sudo ln -sfn /opt/homebrew/opt/openjdk/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk.jdk
```

#### [Temurin](https://adoptium.net/temurin/releases/)

Temurin is another open-source JDK built on [OpenJDK](#OpenJDK) by [Adoptium](https://adoptium.net/) (owned by the [Eclipse Foundation](https://www.eclipse.org/org/)).

It can be installed from its [[Homebrew]] cask or downloaded from its [releases page](https://adoptium.net/temurin/releases/).
```shell
# Install Temurin.
brew install --cask temurin
```