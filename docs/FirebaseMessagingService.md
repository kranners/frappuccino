---
id: FirebaseMessagingService
aliases:
  - FirebaseMessagingService
tags: []
---

# FirebaseMessagingService

A base class (`com.google.firebase.messaging.FirebaseMessagingService`) for receiving messages from [[Firebase Cloud Messaging]] (FCM).

All methods called on a `FirebaseMessagingService` are executed in a background thread, and can run when the app is backgrounded or otherwise not open.

[See FirebaseMessagingService](https://firebase.google.com/docs/reference/android/com/google/firebase/messaging/FirebaseMessagingService)

### Manifest

To start receiving messages, include in your AndroidManifest.xml:
```xml
<service
    android:name="com.me.myapp.FirebaseMessagingService"
    android:exported="false">
    <intent-filter>
        <action android:name="com.google.firebase.MESSAGING_EVENT" />
    </intent-filter>
</service>
```

#### Direct boot

To support [[Direct boot mode]], also include
```xml
<service
    ...
    android:directBootAware="true"> 👈
    <intent-filter>
        ...
    </intent-filter>
</service>
```

[See receiving FCM messages in Direct boot](https://firebase.google.com/docs/cloud-messaging/android/receive#receive_fcm_messages_in_direct_boot_mode)

