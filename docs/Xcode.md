---
id: Xcode
aliases: []
tags:
  - xcode,
  - developer
  - tools,
  - macos
---

# Xcode

[Xcode](https://developer.apple.com/xcode/) is a toolkit for [[MacOS]] made by [[Apple]] for [[Apple]] development.

It's best installed through [their App Store page](https://apps.apple.com/us/app/xcode/id497799835?mt=12).

From there, you can install the Command Line Tools by:

1. Open Xcode.
2. Navigate to Preferences **→** Locations **→** Command Line Tools
3. Select the most recent or otherwise relevant version.

After installation, to actually enable the Command Line Tools:
```shell
sudo xcode-select --reset
```

If you are on Apple Chip, you'll need to install [Rosetta](https://en.wikipedia.org/wiki/Rosetta_(software)) or else things will start breaking:
```shell
softwareupdate --install-rosetta --agree-to-license
```

After this, if you are missing `xcrun` or `simctl`, run the *first launch experience* with:
```shell
xcodebuild -runFirstLaunch
```

## Platforms

Platforms in XCode refers to [[Apple]] operating systems that you can develop software for.

To install a new platform (*like a new iOS version*):

1. Open Xcode.
2. Navigate to Xcode **→** Settings **→** Platforms
3. Recent platforms are available in the list automatically and are installable with the *Get* button.
Older platforms are available by clicking the **+** button.

#### Managing platforms from the command line

To download all platforms:
```shell
xcodebuild -downloadAllPlatforms
```

To download a single platform (like if your iOS version is outdated)
```shell
xcodebuild -downloadPlatform iOS
```
## Simulators

Simulators are available for all [[Apple]] devices, and simulate hardware as best they can. They are not perfect, and are not performant or have feature parity against real devices.

```shell
# List available simulators
xcrun simctl list devices
```

To add a new simulator, say for *iPhone 13*, the steps are:

1. Open XCode.
2. Navigate to Window **→** Devices and Simulators **→** Simulators **→** **+**.
3. Select the device type, in this case *iPhone 13*.

## Runtimes

```shell
# Update the local iOS SDK version
xcodebuild -downloadPlatform iOS

# Get runtimes
xcrun simctl runtime list

# Get runtime IDs
xcrun simctl runtime list --json | jq ".[] | .identifier" --raw-output

# Get iPhone devicetypes
xcrun simctl list devicetypes --json |\
	jq -c '.[].[] | select(.productFamily | contains("iPhone")) | .name'
```

## Push notifications

Send a push notification to a running simulator:
```shell
xcrun simctl push booted com.example.MyApp payload.json
```

[See Become a Simulator expert](https://developer.apple.com/videos/play/wwdc2020/10647/?time=795)

