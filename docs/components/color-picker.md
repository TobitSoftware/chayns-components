<h1 align="center">ColorPicker</h1>

<p align="center">
    <a href="src/react-chayns-color_picker/component/ColorPicker.jsx">Source</a>
</p>

Lets a user choose a color for text, shapes, marking tools, and other elements.

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
import { ColorPicker } from 'chayns-components';

// ...

<ColorPicker {...} />
```

## Props

The `ColorPicker`-component takes the following props:

| Name                                    | Type                                                                                                         | Default                         | Required |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------- | :------: |
| [inline](#inline)                       | `boolean`                                                                                                    | `false`                         |          |
| [color](#color)                         | `string \| { r: number, g: number, b: number, a: number } \| { h: number, s: number, v: number, a: number }` |                                 |    ✓     |
| [bubblePosition](#bubbleposition)       | `number`                                                                                                     | `Bubble.position.BOTTOM_CENTER` |          |
| [onChange](#onchange)                   | `function`                                                                                                   |                                 |          |
| [onChangeEnd](#onchangeend)             | `function`                                                                                                   |                                 |          |
| [onBlur](#onblur)                       | `function`                                                                                                   |                                 |          |
| [transparency](#transparency)           | `boolean`                                                                                                    | `false`                         |          |
| [parent](#parent)                       | `custom`                                                                                                     |                                 |          |
| [className](#classname)                 | `string`                                                                                                     |                                 |          |
| [style](#style)                         | `{ [key: string]: number \| string }`                                                                        |                                 |          |
| [bubbleClassName](#bubbleclassname)     | `string`                                                                                                     |                                 |          |
| [bubbleStyle](#bubblestyle)             | `{ [key: string]: number \| string }`                                                                        |                                 |          |
| [input](#input)                         | `boolean`                                                                                                    | `false`                         |          |
| [defaultColorModel](#defaultcolormodel) | `number`                                                                                                     |                                 |          |
| [children](#children)                   | `ReactNode`                                                                                                  |                                 |          |
| [removeParentSpace](#removeparentspace) | `boolean`                                                                                                    | `false`                         |          |

### `inline`

```ts
inline?: boolean
```

Display the color picker without a bubble.

---

### `color`

```ts
color: string |
    { r: number, g: number, b: number, a: number } |
    { h: number, s: number, v: number, a: number };
```

The current color. Either a HEX-string, an HSV(A)- or RGB(A)-object.

---

### `bubblePosition`

```ts
bubblePosition?: number
```

The bubble position. The possible values are listed under the
`Bubble`-component.

---

### `onChange`

```ts
onChange?: function
```

Will be called when changing the color.

---

### `onChangeEnd`

```ts
onChangeEnd?: function
```

Will be called after the color was changed.

---

### `onBlur`

```ts
onBlur?: function
```

Will be called when the picker loses focus.

---

### `transparency`

```ts
transparency?: boolean
```

Wether the picker should show a transparency slider.

---

### `parent`

```ts
parent?: custom
```

The parent node the bubble should be rendered into.

---

### `className`

```ts
className?: string
```

The classname that will be set on the children wrapper.

---

### `style`

```ts
style?: { [key: string]: number | string }
```

A React style object that will be assigned to the children wrapper element.

---

### `bubbleClassName`

```ts
bubbleClassName?: string
```

A classname string that will be applied to the Bubble component.

---

### `bubbleStyle`

```ts
bubbleStyle?: { [key: string]: number | string }
```

A React style object that will be applied to the Bubble component.

---

### `input`

```ts
input?: boolean
```

Displays an input to type in the color.

---

### `defaultColorModel`

```ts
defaultColorModel?: number
```

The color model that is used by default.

---

### `children`

```ts
children?: ReactNode
```

Children // TODO

---

### `removeParentSpace`

```ts
removeParentSpace?: boolean
```

Removes space from the parent to the page borders from the tooltip position.
This is only needed if the parent is padded from the page and has a relative
positioning.
