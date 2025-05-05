![NPM version](https://img.shields.io/npm/v/seconds-util?style=for-the-badge)

This utility helps you with converting to and from time units, as well as displaying a string representation of duration.

```ts
import Seconds from "seconds-util";

const workWeekMs = Seconds.days(5).ms();

Seconds.y().duration().full(); // 1 year
Seconds.d(5).duration().full(); // 5 days

const date = new Date();
date.setDate(date.getDate() + 5);

Seconds.delta(date).duration().full() // In 4 days, 23 h, 59 min, 59 s, 999 ms

// Display duration up to the "days" unit.
Seconds.delta(date).duration().days() // In 5 days

// Lowercase "in" prefix, if preffered.
Seconds.delta(date).duration(false).days() // in 5 days
```
