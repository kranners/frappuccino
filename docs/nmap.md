---
tags: nmap, command line, terminal, zsh
---
# nmap

[nmap](https://nmap.org/) is a free-to-use [[Command Line]] [[Networking]] utility for scanning and discovery.

```shell
brew install nmap
```

## Basic Usage

**Ping scan an IP range for active devices**
```shell
sudo nmap -sn 192.168.2.0/24

> Starting Nmap 7.94 ( https://nmap.org ) at 2023-07-25 11:49 AEST
> Nmap scan report for 192.168.2.1
> Host is up (0.010s latency).
> MAC Address: 00:04:ED:F3:D3:2E (Billion Electric)
```

**Scan a specific IP for operating system and ports**
```shell
sudo nmap -O 192.168.2.4

> Starting Nmap 7.94 ( https://nmap.org ) at 2023-07-25 11:52 AEST
> Nmap scan report for 192.168.2.4
> Host is up (0.0051s latency).
> PORT     STATE SERVICE
> 8088/tcp open  radan-http
> MAC Address: 8C:F8:C5:01:26:01 (Intel Corporate)
> OS details: Linux 4.15 - 5.8
```