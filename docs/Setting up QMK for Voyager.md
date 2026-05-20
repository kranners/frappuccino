---
id: Setting up QMK for Voyager
date: "08 February, 2026"
---

# Setting up QMK for Voyager

1. Set up the QMK tool
2. Go to https://github.com/zsa/qmk_firmware and find the most recent `firmware` branch eg. `firmware25`
3. Using that branch, run `qmk setup` like:
```shell
# Replacing firmware25 with the most recent branch
qmk setup zsa/qmk_firmware -b firmware25
```
4. Make a folder containing your Oryx export in `~/qmk_firmware/keyboards/zsa/voyager/keymaps/`
5. Whatever you named that folder (called a keymap), compile and flash like:
```shell
qmk compile -kb zsa/voyager -km my_keymap
```
