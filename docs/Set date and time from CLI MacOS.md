---
id: Set date and time from CLI MacOS
aliases:
  - Set date and time from CLI MacOS
tags: []
---

# Set date and time from CLI MacOS

Set to a date:
```shell
# Update to not use network date/time
sudo systemsetup -setusingnetworktime off

# Update the date (mm:dd:yy)
sudo systemsetup -setdate 11:06:24 # 6th November, 2024
```

Restore to network time:
```shell
sudo systemsetup -setusingnetworktime on
```

[See systemsetup man page](https://ss64.com/mac/systemsetup.html)

