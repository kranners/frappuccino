---
tags: dates, times, timezone, javascript, typescript
---

## Date

Times are represented in native [[JavaScript]] with the [`Date` object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date).

For things not covered by the native Date, see [[date-fns]].

#### Syntax

```js
new Date()
new Date(dateString)
new Date(dateObject)

new Date(year, monthIndex)
new Date(year, monthIndex, day, ...)
```

Example:

```js
// Will get the system's current date/time as UTC
const now = new Date();

// Can pass in specific values to make a specific date
// Months are 0-indexed
const birthday = new Date(1999, 8, 15);
```

`Date`s can be constructed with specific times as well.

## Date parsing

Sometimes you'll be given a value, and need to convert that into a Date object.
Unfortunately, outside of the [Date time string format](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#date_time_string_format) this is not guaranteed support at all.

This means that you'll often be required to parse your own string, into a date.

## Timezones

Timezones are a bastard, and always have been in [[JavaScript]].

For dealing with them, you could go down the native `Intl` route (if supported) or the library route.

Some libraries include:
- [Adobe's @internationalized/date](https://discord.com/channels/@me/1115862362860302347/1131427716491649086)
- [marnusw's date-fns-tz](https://discord.com/channels/@me/1115862362860302347/1131427852294832178)

#### Print a Date in a given timezone

You can specify custom behaviour for printing out Date objects using the [`Intl.DateTimeFormat` builtin](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options).

Example:

```js
const now = new Date();

const local = new Intl.DateTimeFormat('en-GB', { 
	timeZone: 'Australia/Melbourne',
	dateStyle: 'full',
	timeStyle: 'long'
});

// 'Thursday, 20 July 2023 at 13:41:16 GMT+10'
local.format(date);
```

#### Get current browser timezone

To get the current browser [[Timezone]], use the [`Intl` builtin `resolvedOptions()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/resolvedOptions).

```js
// Australia/Melbourne
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
```
