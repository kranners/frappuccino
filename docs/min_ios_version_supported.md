---
id: min_ios_version_supported
aliases:
  - min_ios_version_supported
tags: []
---

# `min_ios_version_supported`

Defines the minimum supported iOS version. Duh.

Comes from the Podfile, but then comes
[From this pod helper file](https://github.com/facebook/react-native/blob/a5dd1be889be21f8daefbc609702989ec7c156cf/packages/react-native/scripts/react_native_pods.rb#L30)

[But then that comes from this constants helper file](https://github.com/facebook/react-native/blob/a5dd1be889be21f8daefbc609702989ec7c156cf/packages/react-native/scripts/cocoapods/helpers.rb#L68) - at the moment this is `15.1`

[See Stack Overflow answer about this variable](https://stackoverflow.com/questions/75277079/unable-to-pod-install-on-a-brand-new-react-native-project)

### `undefined local variable min_ios_version_supported`

Probably means you're missing the helpers.
Probably means you need to reinstall the Node packages.

Probably means `npm install`
