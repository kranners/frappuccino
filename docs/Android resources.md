---
id: Android resources
date: "08 November, 2024"
---

# Android resources

A resource is additional static content used in an Android application.

Each type of resource goes under `res/<type-dependent-folder-name>`, ie:
```
AnAndroidProject/
    res/
        values/
            strings.xml
        drawable/
            graphic.png
```

See [App resources overview](https://developer.android.com/guide/topics/resources/providing-resources)

### String resources

String resources are saved under `res/values/` and is accessed in app code using `R.string`, `R.array` and `R.plurals`.

The XML filename here is arbitrary, as each string resource defines its own resource ID.

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="fruit">Apple 🍎</string>
</resources>
```

Then to use in code:
```java
// "Apple 🍎"
String fruit = getString(R.string.fruit);
```

See [String resources](https://developer.android.com/guide/topics/resources/string-resource)

