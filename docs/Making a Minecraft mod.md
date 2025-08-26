---
id: Making a Minecraft mod
date: "10 August, 2025"
---

# Making a Minecraft mod

## Getting started - picking a framework

You have two choices you need to make when making content for Minecraft.

Firstly - is this a Data Pack or a mod?

### Data packs

[Data packs](https://minecraft.wiki/w/Data_pack) are like "vanilla mods".

In general, a data pack can add new recipes, enchantments, advancements, etc.

Effectively, anything you can do with chat commands in Minecraft natively can
be done in a data pack.

Data packs do not require a modded client to play, and can be installed on servers.

Data packs are not able to add new assets or mechanics to the game.

If you are making a data pack, then your decision stops here.

### Mod framework

[This post from Maddy Miller explains all of it.](https://madelinemiller.dev/blog/forge-vs-fabric/)

You have three choices here, Forge, NeoForge and Fabric.

[**Forge** is the oldest and largest mod framework.](https://github.com/MinecraftForge/MinecraftForge)

If you specifically want your mod to interop with a bunch of existing mods for
older versions of Minecraft, go with Forge.

[**NeoForge** is a newer fork of Forge spawned from internal conflicts.](https://github.com/neoforged/NeoForge)

It is gaining traction among Forge users, but does not have the support for
older versions like Forge.

If you want your mod to interop with a bunch of existing mods for newer
versions of Minecraft, probably go with NeoForge.

[**Fabric** is a newer and more lightweight library, and is completely different from Forge.](https://github.com/FabricMC/fabric)

For any other situation, a standalone mod for a more recent version of
Minecraft - go with Fabric.

I chose to go with **Fabric**.

See [[Fabric]].

