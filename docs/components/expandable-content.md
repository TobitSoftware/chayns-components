<div align="center"><h1>ExpandableContent</h1></div>

A component collapses or expands its children based on the `open`-prop.

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
import { ExpandableContent } from 'chayns-components';

// ...

<ExpandableContent {...} />
```

## Props

The `ExpandableContent`-component takes the following props:

| Name                                        | Type                                                                   | Default                                                                                                                                                           | Required |
| ------------------------------------------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------: |
| [classNames](#classnames)                   | `{ opening: string, opened: string, closing: string, closed: string }` | `{ opened: 'animation__accordion--open', opening: 'animation__accordion--open', closed: 'animation__accordion--close', closing: 'animation__accordion--close', }` |          |
| [timeout](#timeout)                         | `{ opening: number, closing: number }`                                 | `{ opening: DEFAULT_OPEN_TIMEOUT, closing: DEFAULT_CLOSE_TIMEOUT, }`                                                                                              |          |
| [open](#open)                               | `boolean`                                                              |                                                                                                                                                                   |    ✓     |
| [style](#style)                             | `{ [key: string]: string \| number }`                                  |                                                                                                                                                                   |          |
| [className](#classname)                     | `string`                                                               |                                                                                                                                                                   |          |
| [children](#children)                       | `ReactNode \| Array<ReactNode>`                                        |                                                                                                                                                                   |    ✓     |
| [removeContentClosed](#removecontentclosed) | `boolean`                                                              | `false`                                                                                                                                                           |          |

### `classNames`

```ts
classNames?: { opening: string, opened: string, closing: string, closed: string }
```

An object of classname strings that should be applied in the different states.

---

### `timeout`

```ts
timeout?: { opening: number, closing: number }
```

This controls the animation timeouts for opening and closing.

---

### `open`

```ts
open: boolean;
```

Wether the content should be visible. If changed, a height transition will
start.

---

### `style`

```ts
style?: { [key: string]: string | number }
```

A React style object that is passed to the wrapper `<div>`-element.

---

### `className`

```ts
className?: string
```

A classname string that is applied to the wrapper element.

---

### `children`

```ts
children: ReactNode | Array<ReactNode>
```

The children of the component.

---

### `removeContentClosed`

```ts
removeContentClosed?: boolean
```

Wether the content should be removed when the component is closed and the
content would not be visible anyways.
