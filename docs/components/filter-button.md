<div align="center"><h1>FilterButton</h1></div>

A chip-like component that is used to filter lists. Usually used in a group of 2
or more.

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
import { FilterButton } from 'chayns-components';

// ...

<FilterButton {...} />
```

## Props

The `FilterButton`-component takes the following props:

| Name                                | Type                     | Default                               | Required |
| ----------------------------------- | ------------------------ | ------------------------------------- | :------: |
| [label](#label)                     | `string                  | ReactNode                             | element` |  |  |
| [count](#count)                     | `number`                 |                                       |          |
| [onChange](#onchange)               | `function`               |                                       |          |
| [checked](#checked)                 | `boolean`                | `false`                               |          |
| [name](#name)                       | `string`                 |                                       |          |
| [value](#value)                     | `any`                    |                                       |          |
| [icon](#icon)                       | `string                  | { iconName: string, prefix: string }` |          |  |
| [className](#classname)             | `string`                 |                                       |          |
| [style](#style)                     | `{ [key: string]: string | number }`                             |          |  |
| [id](#id)                           | `string`                 |                                       |          |
| [disabled](#disabled)               | `boolean`                | `false`                               |          |
| [stopPropagation](#stoppropagation) | `boolean`                | `false`                               |          |
| [small](#small)                     | `boolean`                | `false`                               |          |

### `label`

```ts
label?: string | ReactNode | element
```

A string or `ReactNode` that is shown inside of the filter button.

---

### `count`

```ts
count?: number
```

A number that is shown in bold on the right side of the button.

---

### `onChange`

```ts
onChange?: function
```

A function that will be called when the state of the button changes.

---

### `checked`

```ts
checked?: boolean
```

Wether the button is checked or not.

---

### `name`

```ts
name?: string
```

Multiple filter buttons with the same name belong to one group. Only one of the
buttons in a group can be active at one time.

---

### `value`

```ts
value?: any
```

The value that is provided as the first argument to the `onChanged`-callback
when the `name`-property is set.

---

### `icon`

```ts
icon?: string | { iconName: string, prefix: string }
```

An icon that will be shown in the button. Use a FontAwesome icon like this:
`"fa fa-plane"`.

---

### `className`

```ts
className?: string
```

A classname string that will be set on the `<label>`-element. To change the
color of the filter button give it a class that sets the CSS `color`-attribute,
not `background-color`.

---

### `style`

```ts
style?: { [key: string]: string | number }
```

A React style object that will be applied to the `<label>`-element. To change
the color of the filter button, add a `color`-style attribute to the button, not
`background-color`.

---

### `id`

```ts
id?: string
```

An HTML id that will be set on the (invisible) `<input>`-element. This is given
as the second argument to onChange if `name` is unset.

---

### `disabled`

```ts
disabled?: boolean
```

Disables any interaction and renders the filter button as disabled.

---

### `stopPropagation`

```ts
stopPropagation?: boolean
```

Wether to stop propagation of click events to parent elements.

---

### `small`

```ts
small?: boolean
```

Shrinks the filter button in size.
