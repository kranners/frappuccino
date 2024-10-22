---
id: Jest test concurrency
aliases:
  - Jest test concurrency
tags: []
---

# Jest test concurrency

### Worker pool

[By default Jest executes its tests in a pool of child processes that run the `jest-worker` package.](https://github.com/jestjs/jest/blob/main/packages/jest-worker/README.md)

You can install and run the jest-worker package, to have a deeper control of the processes.

If on Node >= `v22.9.0`, then you may consider using [the new, experimental native worker threads.](https://nodejs.org/api/worker_threads.html)
[See section on experiental worker threads in jest-worker.](https://github.com/jestjs/jest/blob/main/packages/jest-worker/README.md#experimental-worker)

[The number of workers to be run is defined by this file in the source for the jest-config package.](https://github.com/jestjs/jest/blob/77744a24816d0978b6c478987426c36d615864bd/packages/jest-config/src/get_max_workers.js)

It's essentially:

- Exactly 1 if `--runInBand` is provided
- Exactly N if `--maxWorkers=N` is provided
- A percentage of CPU cores if `--maxWorkers=N%` is provided. (Like `--maxWorkers=80%` for 80% of the cores as workers)
- If nothing is provided, max CPUs minus 1 for non-watch mode, and 50% CPUs for watch mode.

### Sharding

Tests can be broken into distinct groups by using the builtin sharding.

To run a test suite with sharding, provide the `--shard=A/B` argument, where:

- `A` is the shard number to be run
- `B` is the total number of shards

Like:

```shell
# Split into three shards
npx jest --shard=1/3
npx jest --shard=2/3
npx jest --shard=3/3
```

[See the documentation on the `--shard` argument](https://jestjs.io/docs/cli#--shard)

#### Test sequencers

How the tests are ordered and how the shards are split and sequenced depends on your `TestSequencer`.
A test sequencer is a class which extends `@jest/test-sequencer`s `Sequencer` base class.

It can be configured with a path to the file which provides a CJS export of the sequencer, like:

```js
/** @type {import('jest').Config} */
const config = {
  testSequencer: "path/to/custom-sequencer.js",
};

module.exports = config;
```

[The default test sequencer source can be found here under `jest-test-sequencer`.](https://github.com/jestjs/jest/blob/main/packages/jest-test-sequencer/src/index.ts#L52)

### Concurrency

Tests can be marked to run concurrently using `it.concurrent()` (or `test.concurrent()`, aliases).

#### Current issues

Concurrent tests do not currently support `beforeEach()`, `afterEach()` or `expect.assertions`.
[See here for the Jest tracker for concurrency-specific issues.](https://github.com/jestjs/jest/labels/Area%3A%20Concurrent)

Test cases being run concurrently must be asynchronous.

```js
test.concurrent("addition of 2 numbers", async () => {
  expect(5 + 3).toBe(8);
});
```

This can also be used with `.each()`, like:

```js
test.concurrent.each([
  [1, 1, 2],
  [1, 2, 3],
  [2, 1, 3],
])(".add(%i, %i)", async (a, b, expected) => {
  expect(a + b).toBe(expected);
});
```
