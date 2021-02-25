<h1 align="center">SearchBox</h1>

<p align="center">
    <a href="/src/react-chayns-searchbox/component/SearchBox.jsx">Source</a>
</p>

An autocomplete input to search through a list of entries.

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
import { SearchBox } from 'chayns-components';

// ...

<SearchBox {...} />
```

## Props

The `SearchBox`-component takes the following props:

| Name                                          | Type                                  | Default | Required |
| --------------------------------------------- | ------------------------------------- | ------- | :------: |
| [onSelect](#onselect)                         | `function`                            |         |          |
| [disabled](#disabled)                         | `boolean`                             | `false` |          |
| [list](#list)                                 | `Array<object>`                       |         |          |
| [listKey](#listkey)                           | `string`                              |         |    ✓     |
| [listValue](#listvalue)                       | `string`                              |         |    ✓     |
| [className](#classname)                       | `string`                              |         |          |
| [defaultValue](#defaultvalue)                 | `string \| number`                    |         |          |
| [stopPropagation](#stoppropagation)           | `boolean`                             | `false` |          |
| [parent](#parent)                             | `function \| ReactNode`               |         |          |
| [style](#style)                               | `{ [key: string]: string \| number }` |         |          |
| [value](#value)                               | `string \| number`                    |         |          |
| [inputValue](#inputvalue)                     | `string`                              |         |          |
| [showListWithoutInput](#showlistwithoutinput) | `boolean`                             | `false` |          |
| [inputDefaultValue](#inputdefaultvalue)       | `string`                              |         |          |
| [onChange](#onchange)                         | `function`                            |         |          |
| [autoSelectFirst](#autoselectfirst)           | `boolean`                             | `false` |          |

### `onSelect`

```ts
onSelect?: function
```

A callback that will be invoked when a value was selected.

---

### `disabled`

```ts
disabled?: boolean
```

Disables any user interaction and renders the search box in a disabled style.

---

### `list`

```ts
list?: Array<object>
```

An array of items to select from.

---

### `listKey`

```ts
listKey: string;
```

The property name of a unique identifier in the `list` items.

---

### `listValue`

```ts
listValue: string;
```

The property name of the name of the `list` items that will be shown in the
dropdown.

---

### `className`

```ts
className?: string
```

A classname string that will be set on the container component.

---

### `defaultValue`

```ts
defaultValue?: string | number
```

The default value of the search box as a key to one of the list items.

---

### `stopPropagation`

```ts
stopPropagation?: boolean
```

Wether to stop propagation of click events to parent elements.

---

### `parent`

```ts
parent?: function | ReactNode
```

A DOM element into which the overlay will be rendered.

---

### `style`

```ts
style?: { [key: string]: string | number }
```

A React style object that will be applied to the outer-most container.

---

### `value`

```ts
value?: string | number
```

The current value of the search box as a key to one of the list items.

---

### `inputValue`

```ts
inputValue?: string
```

The current value of the text input.

---

### `showListWithoutInput`

```ts
showListWithoutInput?: boolean
```

Wether the list should be shown if there is no user input.

---

### `inputDefaultValue`

```ts
inputDefaultValue?: string
```

The default value of the input field. Has no effect when used with the
`inputValue`-prop.

---

### `onChange`

```ts
onChange?: function
```

The `onChange`-callback for the input element.

---

### `autoSelectFirst`

```ts
autoSelectFirst?: boolean
```

Wether the first list item should be automatically selected.
