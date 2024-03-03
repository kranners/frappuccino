---
tags:
  - command
  - linux
  - arch
---
# pv

[pv](https://linux.die.net/man/1/pv) is an open-source [command line](Command%20Line) tool for monitoring progress of data through a pipe. This can be for a large copy, or `dd`, or whatever.

*Monitoring `dd` progress with `pv`:*
```shell
pv archlinux.iso | sudo dd of=</dev/usb> bs=4M conv=fsync oflag=direct
```
