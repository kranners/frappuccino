---
tags:
  - gtk
  - qt
  - linux
  - programming
---

# Widget Toolkits

A [widget toolkit](https://en.wikipedia.org/wiki/Widget_toolkit) is a library which provides components to build graphical applications.

**NOTE:** They are not, themselves, programs which run. They're just libraries for other programs to build upon. They do however, need to be installed as packages to work correctly.

Linux applications typically use either [GTK](https://www.gtk.org/) or [Qt](https://www.qt.io/) as their widget toolkit of choice.

## GTK

GTK (the GIMP Toolkit) was initially released by The GNU Project in April 1998, shortly before the release of [GIMP](https://www.gtk.org/) itself.

All [GNOME](https://www.gnome.org/) programs use GTK. Other software using GTK include: [WebKit](https://webkitgtk.org/), [HandBrake](https://handbrake.fr/), and [Transmission](https://transmissionbt.com/).

For use of GTK with [Wayland](Windowing%20Systems#Wayland), it should work out of the box. To override to XWayland instead, set:
```shell
# Force the Xwayland backend
GDK_BACKEND=x11
```

## Qt

Qt (say it like Q-T, or else) was initially released by then Trolltech, now The Qt Company in 1995.

**SIDENOTE:** I was interested to know why it's called Qt. Turns out the company has a fair bit of history.

It's called *"Qt"* because one of the founders liked the letter Q. The *"t"* more-or-less stands for *toolkit*. It's not because to their duo was called "*Quasar Technologies*" for a while.

All [KDE](https://en.wikipedia.org/wiki/KDE_Projects) projects use Qt. Other software using Qt include: [FileZilla](https://en.wikipedia.org/wiki/KDE_Projects), [Mumble](https://www.mumble.info/), and [VLC](https://www.videolan.org/vlc/).

### Platform plugin

Since Qt is a multi-platform toolkit that needs to be able to run across platforms like [[Windows]], [[MacOS]] and [[Linux]] - it uses an underlying abstraction called the [Qt Platform Abstraction](https://doc.qt.io/qt-5/qpa.html) to handle specific bindings per platform.

An example of a platform plugin is [QtWayland](https://wiki.qt.io/QtWayland#How_do_I_use_QtWayland.3F), the platform plugin for running Qt as a Wayland client.

### Configuration

**NOTE:** If you're using [Wayland](Windowing%20Systems#Wayland) then you'll want to set the relevant Qt environment variable to force Qt to render using the QtWayland [platform plugin](#Platform%20plugin):
```shell
# Force use the Wayland platform plugin
export QT_QPA_PLATFORM=wayland
```

#### Under [[Arch Linux]]

If not operating under a KDE Plasma or GNOME desktop environment, you'll want to install the [`qt5ct`](https://sourceforge.net/projects/qt5ct/) or [`qt6ct`](https://github.com/trialuser02/qt6ct) packages depending on your Qt version.

You'll then want to configure Qt to use these with:
```shell
# Configure the plat
```

#### Under [[NixOS]]