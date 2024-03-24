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

### GDK

[The GDK (GIMP Drawing Kit)](https://en.wikipedia.org/wiki/GDK) is the lower-level abstraction to allow GTK to support multiple platforms. Much like the [Qt Platform Abstraction](https://doc.qt.io/qt-5/qpa.html) for [[#Qt]].

For use of GTK with [Wayland](Windowing%20Systems#Wayland), it should work out of the box. To override to XWayland instead, set:
```shell
# Force the Xwayland backend
GDK_BACKEND=x11
```

### Configuration

#### Under [[Arch Linux]]

If you are under a major desktop environment (GNOME, KDE Plasma etc) then there will be a tool already configured in your system to configure GTK. Use that.

**Updating the manual files if there is no available tool**

Configuration files are located under a few different spots depending on which version of GTK you're configuring:

- For GTK 2: `~/.gtk-2.0`
- For GTK 3: `~/.config/gtk-3.0/settings.ini`
- For GTK 4: `~/.config/gtk-4.0/settings.ini`

You may need all three of these depending on your setup.

[*For a full list of configuration options, see the GTK documentation on Settings.*](https://docs.gtk.org/gtk4/class.Settings.html#properties)

**Installing a new theme**

System-wide themes are typically located under `/usr/share/themes/<Theme-Name>/`. 
User themes are typically located under `~/.themes/<Theme-Name>/`.

They'll be unpacked automatically by `pacman` if you choose to install that way, otherwise you'll need to manually unpack into `~/.themes/`.

So start by installing a theme of your choice. Like perhaps, the [Catppuccin GTK theme 🌺](https://github.com/catppuccin/gtk).

After this, either using your systems GTK configuration tool, or manually, update the configuration like:

*For GTK 2 configuration:*
```ini
gtk-cursor-theme-name = "Catppuccin-Latte-Sky-Cursors"
gtk-cursor-theme-size = 32
gtk-icon-theme-name = "Papirus-Dark"
gtk-theme-name = "Catppuccin-Latte-Standard-Sky-Light"
```
**NOTE:** You may need to set `GTK2_RC_FILES=/your/config/location/`.

*For GTK 3 and GTK 4 configuration:*
```ini
[Settings]
gtk-cursor-theme-name=Catppuccin-Latte-Sky-Cursors
gtk-cursor-theme-size=32
gtk-icon-theme-name=Papirus-Dark
gtk-theme-name=Catppuccin-Latte-Standard-Sky-Light
```

#### Configuration under [[NixOS]]

For Nix configuration, I thoroughly recommend the [[Home Manager]] package for GTK.

**NOTE:** *gtk.nix* will set the config for GTK 2, 3, and 4 on its own. *Do not configure them separately.*

[*See here for the gtk.nix home manager options*](https://github.com/nix-community/home-manager/blob/master/modules/misc/gtk.nix).

For your GTK theme, you'll want to set three different options:
- `gtk.theme` for the base theme
- `gtk.iconTheme` for the icon theme
- `home.pointerCursor` with `home.pointerCursor.gtk.enable = true` for the cursor theme

**NOTE:** Use `home.pointerCursor` over `gtk.cursorTheme` since it will automatically set links that are unrelated to GTK.

**What to set the options**

Each of these three take in a `package` and a `name`.

- `package` refers to any Nix Package, this could be loaded in from nixpkgs, or derived yourself.
- `name` refers to the name of the theme to use within that package.

To find out all available themes for a given package, we can list out the files it contains and pick a suitable sub-directory:
```shell
# Install eza if you don't have it, or nix-shell -p eza
eza $(nix build "nixpkgs#<PACKAGE>" --print-out-paths --no-link) --tree --level 5
```

Which should give an output like:
```
/nix/store/3ihjnc9fxak2mf0vy4lxsncgp2502378-catppuccin-gtk-0.7.1
├── nix-support
│  └── propagated-user-env-packages
└── share
   └── themes
      ├── Catppuccin-Frappe-Standard-Blue-Dark
      │  ├── cinnamon
      │  ├── gnome-shell
      │  ├── gtk-2.0
      │  ├── gtk-3.0
      │  ├── gtk-4.0
      │  ├── index.theme
      │  ├── metacity-1
      │  ├── plank
      │  └── xfwm4
      ├── Catppuccin-Frappe-Standard-Blue-Dark-hdpi
      │  └── xfwm4
      └── Catppuccin-Frappe-Standard-Blue-Dark-xhdpi
         └── xfwm4
```
The name of the theme in this instance would be *Catppuccin-Frappe-Standard-Blue-Dark*.

**A full example**

```nix
{ pkgs, ... }: {
  gtk = {
    enable = true;

    iconTheme = {
      package = pkgs.catppuccin-papirus-folders;
      name = "Papirus-Dark";
    };

    theme = {
      package = pkgs.catppuccin-gtk;
      name = "Catppuccin-Frappe-Standard-Blue-Dark";
    };
  };

  home.pointerCursor = {
    package = pkgs.catppuccin-cursors.frappeBlue;
    name = "Catppuccin-Frappe-Dark-Cursors";
	
    gtk.enable = true;
  };
}
```

## Qt

Qt (say it like Q-T, or else) was initially released by then Trolltech, now The Qt Company in 1995.

**SIDE NOTE:** I was interested to know why it's called Qt. Turns out the company has a fair bit of history.

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

**To use an in-built theme OR to mimic GTK:**

To mimic GTK, Qt can use the QGtkStyle platform theme. QGtkStyle will use GTK 2 to render the underlying components. This comes preinstalled on all versions of Qt beyond version 4.5.

For Qt 4, enable it by writing into your Qt configuration (either `/etc/xdg/Trolltech.conf` or `~/.config/Trolltech.conf`):
```Trolltech.conf
[Qt]
style=GTK+
```

For Qt 5 and Qt 6, use:
```shell
export QT_QPA_PLATFORMTHEME=gtk2
```

**To not use an in-built theme AND not in Plasma or GNOME:**

If not operating under a KDE Plasma or GNOME desktop environment, you'll want to install the [`qt5ct`](https://sourceforge.net/projects/qt5ct/) or [`qt6ct`](https://github.com/trialuser02/qt6ct) packages depending on your Qt version.

You'll then want to configure Qt to use these with:
```shell
# Change this to qt5ct if you are using that
export QT_QPA_PLATFORMTHEME=qt6ct
```

Then use the provided configuration tool to configure to your hearts content - like installing a separate [Catppuccin theme 🌺](https://github.com/catppuccin/qt5ct)!

#### Under [[NixOS]]

Under Nix, there's no need to install a configuration tool like `qt5ct`.

Like all things NixOS, you can choose to install and configure Qt in either your [[NixOS]] setup or your [[Home Manager]] setup. I recommend Home Manager.

[*See here for the qt.nix home manager options*](https://github.com/nix-community/home-manager/blob/master/modules/misc/qt.nix).

**To mimic GTK**:

Using the `qt.platformTheme` option you can directly set the platform package:
```nix
{ pkgs, ... }: {
	qt = {
		enable = true;
		# This could be gnome, gtk, kde, lxqt, qtct
		platformTheme = "gtk";
	};
}
```

**NOTE:** `qt.platformTheme = "gtk";` will install the relevant QGtkStyle packages for Qt 5 and Qt 6, and will also set your `QT_QPA_PLATFORMTHEME`.

**NOTE:** `qt.platformTheme = "qtct";` will install qt5ct and qt6ct, and set your `QT_QPA_PLATFORMTHEME`.

**To use a different theme:**

To use a pre-installed theme, just setting `qt.style.name` will suffice:
```nix
{ pkgs, ... }: {
	qt = {
		enable = true;

		style = {
			name = "breeze";
		};
	};
}
```

For an external theme, you'll need to set the `qt.style.package` as well:
```nix
{ pkgs, ... }: {
	qt = {
		enable = true;

		style = {
			# This could also be a custom package, whatever you want!
			package = pkgs.adwaita-qt;
			name = "breeze";
		};
	};
}
```
