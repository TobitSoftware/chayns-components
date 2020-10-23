<div align="center"><h1>ScrollView</h1></div>

A scrollable container with a custom scrollbar that looks great on every device.

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
import { ScrollView } from 'chayns-components';

// ...

<ScrollView {...} />
```

## Props

The `ScrollView`-component takes the following props:

| Name                                  | Type                     | Default           | Required |
| ------------------------------------- | ------------------------ | ----------------- | :------: |
| [children](#children)                 | `ReactNode               | Array<ReactNode>` |          |  |
| [style](#style)                       | `{ [key: string]: number | string }`         |          |  |
| [className](#classname)               | `string`                 |                   |          |
| [scrollElementId](#scrollelementid)   | `string`                 |                   |          |
| [scrollElementRef](#scrollelementref) | `function`               |                   |          |
| [onScroll](#onscroll)                 | `function`               |                   |          |

### `children`

```ts
children?: ReactNode | Array<ReactNode>
```

The contents of the `ScrollView`.

---

### `style`

```ts
style?: { [key: string]: number | string }
```

A React style object that will be applied to the outer-most container. Specify a
`height` or `maxHeight` here.

---

### `className`

```ts
className?: string
```

A classname string that will be applied to the outer-most container.

---

### `scrollElementId`

```ts
scrollElementId?: string
```

A HTML id that will be applied to the scroll container.

---

### `scrollElementRef`

```ts
scrollElementRef?: function
```

A function that receives the reference to the scroll container element as its
first argument.

---

### `onScroll`

```ts
onScroll?: function
```

The `onScroll`-listener for the scroll container.
