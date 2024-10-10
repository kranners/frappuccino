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

:::note
[RCT stands for ReaCT](https://github.com/facebook/react-native/issues/55)

RK stands for ReactKit, but that isn't used anymore.
:::

An iOS native module is an Objective-C class which implements a `RCTBridgeModule` protocol.

They are made up of a header `.h` file and the module implementation `.m`.

A basic header file which just defines a module, and does nothing else:
```h
#import <React/RCTBridgeModule.h>

@interface RCTGreetingModule : NSObject <RCTBridgeModule>
@end
```

To implement this module:
```c
#import "RCTGreetingModule.h"

@implementation RCTGreetingModule
    RCT_EXPORT_MODULE();
@end
```

This will expose the module to React Native under the name "GreetingModule".

:::note
Names by default are just the class name with with any `RK` or `RCT` prefixes removed.

`RCT_EXPORT_MODULE` can take in a name, but it takes it as a raw class name?
```c
// To export this as HelloModule
RCT_EXPORT_MODULE(HelloModule)

// Specifically, NOT:
RCT_EXPORT_MODULE("HelloModule")
```

[For more, see the React Native Module Name docs](https://reactnative.dev/docs/native-modules-ios#module-name)
:::

Methods against your module class aren't exported by default, you'll need to do so using `RCT_EXPORT_METHOD`:
```c
// Import the React log API
#import <React/RCTLog.h>

// Import our header file
#import "RCTGreetingModule.h"

// Define the class
@implementation RCTGreetingModule
    RCT_EXPORT_METHOD(greet:(NSString *)name) {
        RCTLogInfo(@"Hi there, %@!", name)
    }

    RCT_EXPORT_MODULE();
@end
```

You can also define synchronous, blocking methods with `RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD`:
```c
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getName) {
    return "ME";
}
```

:::warn
[React Native warns against these methods](https://reactnative.dev/docs/native-modules-ios#synchronous-methods), as they can cause tricky, hard to spot bugs and also prevent use of the debugger.
:::

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
