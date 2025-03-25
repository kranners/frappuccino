---
id: Disable Instant Lock on MacOS
date: "25 March, 2025"
---

# Disable Instant Lock on MacOS

Instant lock is the name of the feature which locks the machine when the Touch ID button is pressed.

You can disable it with:
```shell
defaults write com.apple.loginwindow DisableScreenLockImmediate -bool yes
```

Or turn it back on by changing that `yes` to a `no`.

There [are options available for that `loginwindow` here in the Apple documentation](https://developer.apple.com/documentation/devicemanagement/loginwindow).

See [keyboard - Macbook Pro - Disable lock on touch id press - Ask Different](https://apple.stackexchange.com/questions/430524/macbook-pro-disable-lock-on-touch-id-press/441922#441922)

