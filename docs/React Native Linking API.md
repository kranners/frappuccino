---
id: React Native Linking API
aliases:
  - React Native Linking API
tags: []
---

# React Native Linking API

Linking API is for handling both opening of custom URLs, and handling when an app is opened by a custom URL.

[See the Linking API documentation](https://reactnative.dev/docs/linking)

### Open a custom URL

Use `Linking.openURL(url)` for this.
Use `Linking.canOpenURL(url)` first, to check if the thing can actually be done.

```js
const handlePress = useCallback(async () => {
  // Checking if the link is supported for links with custom URL scheme.
  const supported = await Linking.canOpenURL(url);

  if (supported) {
    // Opening the link with some app, if the URL scheme is "http" the web link should be opened
    // by some browser in the mobile
    await Linking.openURL(url);
  } else {
    Alert.alert(`Don't know how to open this URL: ${url}`);
  }
}, [url]);
```

### Handle when the app is opened by a custom URL

Use `Linking.getInitialURL()` for this.

`getInitialURL()` is an async method, so you'll need to do some Promise handling:
```js
const [url, setUrl] = useState<string | undefined>();

useEffect(() => {
    const getUrl = async () => {
        setUrl(await Linking.getInitialURL());
    };

    getUrl();
});
```

### Deep link into the app settings

Use `Linking.openSettings()`

```js
<TouchableOpacity onPress={Linking.openSettings}>
    Go to settings 🔧
</TouchableOpacity>
```

This will take you to the app's custom settings, if they exist.
Otherwise, will just open up the base system settings.

[See `openSettings()` documentation](https://reactnative.dev/docs/linking#opensettings)

