---
id: Direct boot mode
aliases:
  - Direct boot mode
tags: []
---

# Direct boot mode

Direct Boot mode is the mode an Android device runs in before the user unlocks.

For this, Android has a second, "device encrypted storage" instead of the usual "credential encrypted storage" (requires user unlock) to store relevant data.

Apps require special, explicit access in order to run in Direct Boot.

Apps running in Direct Boot can switch to regular usage patterns by listening to and handling the `ACTION_USER_UNLOCKED` message.

[Direct Boot mode documentation](https://developer.android.com/privacy-and-security/direct-boot)

