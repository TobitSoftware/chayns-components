<div align="center"><h1>Tooltip</h1></div>

Wraps a child component and displays a message when the child is hovered or
clicked on. Allows to be shown imperatively by calling `.show()` or `.hide()` on
its reference.

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
import { Tooltip } from 'chayns-components';

// ...

<Tooltip {...} />
```

## Props

The `Tooltip`-component takes the following props:

| Name                                        | Type                                                                                               | Default                                                    | Required |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | :------: |
| [content](#content)                         | `{ text: string, headline: string, imageUrl: string, buttonText: string, buttonOnClick: function } | { html: ReactNode }`                                       |          | ✓ |
| [children](#children)                       | `ReactNode`                                                                                        |                                                            |          |
| [bindListeners](#bindlisteners)             | `boolean`                                                                                          | `false`                                                    |          |
| [position](#position)                       | `number`                                                                                           |                                                            |          |
| [minWidth](#minwidth)                       | `number`                                                                                           | `100`                                                      |          |
| [maxWidth](#maxwidth)                       | `number`                                                                                           | `250`                                                      |          |
| [removeIcon](#removeicon)                   | `boolean`                                                                                          | `typeof chayns !== 'undefined' ? chayns.env.isIOS : false` |          |
| [parent](#parent)                           | `custom`                                                                                           |                                                            |          |
| [coordinates](#coordinates)                 | `{ x: number, y: number }`                                                                         |                                                            |          |
| [childrenStyle](#childrenstyle)             | `{ [key: string]: string                                                                           | number }`                                                  |          |  |
| [childrenClassNames](#childrenclassnames)   | `string`                                                                                           |                                                            |          |
| [preventTriggerStyle](#preventtriggerstyle) | `boolean`                                                                                          | `false`                                                    |          |
| [hideOnChildrenLeave](#hideonchildrenleave) | `boolean`                                                                                          | `false`                                                    |          |
| [removeParentSpace](#removeparentspace)     | `boolean`                                                                                          | `false`                                                    |          |
| [isIOS](#isios)                             | `boolean`                                                                                          | `typeof chayns !== 'undefined' ? chayns.env.isIOS : false` |          |

### `content`

```ts
content: { text: string, headline: string, imageUrl: string, buttonText: string, buttonOnClick: function } | { html: ReactNode }
```

The content of the tooltip. Either specify an object with the accepted
properties or render custom elements by passing an object like so:
`{ html: <div /> }`.

---

### `children`

```ts
children?: ReactNode
```

The `ReactNode` the tooltip should refer to. If the `children` node is a
`<span>` or `<p>` element, it will be decorated with a dotted underline.

---

### `bindListeners`

```ts
bindListeners?: boolean
```

Wether `mouseover` and `mouseleave` listeners should be added to the children
elements, which makes the tooltip automatically appear on hover.

---

### `position`

```ts
position?: number
```

The position of the tooltip. `0` is top left, `1` is bottom left, `2` is bottom
right and `3` is top right.

---

### `minWidth`

```ts
minWidth?: number
```

The minimum width of the tooltip.

---

### `maxWidth`

```ts
maxWidth?: number
```

The maximum width of the tooltip.

---

### `removeIcon`

```ts
removeIcon?: boolean
```

Wether the close icon in the top right corner of the tooltip should be shown.

---

### `parent`

```ts
parent?: custom
```

A DOM node the tooltip should be rendered into.

---

### `coordinates`

```ts
coordinates?: { x: number, y: number }
```

An object with coordinates at which the tooltip should point.

---

### `childrenStyle`

```ts
childrenStyle?: { [key: string]: string | number }
```

A React style object that is applied to the children.

---

### `childrenClassNames`

```ts
childrenClassNames?: string
```

A classname string that should be applied to the children.

---

### `preventTriggerStyle`

```ts
preventTriggerStyle?: boolean
```

Prevent adding an underline to the children.

---

### `hideOnChildrenLeave`

```ts
hideOnChildrenLeave?: boolean
```

Hide the tooltip when the cursor leaves the children, even if the cursor is over
the bubble.

---

### `removeParentSpace`

```ts
removeParentSpace?: boolean
```

Removes any padding of the page from the tooltip position. This is only needed
when the parent is padded to the page and is relatively positioned.

---

### `isIOS`

```ts
isIOS?: boolean
```

Wether the target device is iOS (only relevant during serverside rendering).
