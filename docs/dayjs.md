---
id: dayjs
date: "28 November, 2025"
---

# dayjs

[Day.js (or `dayjs`) is a Date library designed to replace Moment.](https://day.js.org/en/)

Get started by installing the package as usual:
```shell
npm install dayjs
```

Use like:
```ts
import * as dayjs from 'dayjs';

dayjs().format();
```

If `esModuleInterop` and `allowSyntheticDefaultImports` are `true` in your TSConfig, then import like:
```ts
import dayjs from 'dayjs';

dayjs().format();
```

### Usage

Parsing and formatting a date string:
```typescript
import dayjs from 'dayjs';

// 01:09:49
dayjs("2025-12-01T01:09:49.667Z").format("HH:mm:ss")
```

Parsing and formatting a duration:
```typescript
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

dayjs.duration(2_000, "seconds").format("HH:mm:ss")
```

Logic on dates and times:
```typescript
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(isSameOrAfter);

const isEventStarted = dayjs().isSameOrAfter(startDateTime);
```

