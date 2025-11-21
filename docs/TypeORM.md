---
id: TypeORM
date: "19 November, 2025"
---

# TypeORM

[TypeORM is a Node ORM library.](https://typeorm.io/)

## Installation

Install their required packages:
```shell
npm install typeorm reflect-metadata

# For TypeScript, you are probably using that.
npm install -D @types/node
```

To whatever your entrypoint file is, you'll need to add an import for `reflect-metadata`:

_app.ts_
```ts
import "reflect-metadata"
```

You'll also need a DB driver like [Postgres](https://typeorm.io/docs/drivers/postgres/#installation) or [SQLite](https://typeorm.io/docs/drivers/sqlite/#installation).

For [[TypeScript]], add in to your TSConfig support for the decorators:
```json
{
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
}
```

## Usage

TypeORM supports "Data Mapper" and "Active Record" patterns.

_Data Mapper_ means that each table has an associated _repository_ where you do
your DB operations.

_Active Record_ means that each entity is able to perform DB operations on
itself, and the entity model is used for DB reads.

Given a model like:
```ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Fruit {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
}
```

You can make a fruit in the same way, regardless of pattern used:
```ts
const apple = new Fruit();
apple.name = "Apple";
```

Using _data mapper_, you can create, read, destroy fruits like:
```ts
const fruitRepository = dataSource.getRepository(Fruit);

await fruitRepository.save(apple);

await fruitRepository.remove(apple);

const fruits = await fruitRepository.find({ skip: 2, take: 5 });
```

Using _active record_, you can do the same stuff like:
```ts
await apple.save();

await apple.remove();

const fruits = await Fruit.find({ skip: 2, take: 5 });
```

### More advanced patterns

#### EntityManager

An `EntityManager` is like having all the repositories at once.

```ts
import { DataSource } from "typeorm"
import { Fruit } from "./entity/Fruit"

const myDataSource = new DataSource(/*...*/);
const { manager } = myDataSource;

const fruits = await manager.find(Fruit, { id: 1 });
```

[See EntityManager](https://typeorm.io/docs/working-with-entity-manager/working-with-entity-manager/)

#### Query builder

TypeORM entity repositories include methods for building custom queries:
```ts
const myDataSource = new DataSource(/*...*/);

const firstFruit = await dataSource
    .getRepository(Fruit)
    .createQueryBuilder("fruit")
    .where("fruit.id = :id", { id: 1 })
    .getOne()
```

:::note
Parameters in your built queries must be uniquely named.

That is, if you have:
```ts
    .where("fruit.linkedSale = :id", { id: saleId })
    .andWhere("fruit.linkedPriceTag = :id", { id: priceTagId })
```
:::

[See Select using Query Builder](https://typeorm.io/docs/query-builder/select-query-builder)

### Entities

Entities are classes with properties decorated with `typeorm` helper functions.

Each property decorated with a respective `@Column()` decorator will correspond
to a column in the entity table.

```ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Fruit {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    price: number
}
```

The type of each column is automatically determined by the property type, but
you can specify further.

For example, a string is automatically mapped to a `VARCHAR(255)` and a number
to an `INT`. This is database-dependant.

```ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Fruit {
    @PrimaryGeneratedColumn("uuid")
    id: number

    @Column({ length: 50 })
    name: string

    @Column("text")
    review: string

    @Column("double")
    price: number
}
```

[See Entity columns.](https://typeorm.io/docs/entity/entities#entity-columns)
