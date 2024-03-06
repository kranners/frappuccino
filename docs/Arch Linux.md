---
tags:
  - linux
  - arch
---

# Arch Linux

[Arch](https://wiki.archlinux.org/title/Arch_Linux) is a lightweight and simple distribution which aims to provide the bleeding edge of most software by following a [rolling release model](https://en.wikipedia.org/wiki/Rolling_release).

This page is mainly following research and steps involved in setting up a new Arch installation.

## Entry and verification

**What is UEFI?**
[UEFI (Unified Extensible Firmware Interface)](https://en.wikipedia.org/wiki/UEFI) is the second coming of BIOS, and is the platform that generally all modern computers use for booting. It allows for secure boot, 64-bit pre-OS environments and the ability to boot from large partitions (greater than 2TB).
Even if your computer claims to have a 'BIOS', it is probably actually just using UEFI.

*Boot mode* is found in `/sys/firmware/efi/fw_platform_size`, and should probably always be `64`, which means the system is booted and has a 64-bit x86 UEFI.

To show network interfaces:
```shell
ip link
```

Time zone stuff:
```shell
# Get current time & timezone
timedatectl

# List timezones
timedatectl list-timezones

# Set yours, ie to Melbourne
timedatectl set-timezone Australia/Melbourne
```

## Partitioning

### Checkup and setup
> If the disk from which you want to boot [already has an EFI system partition](https://wiki.archlinux.org/title/EFI_system_partition#Check_for_an_existing_partition "EFI system partition"), do not create another one, but use the existing partition instead.

*[Arch Wiki](https://wiki.archlinux.org/title/Installation_guide)*
In my case, the drive already had a EFI system partition.

Start by backing up the existing partition table:
```shell
# This makes the partition dump
sfdisk -d /dev/sdb > sdb.dump

# This restores the partition dump into the disk
sfdisk /dev/sdb < sdb.dump
```

### Choosing a partition table format
You will generally want to use [GUID partition table (GPT)](https://en.wikipedia.org/wiki/GUID_Partition_Table) over [master boot record (MBR)](https://en.wikipedia.org/wiki/Master_boot_record) as it is the more recent standard and has supports for larger partition sizes, more partitions, data integrity, etc. The only downside is compatibility with older systems.

The GUID partition table is part of the UEFI specification, so you probably want to use it if using UEFI. Which you likely are.

### Ensuring optimal sector size
*"Sector" and "block" can be pretty much used interchangeably. For SSDs, they're called "pages".*

A [disk sector](https://en.wikipedia.org/wiki/Disk_sector) is the minimum storage unit available on a hard drive.

For a HDD, this is represented by known subdivisions on a physical disk. SDDs do have a 'true' page size, but this is not exposed. Instead, whatever they report as their physical sector size will be the same as their logical sector size.

Using `hdparm` you can find the sector size of your drive.
```shell
# Get the sector size of /dev/sdb
dhparm -I /dev/sdb | grep 'Sector size:'

# This resulted in:
Logical Sector size:              512 bytes
Physical Sector size:             512 bytes
```

If a drive supports multiple sector sizes, it will look like:
```
Logical  Sector size:                   512 bytes [ Supported: 512 4096 ]
Physical Sector size:                  4096 bytes
```

Since mine did not, `512 bytes` is the only available option. Nothing to do here.

### Creating the new partition table

Looked into [completely resetting the SSD](https://wiki.archlinux.org/title/Solid_state_drive/Memory_cell_clearing), determined it wasn't necessary as I'm not selling this drive to someone else and there's nothing fishy going on 🐟.

Start by listing what partitions currently exist:
```shell
fdisk -l /dev/sdb
```

Open the `fdisk` tool to create and edit a new partition table:
```shell
fdisk /dev/sdb
```

1. Create a new table with `g`.
2. Create the new EFI partition with `n`, partition number 1, first sector 2048, last +1G
	1. The partition contained an existing *vfat signature*.
	2. Looking into it, seems like [a vfat signature is an indicator of existing data](https://unix.stackexchange.com/questions/477991/what-is-a-vfat-signature), and deleting it would be equivalent to wiping the partition.
3. Created the remaining partition 2 as 8GiB of swap, and partition 3 as the remaining drive.
4. Used `t` to update the first partition to `EFI System`
5. Used `p` to print out the partition table to make sure everything looked OK
6. Used `w` to write it onto the disk.

## Creating the file system

Had another choice to make with which filesystem to go with.

The choice here seems to be between [ext4](https://ext4.wiki.kernel.org/index.php/Main_Page), [xfs](https://wiki.archlinux.org/title/XFS) and [btrfs](https://btrfs.readthedocs.io/en/latest/Introduction.html).
- Features of btrfs include snapshots & rollbacks, support for RAID and self-healing. Lowest reliability, most features.
- XFS seems to mainly focus on scalability, high speed and performance.
- ext4 is the historically stable option with the highest reliability.
Ended up choosing ext4.

Creating an ext4 filesystem on `/dev/sdb3` as the largest regular filesystem:
```shell
mkfs.ext4 -L ROOT /dev/sdb3
```

Then creating swap on `/dev/sdb2`
```shell
mkswap -L SWAP /dev/sdb2
```

(For context, later re-partitioned the disk to get rid of existing stuff from a previous Linux install)
```shell
mkfs.fat -F 32 -n EFI /dev/sdb1
```

## Mounting the file system

Using `--mkdir` to create the mount point if it does not exist.

```shell
# Mount the ROOT filesystem
mount --mkdir /dev/sdb3 /mnt

# Mount the EFI filesystem
mount --mkdir /dev/sdb1 /mnt/boot

# Enable the swap partition
swapon /dev/sdb2
```

## Preparing to bootstrap the new system

Update the mirror list with:
```shell
reflector --delay 1 -f 10 > /etc/pacman.d/mirrorlist
```

Enable `ParallelDownloads` in `/etc/pacman.conf` by uncommenting a line in the config that should be there.

## Bootstrapping the new system

Command for bootstrapping packages onto a new drive is `pacstrap`.

**Base packages**
`base linux linux-firmware`

**Filesystem tooling**
`e2fsprogs dosfstools`

**Text editor**
`vim`

**Manpages**
`man-db man-pages texinfo`

**Shell**
`zsh`

**Desktop environment, network manager, utilities**
`plasma-meta kde-applications`

You could also install `plasma` here, which is a group instead of a meta-package. For reasons behind installing one or the other check out the [Arch Wiki page on this](https://wiki.archlinux.org/title/Meta_package_and_package_group).

In a similar vein, you could install `kde-applications-meta` instead, but I'd like to be able to manage the KDE applications separately.

## Configuring the system

**Filesystem table**
Since we labelled the partitions before, the fstab will use labels instead of UUIDs for simplicity.
```shell
genfstab -L /mnt >> /mnt/etc/fstab
```

**Changing root**
```shell
arch-chroot /mnt
```

**Setting the time zone**
```shell
ln -sf /usr/share/zoneinfo/Australia/Melbourne /etc/localtime
hwclock --systohc
```

**Localization**
Edited the */etc/locale.gen* file to uncomment `en_US.UTF-8 UTF-8` and `en_AU.UTF-8 UTF-8`.

```shell
# Generate the locales
locale-gen

# Configure to choose one, in my case AU 🇦🇺
echo "LANG=en_AU.UTF-8" > /etc/locale.conf
```

**Hostname and password**
```shell
# Set the hostname
echo pinky > /etc/hostname

# Set the password
passwd
```

##### Setting up bootloader

```shell
# Install AMD microcode
pacman -S amd-ucode
```

Set up a loader entry for `arch.conf`, using `root=LABEL=ROOT`

## Setting up users, sudoers, desktop environment on launch

After this was just a reboot.
```shell
reboot
```

As `plasma-meta` comes with `NetworkManager` that needed to be started up.
```shell
systemctl enable --now NetworkManager
```

Then needed to install and update the `sudo` config to enable privilege escalation.
```shell
pacman -S sudo

# This edit was to enable the wheel group sudo access:
# %wheel      ALL=(ALL:ALL) ALL
# You should probably use the visudo command instead
vim /etc/sudoers
```

Create the login user
```shell
# The specified shell needs to be an absolute path
useradd -m -G wheel -s /usr/bin/zsh aaron
```