---
id: Extract constructor parameters TypeScript
date: "27 August, 2025"
---

# Extract constructor parameters TypeScript

Use the `ConstructorParameters` utility type.

```ts
type Collar = {
    color: string;
}

class Dog {
    private name: string;
    private collar: Collar;

    constructor(name: string, collar: Collar) {
        this.name = name;
        this.collar = collar;
    }

    public speak() {
        return "woof!";
    }

    public inspect() {
        return `Name: ${this.name}, wearing a ${this.collar.color} collar`;
    }
}

const jerome = new Dog("Jerome", { color: "gray" });
jerome.inspect();

// 👇
// [name: string, collar: Collar]
type DogParameters = ConstructorParameters<typeof Dog>;
```

See [ConstructorParameters in the TypeScript documentation.](https://www.typescriptlang.org/docs/handbook/utility-types.html#constructorparameterstype)
