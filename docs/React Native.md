---
id: 1726808559-WIVX
aliases:
  - React Native
tags: []
---

# React Native

[A library for writing iOS and Android apps in JavaScript using a similar API to React.](https://reactnative.dev/)

[See the React Native glossary](https://reactnative.dev/architecture/glossary)

### Native Modules

The purpose of native modules is to allow for native (Objective-C, C++, Swift,
Java, Kotlin) code to be executed within an app's JavaScript.

A native module is a custom block of code, typically a Java class or a Swift
interface, which is exposed by React Native via the `NativeModule` system.

Native Modules are eventually to be supplanted by [Turbo Native Modules](https://github.com/reactwg/react-native-new-architecture/blob/main/docs/turbo-modules.md) and [Fabric Native Modules](https://github.com/reactwg/react-native-new-architecture/blob/main/docs/fabric-native-components.md).

[See the Native Modules Intro](https://reactnative.dev/docs/native-modules-intro)

#### In iOS

[See the iOS Native Module documentation](https://reactnative.dev/docs/native-modules-ios)

#### In Android

Java or Kotlin native modules are defined by either:
- Extending `ReactContextBaseJavaModule` - [as recommended by React Native](https://reactnative.dev/docs/native-modules-android?android-language=java#create-a-custom-native-module-file)
- Extending `BaseJavaModule`
- Implementing the `NativeModule` interface

All of these need to implement the `getName()` function:
```java
public class GreetingModule extends ReactContextBaseJavaModule {
    GreetingModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "GreetingModule";
    }
}
```

This `getName()` would mean your JS imports look like:
```javascript
import { NativeModules } from 'react-native';

const { GreetingModule } = NativeModules;
```

To make your module do stuff, rather than just being importable, mark methods
on your module with `@ReactMethod`.

```java
import android.util.Log;

@ReactMethod
public void greet(String name) {
   Log.d("Hi there, " + name + "!");
}
```

[See the Android Native Modules documentation](https://reactnative.dev/docs/native-modules-android)
