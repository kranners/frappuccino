---
id: Link to notification settings on iOS
aliases:
  - Link to notification settings on iOS
tags: []
---

# Link to notification settings on iOS

### After iOS 16

Use `openNotificationSettingsURLString`, a constant in Swift for linking to your app's notification settings.

[See the relevant Apple Developer documentation](https://developer.apple.com/documentation/uikit/uiapplication/4013180-opennotificationsettingsurlstrin)

Usage:
```swift
if #available(iOS 16.0, *) {
    return UIApplication.openNotificationSettingsURLString
}
```

### After iOS 15.4

Use the deprecated constant `UIApplicationOpenNotificationSettingsURLString`.

```swift
if #available(iOS 15.4, *) {
    return UIApplicationOpenNotificationSettingsURLString
}
```

[See the relevant Apple Developer documentation](https://developer.apple.com/documentation/uikit/uiapplicationopennotificationsettingsurlstring)

### Before iOS 15.4

Before iOS 15.4, you cannot link specifically to the notifications settings. Only to your app's settings page.

```swift
return UIApplication.openSettingsURLString
```

[See the relevant Apple Developer documentation](https://developer.apple.com/documentation/uikit/uiapplication/1623042-opensettingsurlstring)

