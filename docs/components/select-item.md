<div align="center"><h1>SelectItem</h1></div>

A radio button that expands its content when selected. Should be used inside of
a `SelectList`.

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
import { SelectItem } from 'chayns-components';

// ...

<SelectItem {...} />
```

## Props

The `SelectItem`-component takes the following props:

| Name                          | Type                  | Default | Required |
| ----------------------------- | --------------------- | ------- | :------: |
| [id](#id)                     | `number`              |         |          |
| [className](#classname)       | `string`              | `''`    |          |
| [disabled](#disabled)         | `boolean`             | `false` |          |
| [children](#children)         | `ReactNode`           |         |          |
| [name](#name)                 | `string \| ReactNode` | `''`    |          |
| [value](#value)               | `object \| array`     |         |          |
| [tooltipProps](#tooltipprops) | `object`              |         |          |

### `id`

```ts
id?: number
```

The select item id. It identifies the `SelectItem` for the `defaultValue`- and
`value`-props of the `SelectList`-component and will be given as the first
argument to the `onChange`-callback of the `SelectList`-component.

---

### `className`

```ts
className?: string
```

A classname string that will be applied to the container element.

---

### `disabled`

```ts
disabled?: boolean
```

Disables any user interaction and renders the `SelectItem` in a disabled style.

---

### `children`

```ts
children?: ReactNode
```

The items content that will be revealed when it is selected.

---

### `name`

```ts
name?: string | ReactNode
```

The name of the `SelectItem` that is shown as a label next to its radio button.

---

### `value`

```ts
value?: object | array
```

Any additional info for the item.

---

### `tooltipProps`

```ts
tooltipProps?: object
```

When specified, a `ToolTip`-component will wrap the radio button and these props
will be forwarded.
