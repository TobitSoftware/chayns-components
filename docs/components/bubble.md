<div align="center"><h1>Bubble</h1></div>

A floating bubble that is primarily used to power the `ContextMenu` and
`Tooltip` components.

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
import { Bubble } from 'chayns-components';

// ...

<Bubble {...} />
```

## Props

The `Bubble`-component takes the following props:

| Name                          | Type                                  | Default | Required |
| ----------------------------- | ------------------------------------- | ------- | :------: |
| [children](#children)         | `ReactNode`                           |         |          |
| [className](#classname)       | `string`                              |         |          |
| [style](#style)               | `{ [key: string]: string \| number }` |         |          |
| [position](#position)         | `enum`                                | `0`     |          |
| [parent](#parent)             | `custom`                              |         |          |
| [coordinates](#coordinates)   | `{ x: number, y: number }`            |         |          |
| [onMouseEnter](#onmouseenter) | `function`                            |         |          |
| [onMouseLeave](#onmouseleave) | `function`                            |         |          |
| [topDivStyle](#topdivstyle)   | `{ [key: string]: string \| number }` |         |          |

### `children`

```ts
children?: ReactNode
```

The children that will be rendered inside of the bubble.

---

### `className`

```ts
className?: string
```

A classname string that will be set on the children wrapper element.

---

### `style`

```ts
style?: { [key: string]: string | number }
```

A React style object that will be applied to the children wrapper element.

---

### `position`

```ts
position?: enum
```

This specifies where the bubble will appear relative to its coordinates.
Possible values are: `0` for top left, `1` for bottom left, `2` for bottom
right, `3` for top right, `4` for top center and `5` for bottom center.

---

### `parent`

```ts
parent?: custom
```

A DOM element into which the `Bubble`-component will render.

---

### `coordinates`

```ts
coordinates?: { x: number, y: number }
```

The coordinates where the Bubble will point to. Is provided in an object format
that should look like this: `{ x: <number>, y: <number> }`

---

### `onMouseEnter`

```ts
onMouseEnter?: function
```

A callback that will be called when the mouse enters the Bubble.

---

### `onMouseLeave`

```ts
onMouseLeave?: function
```

A callback that will be called when the mouse leaves the Bubble.

---

### `topDivStyle`

```ts
topDivStyle?: { [key: string]: string | number }
```

A React style object that will be supplied to the outer most element of the
Bubble.
