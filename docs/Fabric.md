---
id: Fabric
date: "10 August, 2025"
---

# Fabric

[Fabric is a library and a mod loader for building and installing mods to Minecraft.](https://github.com/FabricMC/fabric)

## Getting started

[Follow the Fabric Documentation guide for getting started.](https://docs.fabricmc.net/develop/getting-started/setting-up-a-development-environment)

That will probably mean installing JDK 21 and IntelliJ IDEA.

### Setting up the environment using Nix

Look.

This is setting up JDKs and C libraries on Nix.

It is what it is.

[Here's a flake yoinked and adapted from here:](https://theo.is-a.dev/blog/modding-minecraft-on-nixos/)
```nix
{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-parts.url = "github:hercules-ci/flake-parts";
    systems.url = "github:nix-systems/default";
  };

  outputs = inputs:
    inputs.flake-parts.lib.mkFlake { inherit inputs; } {
      systems = import inputs.systems;
      perSystem = { pkgs, lib, ... }:
        let
          libs = with pkgs; [
            # GL
            libGL
            glfw-wayland-minecraft

            # audio
            libpulseaudio
            openal

            xorg.libX11
            xorg.libXcursor
          ];
        in
        {
          devShells.default = pkgs.mkShell {
            nativeBuildInputs = [
              pkgs.jetbrains.jdk
            ];

            buildInputs = libs;
            LD_LIBRARY_PATH = lib.makeLibraryPath libs;

            env = {
              JAVA_HOME = "${pkgs.jetbrains.jdk}/lib/openjdk/";
            };
          };
        };
    };
}
```

It works to get up to running the project, at the very least.

### Starting the project

[Fabric provides a Template mod generator.](https://fabricmc.net/develop/template/)

Given a name, a mod ID, a Minecraft version, and some checkboxes for Kotlin
support or different mappings, it will generate a zip file of source for you.

[Fairly sure that this is just their example mod with some values input for you.](https://github.com/FabricMC/fabric-example-mod)

For what they call "Manual Setup", clone the example mod and update the
settings manually.

## `main` vs `client`

There is a notion in Fabric of "main" logic and "client" logic.

Main logic is for anything which would run on both a client and a server.

This is for things like new blocks, mobs, loot tables, or crafting recipes.

Client logic is for anything which would only go on the client side.

This is for things like the GUI, rendering, or key handlers.

## Project structure

[See the Fabric documentation on project structure.](https://docs.fabricmc.net/develop/getting-started/project-structure)

### `fabric.mod.json`

Is the top-level file describing the project to the mod loader.

This is similar to a [[Node]] `package.json`.

This file contains an `id` field and a `name` field for your mod.

It also describes some more stuff.

#### Entrypoints

There is an `entrypoints` field in the `fabric.mod.json`.

There are two types of entrypoint, `main` and `client`, described above.

Each entrypoint is the name of a class.

These classes each extend Fabric's `ModInitializer` and `ClientModInitializer`
for `main` and `client` respectively.

Main entrypoints override the base class's `onInitialize()` method. Client
entrypoints override the base class's `onInitializeClient()` method.

Stolen from the documentation, here's a main entrypoint class:
```java
public class FabricDocsReference implements ModInitializer {
	// This logger is used to write text to the console and the log file.
	// It is considered best practice to use your mod id as the logger's name.
	// That way, it's clear which mod wrote info, warnings, and errors.
	public static final String MOD_ID = "fabric-docs-reference";
	public static final Logger LOGGER = LoggerFactory.getLogger(MOD_ID);

	@Override
	public void onInitialize() {
		// This code runs as soon as Minecraft is in a mod-load-ready state.
		// However, some things (like resources) may still be uninitialized.
		// Proceed with mild caution.

		LOGGER.info("Hello Fabric world!");
	}
}
```

### `src`

The `src` directory is structured like:

```
src
├── client
│   ├── java
│   │   └── com
│   │       └── my-mod-name
│   │           └── my-mod-id
│   │               ├── MyModClient.java
│   │               └── mixin
│   │                   └── client
│   │                       └── ExampleClientMixin.java
│   └── resources
│       └── mymod.client.mixins.json
└── main
    ├── java
    │   └── com
    │       └── my-mod-name
    │           └── my-mod-id
    │               ├── Dispense.java
    │               └── mixin
    │                   └── ExampleMixin.java
    └── resources
        ├── assets
        │   └── my-mod-name
        │       └── icon.png
        ├── my-mod.mixins.json
        └── fabric.mod.json
```

Here the `client` and `main` directories contain resources like images &
sounds, and source code under the `java` directory.

## Starting the mod

Use `./gradlew runClient` to run a client and `./gradlew runServer` to run a server.

