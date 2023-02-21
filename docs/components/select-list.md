<h1 align="center">SelectList</h1>

<p align="center">
    <a href="/src/react-chayns-selectlist/component/SelectList.jsx">Source</a>
</p>

A vertical list of radio buttons that reveal content when selected.

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
import { SelectList } from 'chayns-components';

// ...

<SelectList {...} />
```

## Props

The `SelectList`-component takes the following props:

| Name                          | Type                                  | Default | Required |
| ----------------------------- | ------------------------------------- | ------- | :------: |
| [onChange](#onchange)         | `function`                            |         |          |
| [defaultValue](#defaultvalue) | `string \| number`                    |         |          |
| [value](#value)               | `string \| number`                    |         |          |
| [children](#children)         | `ReactNode \| Array<ReactNode>`       |         |          |
| [selectFirst](#selectfirst)   | `boolean`                             |         |          |
| [className](#classname)       | `string`                              |         |          |
| [style](#style)               | `{ [key: string]: number \| string }` |         |          |
| [listId](#listid)             | `string`                              |         |          |

### `onChange`

```ts
onChange?: function
```

A callback that is invoked when the selected item changes.

---

### `defaultValue`

```ts
defaultValue?: string | number
```

Specifies the `SelectItem` that is selected by default with its `id`.

---

### `value`

```ts
value?: string | number
```

The currently selected `SelectItem` by its `id`.

---

### `children`

```ts
children?: ReactNode | Array<ReactNode>
```

The children elements of the list. Should contain `SelectItem` components.

---

### `selectFirst`

```ts
selectFirst?: boolean
```

Wether the first entry should be selected by default. **(deprecated)**

---

### `className`

```ts
className?: string
```

A classname string that will be applied to the container element.

---

### `style`

```ts
style?: { [key: string]: number | string }
```

A React style object

---

### `listId`

```ts
listId?: string
```

The id used for the html attributes of this select list
