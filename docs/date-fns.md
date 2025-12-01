---
id: date-fns
date: "01 December, 2025"
---

# date-fns

[`date-fns`](https://date-fns.org/docs/Getting-Started#introduction) is a library for manipulating native `Date`s in [[JavaScript]]

## Installation

Install the usual way:
```shell
npm install date-fns

# Sibling library for timezone-functions https://github.com/marnusw/date-fns-tz
npm install date-fns-tz

# For an alternative to this that is still under date-fns https://github.com/date-fns/tz
npm install @date-fns/tz
```

## Usage

Stolen from their documentation, use like:
```typescript
import { format, compareAsc } from "date-fns";

// "02/11/2014"
format(new Date(2014, 1, 11), "MM/dd/yyyy");

const dates = [
  new Date(1995, 6, 2),
  new Date(1987, 1, 11),
  new Date(1989, 6, 10),
];

// [
//   Wed Feb 11 1987 00:00:00,
//   Mon Jul 10 1989 00:00:00,
//   Sun Jul 02 1995 00:00:00,
// ]
dates.sort(compareAsc);
```

[For all `format()` options including accepted patterns, see their
documentation.](https://date-fns.org/v4.1.0/docs/format)

[`date-fns` exposes many different constants](https://date-fns.org/v4.1.0/docs/constants), like:
```typescript
// 3600000
millisecondsInHour

// 43200
minutesInMonth

// 365.2425
daysInYear
```

Manipulate dates like:
```typescript
import { sub, add } from "date-fns";

const startTime = new Date(2025, 1, 1);
const eventDurationHours = 6;

const openingTime = sub(startTime, { minutes: 45 });
const closingTime = add(startTime, { hours: eventDurationHours });
```

[Format relative time using their `formatRelative`:](https://date-fns.org/v4.1.0/docs/formatRelative)
```typescript
// "last Thursday at 12:45 AM"
const result = formatRelative(subDays(new Date(), 6), new Date())
```

[For options for `formatRelative`, see the documentation.](https://date-fns.org/v4.1.0/docs/formatRelative#types/FormatRelativeOptions/733)

[Format durations using their `formatDuration`:](https://date-fns.org/v4.1.0/docs/formatDuration)
```typescript
// "9 months 2 days"
formatDuration({ months: 9, days: 2 })
```

For custom format strings

