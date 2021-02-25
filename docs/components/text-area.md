<h1 align="center">TextArea</h1>

<p align="center">
    <a href="src/react-chayns-textarea/component/TextArea.jsx">Source</a>
</p>

A multiline text input that can automatically grow with its content.

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
import { TextArea } from 'chayns-components';

// ...

<TextArea {...} />
```

## Props

The `TextArea`-component takes the following props:

| Name                                | Type                                  | Default                   | Required |
| ----------------------------------- | ------------------------------------- | ------------------------- | :------: |
| [style](#style)                     | `{ [key: string]: string \| number }` |                           |          |
| [disabled](#disabled)               | `boolean`                             | `false`                   |          |
| [className](#classname)             | `string`                              |                           |          |
| [placeholder](#placeholder)         | `string`                              |                           |          |
| [required](#required)               | `boolean`                             |                           |          |
| [design](#design)                   | `number`                              | `TextArea.DEFAULT_DESIGN` |          |
| [onChange](#onchange)               | `function`                            |                           |          |
| [onBlur](#onblur)                   | `function`                            |                           |          |
| [defaultValue](#defaultvalue)       | `string`                              |                           |          |
| [value](#value)                     | `string`                              |                           |          |
| [onKeyUp](#onkeyup)                 | `function`                            |                           |          |
| [onKeyDown](#onkeydown)             | `function`                            |                           |          |
| [autogrow](#autogrow)               | `boolean`                             |                           |          |
| [reference](#reference)             | `function`                            |                           |          |
| [stopPropagation](#stoppropagation) | `boolean`                             | `false`                   |          |

### `style`

```ts
style?: { [key: string]: string | number }
```

A React style object that will be applied to the text area.

---

### `disabled`

```ts
disabled?: boolean
```

Wether the component ignores any user interaction and is rendered with a
disabled style.

---

### `className`

```ts
className?: string
```

A classname string that will be applied to the `<textarea>`-element.

---

### `placeholder`

```ts
placeholder?: string
```

A placeholder, that will be displayed if the text area is empty.

---

### `required`

```ts
required?: boolean
```

Wether the text area is required for a form to complete. Renders the text area
with an error style when its empty.

---

### `design`

```ts
design?: number
```

The design of the input. Use either `TextArea.DEFAULT_DESIGN` or
`TextArea.BORDER_DESIGN`.

---

### `onChange`

```ts
onChange?: function
```

A callback that is invoked when the value of the `<textarea>` changes.

---

### `onBlur`

```ts
onBlur?: function
```

A callback that is invoked when the text area loses focus.

---

### `defaultValue`

```ts
defaultValue?: string
```

The default value of the text area. Has no effect when the `value` prop is used.

---

### `value`

```ts
value?: string
```

The current text value of the area.

---

### `onKeyUp`

```ts
onKeyUp?: function
```

A callback that will be called when the `keyup`-event is fired from the
`<textarea>`-element.

---

### `onKeyDown`

```ts
onKeyDown?: function
```

A callback that will be called when the `keydown`-event is fired from the
`<textarea>`-element.

---

### `autogrow`

```ts
autogrow?: boolean
```

Wether the text area should automatically grow with its content.

---

### `reference`

```ts
reference?: function
```

A function that will be invoked with a reference to the `<textarea>`-element or
`null`.

---

### `stopPropagation`

```ts
stopPropagation?: boolean
```

Wether click events should be stopped from propagating to parent elements.
