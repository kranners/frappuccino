---
id: FTP Usage
aliases: []
tags:
  - ftp
  - command
  - line
  - networking
---

# FTP Usage

MacOS does not come with an FTP command line tool.
You can install it (and other old-school network tools) by installing `inetutils`.

```shell
brew install inetutils
```

## Usage

_Log into your server_

```shell
ftp username@server
```

_Copy folder of files across, this will copy across all files in the local CWD._

```shell
ftp> mput
(local-file) *
```

:::tip
`ftp` defaults to interactive mode, meaning all files will require a confirmation before sending.**
:::
To disable interactive mode, either run the command with the `-i` flag or use the command `prompt` to switch.

## LFTP

FTP is old and sucky in a variety of ways. [LFTP (command-**line** file transfer program)](https://linux.die.net/man/1/lftp) is a more modern version of the same thing.

**Disable SSL certificate verification**
Some hosts, like [[Hostinger]] have invalid SSL certificates over FTP.

```shell
lftp [...]:/> set ssl:verify-certificate false
```

**Recursively and concurrently mirror a folder**

```shell
lftp [...]:/> mirror -R --parallel [local] [remote]
```

**Run a command un-interactively**

```shell
lftp -u user,pass -e "... ; quit"
``` 