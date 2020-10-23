<div align="center"><h1>RfidInput</h1></div>

A component to take in an RFID signal.

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
import { RfidInput } from 'chayns-components';

// ...

<RfidInput {...} />
```

## Props

The `RfidInput`-component takes the following props:

| Name                        | Type                                  | Default          | Required |
| --------------------------- | ------------------------------------- | ---------------- | :------: |
| [className](#classname)     | `string`                              |                  |          |
| [style](#style)             | `{ [key: string]: string \| number }` |                  |          |
| [placeholder](#placeholder) | `string`                              | `'Kartennummer'` |          |
| [confirmNode](#confirmnode) | `ReactNode \| Array<ReactNode>`       | `'OK'`           |          |
| [enableScan](#enablescan)   | `boolean`                             | `false`          |          |
| [scanText](#scantext)       | `string`                              | `'Scannen'`      |          |
| [value](#value)             | `string`                              |                  |    ✓     |
| [onInput](#oninput)         | `function`                            |                  |    ✓     |
| [onConfirm](#onconfirm)     | `function`                            |                  |    ✓     |

### `className`

```ts
className?: string
```

A classname string that will be applied to the container element.

---

### `style`

```ts
style?: { [key: string]: string | number }
```

A React style object that will be applied to the container element.

---

### `placeholder`

```ts
placeholder?: string
```

A string that will be shown as the placeholder.

---

### `confirmNode`

```ts
confirmNode?: ReactNode | Array<ReactNode>
```

A string or `ReactNode` that will be the content of the confirm button.

---

### `enableScan`

```ts
enableScan?: boolean
```

Wether to enable the scan-button for scanning a card.

---

### `scanText`

```ts
scanText?: string
```

A string that will be the content of the scan-button.

---

### `value`

```ts
value: string;
```

The input value.

---

### `onInput`

```ts
onInput: function
```

A callback for when the `<input>`-elements content changes.

---

### `onConfirm`

```ts
onConfirm: function
```

This will be called when the RFID input is completed and validated.
