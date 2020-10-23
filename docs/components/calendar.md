<div align="center"><h1>Calendar</h1></div>

Displays a grid calendar with the ability to react to user interaction and
highlight certain dates.

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

| Name                          | Type                                   | Default                                       | Required |
| ----------------------------- | -------------------------------------- | --------------------------------------------- | :------: |
| [startDate](#startdate)       | `Date`                                 |                                               |          |
| [endDate](#enddate)           | `Date`                                 |                                               |          |
| [onDateSelect](#ondateselect) | `function`                             |                                               |          |
| [selected](#selected)         | `Date`                                 | `new Date()`                                  |          |
| [activated](#activated)       | `Array<Date>`                          |                                               |          |
| [highlighted](#highlighted)   | `{ dates: Array<Date>, color: string } | Array<{ dates: Array<Date>, color: string }>` |          |  |
| [activateAll](#activateall)   | `boolean`                              | `true`                                        |          |
| [style](#style)               | `{ [key: string]: string               | number }`                                     |          |  |
| [className](#classname)       | `string`                               |                                               |          |

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
