<div align="center"><h1>OpeningTimes</h1></div>

An input for opening times.

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
import { OpeningTimes } from 'chayns-components';

// ...

<OpeningTimes {...} />
```

## Props

The `OpeningTimes`-component takes the following props:

| Name                          | Type                                                                        | Default                          | Required |
| ----------------------------- | --------------------------------------------------------------------------- | -------------------------------- | :------: |
| [times](#times)               | `Array<{ weekDay: number, start: string, end: string, disabled: boolean }>` |                                  |    ✓     |
| [onChange](#onchange)         | `function`                                                                  |                                  |          |
| [className](#classname)       | `string`                                                                    |                                  |          |
| [style](#style)               | `{ [key: string]: string \| number }`                                       |                                  |          |
| [forceMobile](#forcemobile)   | `boolean`                                                                   | `false`                          |          |
| [hintPosition](#hintposition) | `enum`                                                                      | `OpeningTimes.hintPositions.TOP` |          |
| [hintText](#hinttext)         | `string`                                                                    | `''`                             |          |

### `times`

```ts
times: Array<{ weekDay: number, start: string, end: string, disabled: boolean }>
```

An array of the timespans that are opening hours.

---

### `onChange`

```ts
onChange?: function
```

Called after the user has changed the opening times. Receives the modified times
as its first parameter.

---

### `className`

```ts
className?: string
```

A classname string that will be applied to the root container.

---

### `style`

```ts
style?: { [key: string]: string | number }
```

A React style object that will be applied to the root container.

---

### `forceMobile`

```ts
forceMobile?: boolean
```

Wether to force a mobile view.

---

### `hintPosition`

```ts
hintPosition?: enum
```

The hint position. Possible values are `OpeningTimes.hintPositions.NONE`,
`OpeningTimes.hintPositions.TOP` and `OpeningTimes.hintPositions.BOTTOM`.

---

### `hintText`

```ts
hintText?: string
```

The text to be shown inside of the hint.
