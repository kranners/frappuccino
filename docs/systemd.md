---
id: systemd
date: "08 May, 2025"
---

# systemd

[systemd in their own words is a "suite of basic building blocks for a Linux
system".](https://systemd.io/)

systemd at its core provides an "init" service manager which runs as PID 1, and
starts the rest of the system.

systemd is responsible for everything process-related, it can:
- start and orchestrate processes based on their configurations
- handle orphan processes
- kill zombie processes

:::info Zombies and orphans
When a child process exits, its parent waits to receive its exit code.
It often accomplishes this using literal `wait` calls.

This waiting is sometimes called *"acknowledgement"* or *"reaping"*.

While a child process is exited, and its parent has not acknowledged it, the
child is considered a zombie 🧟.

If a parent process exits without reaping its children, then those child
processes are considered orphans.

Orphans are automatically picked up by `init`, in this case, systemd.
:::

## Units

A _Unit_ in systemd is _anything at all_.
A unit might as well be a word for "thing". These include services, mount
points, devices, sockets.

In systemd, a unit has a unit file, whose suffix is the type of unit it is.
So, `.service`, or `.mount`, or `.device`.

If you omit the unit type, systemd will assume it's `.service`.

Units can be installed by a package, by a system administrator, or by a user.

Units installed by packages typically go to `/usr/lib/systemd/system`.
Units installed by the system administrator typically go to `/etc/systemd/system`.

To list all units and where they come from use:
```shell
systemctl show --property=UnitPath
```

### Unit definitions

#### Dependencies

Often a service will require another service to be started before it can run.

To handle this, you need to define either a `Wants=` or `Requires=` as part of
your unit definition.

You'll probably also want to configure an ordering like `After=` or `Before=`.
Unit dependencies that do not define an ordering will start both the depending
unit and the dependency at the same time.

Setting `Requires=` will deactivate the unit if its dependency is deactivated
or its activation fails.

Setting `Wants=` will start the dependencies together, but will not deactivate
a unit if its dependency fails.

The "strongest" dependency requirement is `BindsTo=`. 

- `Wants=` does not deactivate the dependent if the dependency fails.
- `Requires=` deactivates the dependent only if the dependency fails.

:::warning
`Requires=` definition of failing does not count if from a failing condition
check.

Only if activation fails.
:::

- `BindsTo=` deactivates the dependent if the dependency fails or exits gracefully.

### Services

A _Service_ in systemd has historically been called a _daemon_.
_Services_ run in the background, typically responding to events in some way.

## Usage

Managing units in systemd is done through the provided `systemctl` CLI tool.

`systemctl` by default will act on _system units_, which requires root
privileges.

To operate on _user units_, which do not require root, use `systemctl --user`.

Some common operations:
- `systemctl` -> List all running units
- `systemctl --failed` -> List all failed units
- `systemctl list-unit-files` -> List all installed unit files

To manage units:
- `systemctl status <unit>` -> Get the status of a unit
- `systemctl start <unit>` -> Start a unit
- `systemctl stop <unit>` -> Stop a unit
- `systemctl restart <unit>` -> Restart a unit

[See systemd on the Arch Wiki.](https://wiki.archlinux.org/title/Systemd#Basic_systemctl_usage)

### `systemd-analyze`

Can be used to diagnose load times from boot to userspace to completion.

- `systemd-analyze` -> Show how long the boot took
```shell
# Example run
$ systemd-analyze time                                  
Startup finished in 10.819s (firmware) + 5.608s (loader) + 8.773s (kernel) + 2.527s 
(userspace) = 27.729s 
graphical.target reached after 2.527s in userspace.
```

- `systemd-analyze blame` -> Show which units took the most time during boot

[See `systemd-analyze` manpages](https://man.archlinux.org/man/systemd-analyze.1)

