<h1 align="center">SmallWaitCursor</h1>

<p align="center">
    <a href="src/react-chayns-smallwaitcursor/component/SmallWaitCursor.jsx">Source</a>
</p>

A small circular loading indicator.

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
import { SmallWaitCursor } from 'chayns-components';

// ...

<SmallWaitCursor {...} />
```

## Props

The `SmallWaitCursor`-component takes the following props:

| Name                              | Type                                  | Default | Required |
| --------------------------------- | ------------------------------------- | ------- | :------: |
| [show](#show)                     | `boolean`                             | `false` |          |
| [style](#style)                   | `{ [key: string]: number \| string }` |         |          |
| [showBackground](#showbackground) | `boolean`                             | `true`  |          |
| [inline](#inline)                 | `boolean`                             | `false` |          |
| [className](#classname)           | `string`                              |         |          |

### `show`

```ts
show?: boolean
```

Wether the wait cursor should be shown.

---

### `style`

```ts
style?: { [key: string]: number | string }
```

A React style object that will be applied to the wrapper.

---

### `showBackground`

```ts
showBackground?: boolean
```

Wether a background should be shown behind the spinner.

---

### `inline`

```ts
inline?: boolean
```

Wether the spinner should be rendered with `display: inline-block;`. This does
not work when `showBackground` is `true`

---

### `className`

```ts
className?: string
```

A classname sring that will be applied to the container element of the spinner.
