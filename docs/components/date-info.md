<h1 align="center">DateInfo</h1>

<p align="center">
    <a href="/src/react-chayns-dateinfo/component/DateInfo.jsx">Source</a>
</p>

Formats a date or date range to be easily readable and reveals the absolute date
on hover.

## Usage

You should have the `chayns-components` package installed. If that is not the
case already, run

```bash
yarn add chayns-components
```

or

```bash
npm i chayns-components
```

After the `chayns-components` package is installed, you can import the component
and use it with React:

```jsx
import React from 'react'
import { DateInfo } from 'chayns-components';

// ...

<DateInfo {...} />
```

## Props

The `DateInfo`-component takes the following props:

| Name                                          | Type                       | Default                                                                                                       | Required |
| --------------------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------- | :------: |
| [children](#children)                         | `ReactNode`                | `<div />`                                                                                                     |          |
| [language](#language)                         | `string`                   | `isServer() ? 'de' : (chayns.env.language \|\| navigator.language \|\| 'de') .substring(0, 2) .toLowerCase()` |          |
| [date](#date)                                 | `string \| number \| Date` |                                                                                                               |    ✓     |
| [date2](#date2)                               | `string \| number \| Date` |                                                                                                               |          |
| [showTime](#showtime)                         | `boolean`                  |                                                                                                               |          |
| [showDate](#showdate)                         | `boolean`                  |                                                                                                               |          |
| [writeDay](#writeday)                         | `boolean`                  | `false`                                                                                                       |          |
| [writeMonth](#writemonth)                     | `boolean`                  |                                                                                                               |          |
| [noTitle](#notitle)                           | `boolean`                  | `false`                                                                                                       |          |
| [useToday](#usetoday)                         | `boolean`                  |                                                                                                               |          |
| [useTomorrowYesterday](#usetomorrowyesterday) | `boolean`                  |                                                                                                               |          |
| [hideYear](#hideyear)                         | `boolean`                  | `false`                                                                                                       |          |

### `children`

```ts
children?: ReactNode
```

The node the text is written into.

---

### `language`

```ts
language?: string
```

The language of the text as an
[ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) string.

---

### `date`

```ts
date: string | number | Date;
```

The date that should be formatted. If a date range is supplied, this should be
the earier date. You can supply a date as the number of milliseconds since 1970,
ISO-8601 string or via a JavaScript `Date`-object,

---

### `date2`

```ts
date2?: string | number | Date
```

The later date for a date range.

---

### `showTime`

```ts
showTime?: boolean
```

Wether the formatted text should show the time.

---

### `showDate`

```ts
showDate?: boolean
```

Wether the formatted text should show the date.

---

### `writeDay`

```ts
writeDay?: boolean
```

Wether the day of the week should be written out.

---

### `writeMonth`

```ts
writeMonth?: boolean
```

Determines how to write the month. If `true`, the whole name will be written out
("december"), if false only the number will be displayed ("12."), otherwise it
will show the short form of the month ("dec.").

---

### `noTitle`

```ts
noTitle?: boolean
```

Set this to true if the `title`-attribute should not be added to the children.

---

### `useToday`

```ts
useToday?: boolean
```

Wether the component should say "today" if the date matches today.

---

### `useTomorrowYesterday`

```ts
useTomorrowYesterday?: boolean
```

Wether the component should use "tomorrow" and "yesterday".

---

### `hideYear`

```ts
hideYear?: boolean
```

When `true` the year will be omitted from the output, if `null` the year will be
shortened ("20" for 2020). When this is false, the full year will be shown.
