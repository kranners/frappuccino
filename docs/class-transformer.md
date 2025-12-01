---
id: class-transformer
date: "01 December, 2025"
---

# class-transformer

[`class-transformer`](https://github.com/typestack/class-transformer?tab=readme-ov-file#what-is-class-transformer)
is a [[Node]] library for parsing raw objects into instances of classes.

```typescript
class Fruit {
    id: number;
    name: string;

    price: number;
}

// Pretend this is coming from an API or something
const fetchFruit = () => ({
    id: 0,
    name: "Apple",
    price: 1.5,
});

const fruitData = fetchFruit();

import { plainToInstance } from "class-transformer";

// Fruit instance
const apple = plainToInstance(Fruit, fruitData);
```

This does a similar function to [[zod]], with the ability to add additional
validation and processing steps to handling objects and models.

_(For validation, see Advanced Usage)_.

However, differently to [[zod]], `class-transformer` builds instances of
classes - which class-transformer calls _instances_ instead of leaving the
objects as-is, which class-transformer calls _plain_.

## Installation

Install the required packages:
```shell
npm install class-transformer reflect-metadata
```

If you're using an old [[Node]] version, then also:
```shell
npm install es6-shim
```

To your entrypoint, add:
```typescript
import "reflect-metadata";

// If needed
import "es6-shim";
```

To support decorators in TypeScript, you'll need to add to your tsconfig.json:
```json
{
    "compilerOptions": {
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true
    }
}
```

You'll also need to `target` at least `"ES5"`.

## Usage

Basic usage:
```typescript
import { plainToInstance } from "class-transformer";

class User {
    id: number;
    name: string;
}

async function getUser(id: number) {
    const response = await fetch(`/users/${id}`);
    const data = await response.json();

    const user = plainToInstance(User, data);

    return user;
}
```

Removing unknown properties from instances:
```typescript
const user = plainToInstance(User, data, {
    excludeExtraneousValues: true,
});
```

:::warning
If you use `excludeExtraneousValues`, you **MUST** `@Expose()` the properties
that will end up in the final instance.

See below for Advanced usage.

**WORTH NOTING:** _This is the default behaviour of modern [[zod]] versions,
that it will remove extraneous values_
:::

Converting strings to their respective types (like `Date`):
```typescript
import { Type } from "class-transformer";

class Product {
    id: number;

    name: string;
    
    @Type(() => Date)
    listed: Date;

    @Type(() => Boolean)
    stocked: boolean;
}

// Imagine this is coming from an API
const apple = {
    id: 0,
    name: "Apple",
    listed: "2025-12-01T01:09:49.667Z",
    stocked: 0,
}
- [ ] ```

Working with nested types and arrays of children:
```typescript
import { Type } from "class-transformer";

class Fruit {
    name: string;
}

class Basket {
    @Type(() => Fruit)
    fruits: Fruit[]; 

    // The same would be true for
    fruits: Set<Fruit>;
    fruits: Map<string, Fruit>;
}
```

### Advanced usage

#### Exclude and Expose

The `@Exclude()` decorator is used to explicitly mark a property which will not
be included in the transformed instance.

`@Expose()` works inversely, to mark a property which will be included.

For example:

```typescript
import { Exclude, Expose, plainToInstance } from "class-transformer";

// This will by default excl
@Exclude()
class User {
    id: number;

    @Expose()
    name: string;

    @Expose({ name: "age" })
    yearsOld: number;

    @Expose()
    favoriteFood: string;
}

const data = {
    id: 0,
    name: "Elizabeth II",
    yearsOld: 96,
    locale: "en-UK",
}

const user = plainToInstance(User, data, { excludeExtraneousValues: true });

/*
    Note:
    - id is not included in the object, since it is Exclude()d
    - yearsOld becomes age
    - favoriteFood is populated with undefined
    {
        name: "Elizabeth II",
        age: 96,
        favoriteFood: undefined,
    }
*/
console.log(user);
```

You can be very fancy, and `Expose()` things based on API versions, user
groups, etc.

#### Validation using `class-validator`

`class-transformer` does not do validation out of the box.

[For that, you want the helper library `class-validator`.](https://github.com/typestack/class-validator)

Install like:
```shell
npm i class-validator
```

Use like:
```typescript
import { Exclude, Expose, plainToInstance } from "class-transformer";
import { MaxLength, IsEmail, validate, validateOrReject, validateSync } from "class-validator";

class Post {
    @MaxLength(20)
    title: string;

    @MinLength(10, { message: "Your post has to have content in it!" })
    text: string;

    @IsEmail()
    email: string;
}

const RAW_POST = {
    title: "Proident duis reprehenderit dolor officia est voluptate nostrud consectetur ad",
    text: ""
    email: "hi! :)" ,
}

async function getPost() {
    const post = plainToInstance(Post, RAW_POST);

    // Method 1: Using validate()
    const errors = await validate(post);

    if (errors.length === 0) {
        // Validation passed! 🎉
        return post;
    }
}
```

The `validate`, `validateOrReject` or `validateSync` functions all take in the same signature.

[You can see the latest here](https://github.com/typestack/class-validator?tab=readme-ov-file#passing-options).

At time of writing, this is:
```typescript
type ValidatorOptions {
  skipMissingProperties?: boolean;
  whitelist?: boolean;
  forbidNonWhitelisted?: boolean;
  groups?: string[];
  dismissDefaultMessages?: boolean;
  validationError?: {
    target?: boolean;
    value?: boolean;
  };

  // class-validator recommends to not change these from their default!
  forbidUnknownValues?: boolean;
  stopAtFirstError?: boolean;
}
```

[For an exhaustive list of validation decorators, see their README.](https://github.com/typestack/class-validator?tab=readme-ov-file#validation-decorators)

