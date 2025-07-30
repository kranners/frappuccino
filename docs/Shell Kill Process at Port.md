---
id: Shell Kill Process at Port
aliases: []
tags:
  - shell
  - scripting
  - process
  - port
---

# Shell Kill Process at Port

_For more info, check out [the Stack Overflow thread this was shamelessly stolen from](https://stackoverflow.com/questions/3855127/find-and-kill-process-locking-port-3000-on-mac)._

Find a process PID using a port using:

```shell
# Find processes using port 3000.
sudo lsof -i :3000
```

Kill the process using PID with:

```shell
# Kill a process.
kill -15 <pid>

# Use kill -9 to REALLY kill it.
```

Combine this all together with:

```shell
# Where <port> is the port you want to kill.
kill -15 $(lsof -i :<port> | awk 'NR > 1 {print $2}')
``` 