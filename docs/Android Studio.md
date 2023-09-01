---
tags: android, java, development, mobile
---

# Android Studio

[Android Studio](https://developer.android.com/) is the development platform for [[Android]].

It's best installed from [its download site](https://developer.android.com/studio).

Beyond here you will definitely need a [[Java Runtime]].
### Install SDK and CLI tools

To install the Android SDK:

1. Open Android Studio.
2. Navigate to More Actions **→** SDK Manager.
3. Select an Android SDK, eg. Android 13.
4. Update your [shell](#Command%20Line) profile eg. `~/.zshrc` with:
```shell
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```
To include the tools in the PATH.
