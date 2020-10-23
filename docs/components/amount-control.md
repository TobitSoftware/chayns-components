<div align="center"><h1>AmountControl</h1></div>

A number input that can easily be incremented and decremented.

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
import { AmountControl } from 'chayns-components';

// ...

<AmountControl {...} />
```

## Props

The `AmountControl`-component takes the following props:

| Name                                        | Type               | Default         | Required |
| ------------------------------------------- | ------------------ | --------------- | :------: |
| [buttonText](#buttontext)                   | `string`           |                 |          |
| [amount](#amount)                           | `number`           | `0`             |          |
| [onChange](#onchange)                       | `function`         |                 |          |
| [onInput](#oninput)                         | `function`         |                 |          |
| [onAdd](#onadd)                             | `function`         |                 |          |
| [onRemove](#onremove)                       | `function`         |                 |          |
| [disabled](#disabled)                       | `boolean`          | `false`         |          |
| [disableInput](#disableinput)               | `boolean`          | `false`         |          |
| [disableAdd](#disableadd)                   | `boolean`          | `false`         |          |
| [disableRemove](#disableremove)             | `boolean`          | `false`         |          |
| [className](#classname)                     | `string`           | `''`            |          |
| [autoInput](#autoinput)                     | `boolean`          | `false`         |          |
| [buttonFormatHandler](#buttonformathandler) | `function`         |                 |          |
| [showInput](#showinput)                     | `boolean`          | `false`         |          |
| [icon](#icon)                               | `string \| object` |                 |          |
| [plusIcon](#plusicon)                       | `string \| object` | `'fa fa-plus'`  |          |
| [minusIcon](#minusicon)                     | `string \| object` | `'fa fa-minus'` |          |
| [removeIcon](#removeicon)                   | `string \| object` | `'fa fa-minus'` |          |
| [removeColor](#removecolor)                 | `string`           |                 |          |
| [addColor](#addcolor)                       | `string`           |                 |          |
| [iconColor](#iconcolor)                     | `string`           |                 |          |
| [equalize](#equalize)                       | `string`           |                 |          |
| [focusOnClick](#focusonclick)               | `boolean`          | `true`          |          |
| [contentWidth](#contentwidth)               | `number`           |                 |          |
| [min](#min)                                 | `number`           |                 |          |
| [max](#max)                                 | `number`           |                 |          |
| [stopPropagation](#stoppropagation)         | `boolean`          | `false`         |          |
| [hasAlwaysControls](#hasalwayscontrols)     | `boolean`          | `false`         |          |

### `buttonText`

```ts
buttonText?: string
```

This text will be shown in the button when the `amount`-prop is 0.

---

### `amount`

```ts
amount?: number
```

This component works as a controlled input and this prop defines its current
state.

---

### `onChange`

```ts
onChange?: function
```

This callback will be called when the amount is changed by the user.

---

### `onInput`

```ts
onInput?: function
```

Alias for onChange.

---

### `onAdd`

```ts
onAdd?: function
```

Called when the user clicks the increment-button.

---

### `onRemove`

```ts
onRemove?: function
```

Called when the user clicks the decrement-button.

---

### `disabled`

```ts
disabled?: boolean
```

Disables any interaction and switches to a disabled style.

---

### `disableInput`

```ts
disableInput?: boolean
```

Disables the input field and forces the user to use the buttons to control the
value.

---

### `disableAdd`

```ts
disableAdd?: boolean
```

Disables the increment-button and disables the ability to increment the value.

---

### `disableRemove`

```ts
disableRemove?: boolean
```

Disables the decrement-button and disables the ability to decrement the value.

---

### `className`

```ts
className?: string
```

A classname that is applied to the wrapper of the component.

---

### `autoInput`

```ts
autoInput?: boolean
```

Shows an input field once the amount is greater than 10.

---

### `buttonFormatHandler`

```ts
buttonFormatHandler?: function
```

A function that returns the content of the button.

---

### `showInput`

```ts
showInput?: boolean
```

Wether to show the input.

---

### `icon`

```ts
icon?: string | object
```

Displays an icon on the left side of the button if the amount is 0. Supply a
FontAwesome-string like `"fa fa-plane"`.

---

### `plusIcon`

```ts
plusIcon?: string | object
```

The icon shown on the increment-button.

---

### `minusIcon`

```ts
minusIcon?: string | object
```

The icon shown on the decrement-button.

---

### `removeIcon`

```ts
removeIcon?: string | object
```

The icon the reset the amount to 0.

---

### `removeColor`

```ts
removeColor?: string
```

The color of the remove icon.

---

### `addColor`

```ts
addColor?: string
```

The color of the icon in the increment-button.

---

### `iconColor`

```ts
iconColor?: string
```

The color of the icon to the left of the button.

---

### `equalize`

```ts
equalize?: string
```

Multiple `AmountControl` with the same `equalize`-prop will sync their width.

---

### `focusOnClick`

```ts
focusOnClick?: boolean
```

Enables the input autofocus.

---

### `contentWidth`

```ts
contentWidth?: number
```

The width of the AmountControl content.

---

### `min`

```ts
min?: number
```

The minimum value of the AmountControl (the input field is not validated).

---

### `max`

```ts
max?: number
```

The maximum value of the AmountControl (the input field is not validated).

---

### `stopPropagation`

```ts
stopPropagation?: boolean
```

Stop propagation of click events to parent components.

---

### `hasAlwaysControls`

```ts
hasAlwaysControls?: boolean
```

Always show the increment and decrement buttons.
