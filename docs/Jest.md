---
tags:
  - jest
  - javascript
  - typescript
  - development
  - web
---

# Jest

[Jest](https://jestjs.io/) is a common testing framework for [[JavaScript]] and [[TypeScript]] projects.

## Configuration

### TypeScript

You can run Jest tests written in TypeScript with either Babel or `ts-jest`.

#### Using Babel

Install all of Babel's dependencies:
```shell
npm install -D babel-jest @babel/core @babel/preset-env @babel/preset-typescript
```

#### Using `ts-jest`

To set up `ts-jest`:
```shell
# Install ts-jest
npm install -D jest typescript ts-jest @types/jest

# Init a config
npx ts-jest config:init
```

If the initial config doesn't work, try:
```shell
npx jest --init
```

Then set the `preset` option to `"ts-jest"`.

See [Using TypeScript from the Jest documentation](https://jestjs.io/docs/getting-started#using-typescript)

### Ignore files Jest configuration

Regardless of option, you will probably want to ignore tests in your `outDir`.

You can ignore directories or files with `testPathIgnorePatterns`.

```js
module.exports = {
  ...,
  testPathIgnorePatterns: [
    "/.direnv/",
    "/node_modules/",
    "/dist/",
    "/.{git,cache,output,temp}/",
    "/.config/",
  ],
};
```


## Usage

### Mocking

#### Spies

[Mock functions (AKA spies)](https://jestjs.io/docs/mock-function-api) are functions with no implementation created by Jest for tracking usages. This is especially useful for testing code with good separation of responsibilities, as the implementation of the function is generally not required.

Take a *very* simple function:
```js
function print(content, printer) {
	if (!content) {
		return;
	}

	printer.send(content);
}
```

Since this is not responsible for the printer itself, that part can be mocked entirely in tests.
```js
describe('print', () => {
	it('attempts to print when given some content', () => {
		const mockPrinter = { send: jest.fn() };
		print('content', mockPrinter);
		expect(mockPrinter.send).toHaveBeenCalledWith('content');
	});

	it('does not print when given no content', () => {
		const mockPrinter = jest.fn({ send: jest.fn() });
		print(undefined, mockPrinter);
		expect(mockPrinter.send).not.toHaveBeenCalled();
	});
});
```

**NOTE:**
In the example, there are two instances of `mockPrinter`, one for each test.
[If there was only one, it would need to be cleared between tests.](https://jestjs.io/docs/mock-function-api#mockfnmockclear)

*[See Clearing mocks for more info.](#Clearing%20mocks)*

#### Clearing mocks

Usage information like calls and instances are kept per-mock from `jest.fn()`.
This means that between tests, mocks will hold information about previous tests, which is often undesirable behaviour.

```js
describe('buy', () => {
	const redirect = jest.fn();

	it('redirects users to their cart', () => {
		buy('banana', redirect);
		expect(redirect).toHaveBeenCalledWith('cart');
	});

	it('does not redirect users when nothing happens', () => {
		// Failure! redirect has already been called!
		expect(redirect).not.toHaveBeenCalled();
	});
});
```

There are several ways to clear mocks, but the most often used is [`jest.clearAllMocks()`](https://jestjs.io/docs/jest-object#jestclearallmocks).
This is often used in conjunction with `beforeEach()`, to clear mocks before running each test:
```js
describe('buy', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	/* Use your imagination 🌈 */
});
```
If you find this is often required, [there is an option to configure this in the wider jest configuration](https://jestjs.io/docs/configuration#clearmocks-boolean).

Most rarely, mocks [can be cleared individually using `.mockClear()`](https://jestjs.io/docs/mock-function-api#mockfnmockclear):
```js
describe('queue', () => {
	const callback = jest.fn();
	const queue = new Queue('a', 'b', 'c');

	it('dequeues and calls the callback', () => {
		queue.dequeue(callback);

		expect(callback).toHaveBeenCalledWith('c');
	});

	it('enqueues and calls the callback', () => {
		callback.mockClear();
		queue.enqueue('d', callback);
		expect(callback).toHaveBeenCalledWith('d');
	});
});
```
#### Mocking third party libraries

Mocking out third party libraries is often necessary when dealing with testing logic with consequences, like payment, authentication, etc.

This is generally done in one of two ways:

1. [`jest.mock()`](https://jestjs.io/docs/jest-object#jestmockmodulename-factory-options) - useful for if you don't need any original functionality, unit tests
2. [`jest.spyOn()`](https://jestjs.io/docs/jest-object#jestspyonobject-methodname) - for when you do need the original functionality, integration tests

See [Configuring Jest · Jest](https://jestjs.io/docs/configuration#testpathignorepatterns-arraystring)

