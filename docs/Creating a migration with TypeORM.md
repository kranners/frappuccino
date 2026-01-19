---
id: Creating a migration with TypeORM
date: "19 January, 2026"
---

# Creating a migration with TypeORM

A migration in TypeORM means a SQL query made to sync an existing schema with
the one in source.

To auto-generate migrations for your entities, [use the TypeORM CLI](https://typeorm.io/docs/advanced-topics/using-cli/#manage-migrations).

Like:
```shell
typeorm migration:generate -- -d ./dataSource.js ./path/to/NameOfMigration.ts
```

_Where `./dataSource.js` is a path to your data source._ 

_And where `./path/to/NameOfMigration.ts` is the desired path to the migration._

This command will generate a new file under
`./path/to/1584188553162-NameOfMigration.ts`, the timestamp given there is an
example.

[See the TypeORM documentation regarding migrations](https://typeorm.io/docs/migrations/why).

