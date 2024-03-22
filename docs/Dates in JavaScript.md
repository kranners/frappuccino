---
tags: dates, times, timezone, javascript, typescript
---

# Date

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
- [Adobe's @internationalized/date](https://react-spectrum.adobe.com/internationalized/date/)
- [marnusw's date-fns-tz](https://github.com/marnusw/date-fns-tz)
- [dayjs](https://day.js.org/docs/en/plugin/timezone)

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

### `Temporal`

[Temporal](https://tc39.es/proposal-temporal/docs/) is a proposed new namespace to be added into [[ECMAScript]], which hopes to fix the glaring issues with the Date prototype.

### Moment.js

[Moment.js](https://github.com/moment/moment/) was previously the go-to standard library for using dates in [[JavaScript]].

It has since [been thoroughly deprecated](https://momentjs.com/docs/#/-project-status/), to the point where Moment.js themselves recommend abandoning the project.

For modern date libraries:
- If you're looking for a more drop-in replacement, [pick Day.js](https://github.com/iamkun/dayjs/#usage-trend)
- If you get to pick a new one, pick [Adobe Internationalized](https://react-spectrum.adobe.com/internationalized/date/)
- If the vanilla JS Date is good enough, [pick date-fns](https://date-fns.org/)
