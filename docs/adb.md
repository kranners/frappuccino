---
id: adb
aliases:
  - adb
tags: []
---

# adb

Client for ADB (Android Debug Bridge)

Man page reference:
https://android.googlesource.com/platform/packages/modules/adb/+/refs/heads/main/docs/user/adb.1.md

Common commands:

- Forward connections to device (useful for React Native) `adb forward`
- Run commands with `adb shell`
- Install an APK with `adb install ./app.apk`
- Replace the existing one with `adb install -r ./app.apk`
- Show device log with `adb logcat`
- List devices `adb devices [-l]`
- Check version `adb version`

