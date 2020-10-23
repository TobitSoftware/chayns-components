<div align="center"><h1>EmojiInput</h1></div>

A text field that allows emojis to be put in.

> This component does not work with Internet Explorer.

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
import { EmojiInput } from 'chayns-components';

// ...

<EmojiInput {...} />
```

## Props

The `EmojiInput`-component takes the following props:

| Name                        | Type                                  | Default | Required |
| --------------------------- | ------------------------------------- | ------- | :------: |
| [placeholder](#placeholder) | `string`                              |         |    ✓     |
| [onInput](#oninput)         | `function`                            |         |    ✓     |
| [value](#value)             | `string`                              |         |    ✓     |
| [id](#id)                   | `string`                              |         |    ✓     |
| [hideBorder](#hideborder)   | `boolean`                             | `false` |          |
| [onKeyDown](#onkeydown)     | `function`                            |         |          |
| [disabled](#disabled)       | `boolean`                             | `false` |          |
| [style](#style)             | `{ [key: string]: string \| number }` |         |          |
| [onFocus](#onfocus)         | `function`                            |         |          |
| [onBlur](#onblur)           | `function`                            |         |          |

### `placeholder`

```ts
placeholder: string;
```

Text that will be shown as a placeholder when the input is empty.

---

### `onInput`

```ts
onInput: function
```

This is called when the text changes. There is an additional key on the
`event.target` property called `pureInnerText` which contains the full text
without any of the emoji elements. This is the text you should store in your
local state and pass to this input as the `value`-prop.

---

### `value`

```ts
value: string;
```

The value of the input.

---

### `id`

```ts
id: string;
```

The HTML id to give to the input element.

---

### `hideBorder`

```ts
hideBorder?: boolean
```

Hides the bottom border of the input.

---

### `onKeyDown`

```ts
onKeyDown?: function
```

This will be called on the `keydown`-event of the input element.

---

### `disabled`

```ts
disabled?: boolean
```

Disables any interaction with the input and changes to a disabled style.

---

### `style`

```ts
style?: { [key: string]: string | number }
```

A React style object that will be passed to the input element.

---

### `onFocus`

```ts
onFocus?: function
```

This function will be called when the input element receives focus.

---

### `onBlur`

```ts
onBlur?: function
```

This function will be called when the input element loses focus.
