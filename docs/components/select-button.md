<div align="center"><h1>SelectButton</h1></div>

A choose button that opens a selection dialog when clicked.

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
import { SelectButton } from 'chayns-components';

// ...

<SelectButton {...} />
```

## Props

The `SelectButton`-component takes the following props:

| Name                                    | Type                                  | Default        | Required |
| --------------------------------------- | ------------------------------------- | -------------- | :------: |
| [onSelect](#onselect)                   | `function`                            |                |          |
| [title](#title)                         | `string`                              | `''`           |          |
| [description](#description)             | `string`                              | `''`           |          |
| [disabled](#disabled)                   | `boolean`                             | `false`        |          |
| [label](#label)                         | `string`                              | `'Select'`     |          |
| [list](#list)                           | `Array<object>`                       |                |    ✓     |
| [listKey](#listkey)                     | `string`                              | `'name'`       |          |
| [listValue](#listvalue)                 | `string`                              | `'value'`      |          |
| [selectedFlag](#selectedflag)           | `string`                              | `'isSelected'` |          |
| [multiSelect](#multiselect)             | `boolean`                             | `false`        |          |
| [quickFind](#quickfind)                 | `boolean`                             | `false`        |          |
| [className](#classname)                 | `string`                              |                |          |
| [style](#style)                         | `{ [key: string]: number \| string }` |                |          |
| [showSelection](#showselection)         | `boolean \| number`                   | `true`         |          |
| [showListSelection](#showlistselection) | `boolean`                             | `true`         |          |
| [stopPropagation](#stoppropagation)     | `boolean`                             | `false`        |          |

### `onSelect`

```ts
onSelect?: function
```

A callback that is invoked when the selection has changed.

---

### `title`

```ts
title?: string
```

A string that will be shown as a title in the selection dialog.

---

### `description`

```ts
description?: string
```

A string that will be shown as a description in the selection dialog.

---

### `disabled`

```ts
disabled?: boolean
```

Disables any user interaction and renders the button in a disabled style.

---

### `label`

```ts
label?: string
```

The content of the button.

---

### `list`

```ts
list: Array<object>
```

An array of items to select from. Items are provided in an object shape.

---

### `listKey`

```ts
listKey?: string
```

The property name of the list item objects that will uniquely identify each one.

---

### `listValue`

```ts
listValue?: string
```

The property name of the list item objects that will be shown as its name in the
selection dialog.

---

### `selectedFlag`

```ts
selectedFlag?: string
```

The property name of the list item objects that mark an item as selected.

---

### `multiSelect`

```ts
multiSelect?: boolean
```

Wether multiple options can be selected.

---

### `quickFind`

```ts
quickFind?: boolean
```

Wether a search field should be shown in the selection dialog.

---

### `className`

```ts
className?: string
```

A classname string that will be applied to the button.

---

### `style`

```ts
style?: { [key: string]: number | string }
```

A React style object that will be applied ot the button

---

### `showSelection`

```ts
showSelection?: boolean | number
```

Wether the current selection should be shown in the button. Use a number to
specify the maximum amount of items selected.

---

### `showListSelection`

```ts
showListSelection?: boolean
```

Wether the current selection should be shown in the dialog list.

---

### `stopPropagation`

```ts
stopPropagation?: boolean
```

Wether to stop propagation of click events to parent elements.
