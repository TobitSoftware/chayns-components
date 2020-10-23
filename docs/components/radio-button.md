<div align="center"><h1>RadioButton</h1></div>

A radio button that allows to select one of multiple options.

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
import { RadioButton } from 'chayns-components';

// ...

<RadioButton {...} />
```

## Props

The `RadioButton`-component takes the following props:

| Name                                | Type                     | Default   | Required |
| ----------------------------------- | ------------------------ | --------- | :------: |
| [id](#id)                           | `string`                 |           |          |
| [name](#name)                       | `string`                 |           |          |
| [checked](#checked)                 | `boolean`                |           |          |
| [onChange](#onchange)               | `function`               |           |          |
| [disabled](#disabled)               | `boolean`                | `false`   |          |
| [children](#children)               | `ReactNode`              |           |          |
| [value](#value)                     | `string                  | number    | boolean` |  |  |
| [className](#classname)             | `string`                 |           |          |
| [stopPropagation](#stoppropagation) | `boolean`                | `false`   |          |
| [style](#style)                     | `{ [key: string]: string | number }` |          |  |

### `id`

```ts
id?: string
```

The HTML id of the `<input>`-element.

---

### `name`

```ts
name?: string
```

Multiple radio buttons with the same name belong to one group. Only one radio
button in a group can be active at a time.

---

### `checked`

```ts
checked?: boolean
```

Wether the radio button is currently active.

---

### `onChange`

```ts
onChange?: function
```

A function that is called when the radio button gets checked. Receives the
`value`-prop as its first argument.

---

### `disabled`

```ts
disabled?: boolean
```

Disables any user interaction and renders the radio button in a disabled style.

---

### `children`

```ts
children?: ReactNode
```

A string or `ReactNode` that will be the label.

---

### `value`

```ts
value?: string | number | boolean
```

A value that will be sent to the `onChange`-callback as its first argument.

---

### `className`

```ts
className?: string
```

A classname string that will be applied to the container element.

---

### `stopPropagation`

```ts
stopPropagation?: boolean
```

Wether to stop propagation of click events to parent elements.

---

### `style`

```ts
style?: { [key: string]: string | number }
```

A React style object that will be applied to the container element.
