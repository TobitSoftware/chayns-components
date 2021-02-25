<h1 align="center">Input</h1>

<p align="center">
    <a href="/src/react-chayns-input/component/Input.jsx">Source</a>
</p>

A text input that can be validated and decorated with different designs.

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
import { Input } from 'chayns-components';

// ...

<Input {...} />
```

## Props

The `Input`-component takes the following props:

| Name                                | Type                                  | Default                | Required |
| ----------------------------------- | ------------------------------------- | ---------------------- | :------: |
| [className](#classname)             | `string`                              | `''`                   |          |
| [onKeyUp](#onkeyup)                 | `function`                            |                        |          |
| [onKeyDown](#onkeydown)             | `function`                            |                        |          |
| [onEnter](#onenter)                 | `function`                            |                        |          |
| [onChange](#onchange)               | `function`                            |                        |          |
| [onBlur](#onblur)                   | `function`                            |                        |          |
| [onFocus](#onfocus)                 | `function`                            |                        |          |
| [regExp](#regexp)                   | `RegExp`                              |                        |          |
| [style](#style)                     | `{ [key: string]: number \| string }` | `{}`                   |          |
| [placeholder](#placeholder)         | `string`                              | `''`                   |          |
| [value](#value)                     | `string \| number`                    |                        |          |
| [defaultValue](#defaultvalue)       | `string \| number`                    |                        |          |
| [invalid](#invalid)                 | `boolean`                             | `false`                |          |
| [type](#type)                       | `string`                              | `'text'`               |          |
| [inputRef](#inputref)               | `function`                            |                        |          |
| [icon](#icon)                       | `string \| object`                    |                        |          |
| [onIconClick](#oniconclick)         | `function`                            |                        |          |
| [wrapperRef](#wrapperref)           | `function`                            |                        |          |
| [dynamic](#dynamic)                 | `boolean \| number`                   | `false`                |          |
| [customProps](#customprops)         | `object`                              |                        |          |
| [id](#id)                           | `string`                              |                        |          |
| [stopPropagation](#stoppropagation) | `boolean`                             | `false`                |          |
| [required](#required)               | `boolean`                             | `false`                |          |
| [disabled](#disabled)               | `boolean`                             | `false`                |          |
| [clearIcon](#clearicon)             | `boolean`                             | `false`                |          |
| [design](#design)                   | `number`                              | `Input.DEFAULT_DESIGN` |          |
| [iconLeft](#iconleft)               | `string \| object`                    |                        |          |
| [right](#right)                     | `ReactNode`                           |                        |          |
| [invalidMessage](#invalidmessage)   | `string`                              |                        |          |

### `className`

```ts
className?: string
```

A classname string that will be applied to the `<input>`-element

---

### `onKeyUp`

```ts
onKeyUp?: function
```

A callback for the `keyup`-event on the input.

---

### `onKeyDown`

```ts
onKeyDown?: function
```

A callback for the `keyup`-event on the input.

---

### `onEnter`

```ts
onEnter?: function
```

A callback for when the users presses the Enter-key while the input is focused.

---

### `onChange`

```ts
onChange?: function
```

Called when the inputs content was changed. If the `regExp`-prop is set, this
callback receives a second argument indicating wether the input is valid or not.

---

### `onBlur`

```ts
onBlur?: function
```

A callback for the `blur`-event on the input.

---

### `onFocus`

```ts
onFocus?: function
```

A callback for the `focus`-event on the input.

---

### `regExp`

```ts
regExp?: RegExp
```

A regular expression that will check if the input is valid. If the input is not
valid, this component will show it to the user.

---

### `style`

```ts
style?: { [key: string]: number | string }
```

A React style object that is applied to the `<input>`-element.

---

### `placeholder`

```ts
placeholder?: string
```

An animated placeholder that is shown when the input is empty.

---

### `value`

```ts
value?: string | number
```

The current value of the input field.

---

### `defaultValue`

```ts
defaultValue?: string | number
```

The initial value of the input field. Has no effect when using the `value`-prop.

---

### `invalid`

```ts
invalid?: boolean
```

Wether the input should be marked as invalid.

---

### `type`

```ts
type?: string
```

The input type that is set on the `<input>`-element (e.g. `text`, `password`,
etc.)

---

### `inputRef`

```ts
inputRef?: function
```

A funtion that receives the reference to the `<input>`-element.

---

### `icon`

```ts
icon?: string | object
```

An icon that will be shown on the right side of the input. Only applies when
`dynamic` is `true` or the border-design is active.

---

### `onIconClick`

```ts
onIconClick?: function
```

The `onClick`-callback for the `icon`.

---

### `wrapperRef`

```ts
wrapperRef?: function
```

A function that will receive the reference to the wrapper element. This only has
an effect if `dynamic` is `true`.

---

### `dynamic`

```ts
dynamic?: boolean | number
```

When active the placeholder will not disappear on input but rather slide to the
right of the input field to act more like a label. The option can also be
`Input.BOTTOM_DYNAMIC` when the border-design is active.

---

### `customProps`

```ts
customProps?: object
```

Any additional props that will be forwarded to the `<input>`-element.

---

### `id`

```ts
id?: string
```

A HTML id that will be applied to the `<input>`-element.

---

### `stopPropagation`

```ts
stopPropagation?: boolean
```

Wether to stop propagation of click events to parent elements.

---

### `required`

```ts
required?: boolean
```

Wether to mark an empty input as invalid.

---

### `disabled`

```ts
disabled?: boolean
```

Disables any user interaction with the input and renders it with a disabled
style.

---

### `clearIcon`

```ts
clearIcon?: boolean
```

Wether to show a clear icon on the right side of the input when it is not empty.

---

### `design`

```ts
design?: number
```

The design of the input. Use either `Input.DEFAULT_DESIGN` or
`Input.BORDER_DESIGN`.

---

### `iconLeft`

```ts
iconLeft?: string | object
```

An icon that will be shown on the left side of the input when the border-design
is active.

---

### `right`

```ts
right?: ReactNode
```

A string or `ReactNode` that will be rendered on the right side of the input
when the border-design is active.

---

### `invalidMessage`

```ts
invalidMessage?: string
```

An error message that will be shown instead of the placeholder when the
border-design is active and the `dynamic`-prop is set to `Input.BOTTOM_DYNAMIC`.
