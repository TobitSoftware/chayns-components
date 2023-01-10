<h1 align="center">TagInput</h1>

<p align="center">
    <a href="/src/react-chayns-tag_input/component/TagInput.jsx">Source</a>
</p>

A text input that allows values to be grouped as tags.

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
import { TagInput } from 'chayns-components';

// ...

<TagInput {...} />
```

## Props

The `TagInput`-component takes the following props:

| Name                            | Type                                   | Default                   | Required |
| ------------------------------- | -------------------------------------- | ------------------------- | :------: |
| [tags](#tags)                   | `Array<{ text: string \| ReactNode }>` |                           |          |
| [value](#value)                 | `string`                               | `''`                      |          |
| [onAddTag](#onaddtag)           | `function`                             |                           |          |
| [onRemoveTag](#onremovetag)     | `function`                             |                           |          |
| [onChange](#onchange)           | `function`                             |                           |          |
| [placeholder](#placeholder)     | `string`                               |                           |          |
| [className](#classname)         | `string`                               |                           |          |
| [style](#style)                 | `{ [key: string]: string \| number }`  |                           |          |
| [disableRemove](#disableremove) | `boolean`                              | `false`                   |          |
| [design](#design)               | `number`                               | `TagInput.DEFAULT_DESIGN` |          |
| [max](#max)                     | `number`                               |                           |          |
| [addTagOnBlur](#addtagonblur)   | `boolean`                              | `false`                   |          |
| [left](#left)                   | `ReactNode`                            |                           |          |
| [onKeyDown](#onkeydown)         | `function`                             |                           |          |

### `tags`

```ts
tags?: Array<{ text: string | ReactNode }>
```

An array of the current tags.

---

### `value`

```ts
value?: string
```

The text value of the tag input.

---

### `onAddTag`

```ts
onAddTag?: function
```

A callback that is invoked when the user adds a new tag (hits the `enter`-key).

---

### `onRemoveTag`

```ts
onRemoveTag?: function
```

A callback that is invoked when the user removes a tag.

---

### `onChange`

```ts
onChange?: function
```

A callback that is invoked when the user changes the text inside the tag input.

---

### `placeholder`

```ts
placeholder?: string
```

A placeholder that is shown when the tag input is empty (does neither container
a tag or text).

---

### `className`

```ts
className?: string
```

A classname string that will be applied to the outer-most wrapper of the input.

---

### `style`

```ts
style?: { [key: string]: string | number }
```

A React style object that will be applied to the outer-most wrapper of the
input.

---

### `disableRemove`

```ts
disableRemove?: boolean
```

Prevents removal of selected users and hides remove icon.

---

### `design`

```ts
design?: number
```

The design of the input. Use either `TagInput.DEFAULT_DESIGN` or
`TagInput.BORDER_DESIGN`.

---

### `max`

```ts
max?: number
```

The maximum number of tags selected at once.

---

### `addTagOnBlur`

```ts
addTagOnBlur?: boolean
```

Adds a tag on blur

---

### `left`

```ts
left?: ReactNode
```

A string or `ReactNode` that will be rendered on the left side of the tag input.

---

### `onKeyDown`

```ts
onKeyDown?: function
```

A callback for the `keydown`-event.
