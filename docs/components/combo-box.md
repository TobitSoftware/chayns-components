<h1 align="center">ComboBox</h1>

<p align="center">
    <a href="src/react-chayns-combobox/component/ComboBox.jsx">Source</a>
</p>

A button with a dropdown that contains a scrollable list of distinct values from
which people can choose.

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
import { ComboBox } from 'chayns-components';

// ...

<ComboBox {...} />
```

## Props

The `ComboBox`-component takes the following props:

| Name                                | Type                                  | Default | Required |
| ----------------------------------- | ------------------------------------- | ------- | :------: |
| [onSelect](#onselect)               | `function`                            |         |          |
| [disabled](#disabled)               | `boolean`                             | `false` |          |
| [label](#label)                     | `string`                              |         |          |
| [list](#list)                       | `array`                               |         |    ✓     |
| [listKey](#listkey)                 | `string`                              |         |    ✓     |
| [listValue](#listvalue)             | `string`                              |         |    ✓     |
| [className](#classname)             | `string`                              |         |          |
| [defaultValue](#defaultvalue)       | `string`                              |         |          |
| [stopPropagation](#stoppropagation) | `boolean`                             | `false` |          |
| [parent](#parent)                   | `function \| ReactNode`               |         |          |
| [style](#style)                     | `{ [key: string]: string \| number }` |         |          |
| [value](#value)                     | `string \| number`                    |         |          |

### `onSelect`

```ts
onSelect?: function
```

This callback is called when an item is selected.

---

### `disabled`

```ts
disabled?: boolean
```

Disables any interactions and styles the combobox with a disabled style.

---

### `label`

```ts
label?: string
```

A placeholder value shown inside the combobox.

---

### `list`

```ts
list: array;
```

An array of values to select from.

---

### `listKey`

```ts
listKey: string;
```

The name of the property on the list objects that uniquely identifies an item.

---

### `listValue`

```ts
listValue: string;
```

The name of the property on the list objects that is shown as its name.

---

### `className`

```ts
className?: string
```

A classname string that will be applied to the Button component and the overlay.

---

### `defaultValue`

```ts
defaultValue?: string
```

The default value of the combobox. This does not work in combination with the
`label` or `value` props.

---

### `stopPropagation`

```ts
stopPropagation?: boolean
```

Wether to stop the propagation of click events.

---

### `parent`

```ts
parent?: function | ReactNode
```

The parent component of the combobox overlay.

---

### `style`

```ts
style?: { [key: string]: string | number }
```

A React style object that will be applied to the Button component and the
overlay.

---

### `value`

```ts
value?: string | number
```

The value of the combobox. This does not work in combination with the
` label`-prop.
