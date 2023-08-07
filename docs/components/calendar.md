<h1 align="center">Calendar</h1>

<p align="center">
    <a href="/src/react-chayns-calendar/component/Calendar.jsx">Source</a>
</p>

An interactive grid calendar that can highlight specified dates.

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
import { Calendar } from 'chayns-components';

// ...

<Calendar {...} />
```

## Props

The `Calendar`-component takes the following props:

| Name                            | Type                                                                                    | Default      | Required |
| ------------------------------- | --------------------------------------------------------------------------------------- | ------------ | :------: |
| [startDate](#startdate)         | `Date`                                                                                  |              |          |
| [endDate](#enddate)             | `Date`                                                                                  |              |          |
| [onDateSelect](#ondateselect)   | `function`                                                                              |              |          |
| [onMonthSelect](#onmonthselect) | `function`                                                                              |              |          |
| [selected](#selected)           | `Date`                                                                                  | `new Date()` |          |
| [activated](#activated)         | `Array<Date>`                                                                           |              |          |
| [highlighted](#highlighted)     | `{ dates: Array<Date>, color: string } \| Array<{ dates: Array<Date>, color: string }>` |              |          |
| [categories](#categories)       | `Array<{ date: Date \| string, color: string }>`                                        |              |          |
| [circleColor](#circlecolor)     | `string`                                                                                |              |          |
| [activateAll](#activateall)     | `boolean`                                                                               | `true`       |          |
| [style](#style)                 | `{ [key: string]: string \| number }`                                                   |              |          |
| [className](#classname)         | `string`                                                                                |              |          |

### `startDate`

```ts
startDate?: Date
```

Defines the first month that will be displayed.

---

### `endDate`

```ts
endDate?: Date
```

Defines the last month that will be displayed.

---

### `onDateSelect`

```ts
onDateSelect?: function
```

This callback is called when the user clicks on a date in the calendar.

---

### `onMonthSelect`

```ts
onMonthSelect?: function
```

This callback is called when the currently selected month changes

---

### `selected`

```ts
selected?: Date
```

The currently selected date as a JavaScript `Date` element.

---

### `activated`

```ts
activated?: Array<Date>
```

This array defines the active dates. Has no effect when `activeAll` is true.

---

### `highlighted`

```ts
highlighted?: { dates: Array<Date>, color: string } | Array<{ dates: Array<Date>, color: string }>
```

This prop is used to highlight dates. It takes object in the form of
`{ dates: [...<date objects>], color: '<css color>' }`, either supplied directly
or in an array.

---

### `categories`

```ts
categories?: Array<{ date: Date | string, color: string }>
```

This prop is used to add a small category marker for a day

---

### `circleColor`

```ts
circleColor?: string
```

Circle color of selected day

---

### `activateAll`

```ts
activateAll?: boolean
```

Activate all dates.

---

### `style`

```ts
style?: { [key: string]: string | number }
```

A React style object that is applied to the root `<div>`-element.

---

### `className`

```ts
className?: string
```

A classname that is applied to the root `<div>`-element.
