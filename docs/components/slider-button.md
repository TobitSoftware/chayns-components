<div align="center"><h1>SliderButton</h1></div>

A linear set of buttons which are mutually exclusive.

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
import { SliderButton } from 'chayns-components';

// ...

<SliderButton {...} />
```

## Props

The `SliderButton`-component takes the following props:

| Name                              | Type                                                         | Default                                                                           | Required |
| --------------------------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------------- | :------: |
| [className](#classname)           | `string`                                                     |                                                                                   |          |
| [style](#style)                   | `{ [key: string]: string \| number }`                        |                                                                                   |          |
| [items](#items)                   | `Array<{ id: string \| number, text: string \| ReactNode }>` | `[ { id: 0, text: 'Auf', }, { id: 1, text: 'Stopp', }, { id: 2, text: 'Zu', }, ]` |          |
| [onChange](#onchange)             | `function`                                                   |                                                                                   |          |
| [onDragStop](#ondragstop)         | `function`                                                   |                                                                                   |          |
| [onDragStart](#ondragstart)       | `function`                                                   |                                                                                   |          |
| [selectedItemId](#selecteditemid) | `number`                                                     | `0`                                                                               |          |
| [disabled](#disabled)             | `boolean`                                                    | `false`                                                                           |          |

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

A React style objec that will be applied to the container element.

---

### `items`

```ts
items?: Array<{ id: string | number, text: string | ReactNode }>
```

An array of option items.

---

### `onChange`

```ts
onChange?: function
```

A callback that is invoked when the selection changes.

---

### `onDragStop`

```ts
onDragStop?: function
```

A callback that is invoked when the user starts dragging the control.

---

### `onDragStart`

```ts
onDragStart?: function
```

A callback that is invoked when the user stops dragging.

---

### `selectedItemId`

```ts
selectedItemId?: number
```

The `id` of the item that should be selected.

---

### `disabled`

```ts
disabled?: boolean
```

Wether the `SliderButton` should ignore user interaction and be rendered in a
disabled style.
