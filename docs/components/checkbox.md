<div align="center"><h1>Checkbox</h1></div>

A `<input type="checkbox">` component. Can also act as a switch.

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
import { Checkbox } from 'chayns-components';

// ...

<Checkbox {...} />
```

## Props

The `Checkbox`-component takes the following props:

| Name                                        | Type                     | Default           | Required |
| ------------------------------------------- | ------------------------ | ----------------- | :------: |
| [style](#style)                             | `{ [key: string]: string | number }`         |          |  |
| [className](#classname)                     | `string`                 |                   |          |
| [labelStyle](#labelstyle)                   | `{ [key: string]: string | number }`         |          |  |
| [labelClassName](#labelclassname)           | `string`                 |                   |          |
| [label](#label)                             | `ReactNode               | Array<ReactNode>` |          |  |
| [children](#children)                       | `ReactNode               | Array<ReactNode>` |          |  |
| [onChange](#onchange)                       | `function`               |                   |          |
| [toggleButton](#togglebutton)               | `boolean`                | `false`           |          |
| [checked](#checked)                         | `boolean`                |                   |          |
| [defaultChecked](#defaultchecked)           | `boolean`                |                   |          |
| [disabled](#disabled)                       | `boolean`                | `false`           |          |
| [dangerouslySetLabel](#dangerouslysetlabel) | `{ __html: string }`     |                   |          |
| [stopPropagation](#stoppropagation)         | `boolean`                | `false`           |          |
| [id](#id)                                   | `number                  | string`           |          |  |

### `style`

```ts
style?: { [key: string]: string | number }
```

A React style object that will be applied to the CheckBox element.

---

### `className`

```ts
className?: string
```

A classname string that will be applied to the CheckBox element.

---

### `labelStyle`

```ts
labelStyle?: { [key: string]: string | number }
```

A React style object that will be applied to the label element.

---

### `labelClassName`

```ts
labelClassName?: string
```

A classname string that will be applied to the label element.

---

### `label`

```ts
label?: ReactNode | Array<ReactNode>
```

A label that will be shown next to the CheckBox.

---

### `children`

```ts
children?: ReactNode | Array<ReactNode>
```

A label that will be shown next to the CheckBox.

---

### `onChange`

```ts
onChange?: function
```

This will be called when the state of the CheckBox changes.

---

### `toggleButton`

```ts
toggleButton?: boolean
```

Changes the rendering to a switch-/toggle-style.

---

### `checked`

```ts
checked?: boolean
```

Wether the CheckBox is checked. Makes it a controlled input.

---

### `defaultChecked`

```ts
defaultChecked?: boolean
```

Wether the CheckBox is checked by default. Do not use it with the
`checked`-prop.

---

### `disabled`

```ts
disabled?: boolean
```

Disables any interactions with the CheckBox and changes the style to a disabled
look.

---

### `dangerouslySetLabel`

```ts
dangerouslySetLabel?: { __html: string }
```

Set the contents of the label with a raw HTML string.

---

### `stopPropagation`

```ts
stopPropagation?: boolean
```

Wether to stop propagation of click events.

---

### `id`

```ts
id?: number | string
```

The HTML id of the input element.
