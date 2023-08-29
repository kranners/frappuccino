---
tags: java, evil, horror, jre, jdk
---

# JRE

On MacOS, despite your best efforts you'll probably need a JRE at some point.

The right way to set this up is to install `openjdk` through [[Homebrew]].

```shell
# Install the JDK itself
brew install openjdk

# Follow the instructions under 'Caveats'. Usually it'll be
sudo ln -sfn /opt/homebrew/opt/openjdk/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk.jdk
```
