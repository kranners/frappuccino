---
id: Lua date and time
aliases:
  - Lua date and time
tags: []
---

# Lua date and time

Format a date (potentially the current date) into a string using the `os.date()` function:

```lua
-- "today is Tuesday, in May"
print(os.date("today is %A, in %B"))
```

`os.date()` takes in two arguments, the format and the time.
The second argument will default to the local OS time.

To produce a table of date values, use the format string `"*t"`

```lua
--  {year = 1998, month = 9, day = 16, yday = 259, wday = 4, hour = 23, min = 48, sec = 10, isdst = false}
os.date("*t", 906000490)
```

Format strings:

```
%a	abbreviated weekday name (e.g., Wed)
%A	full weekday name (e.g., Wednesday)
%b	abbreviated month name (e.g., Sep)
%B	full month name (e.g., September)
%c	date and time (e.g., 09/16/98 23:48:10)
%d	day of the month (16) [01-31]
%H	hour, using a 24-hour clock (23) [00-23]
%I	hour, using a 12-hour clock (11) [01-12]
%M	minute (48) [00-59]
%m	month (09) [01-12]
%p	either "am" or "pm" (pm)
%S	second (10) [00-61]
%w	weekday (3) [0-6 = Sunday-Saturday]
%x	date (e.g., 09/16/98)
%X	time (e.g., 23:48:10)
%Y	full year (1998)
%y	two-digit year (98) [00-99]
%%	the character `%´
```

[For more, see the Lua documentation](https://www.lua.org/pil/22.1.html)
