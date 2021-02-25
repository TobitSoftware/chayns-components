<h1 align="center">ContextMenu</h1>

<p align="center">
    <a href="src/react-chayns-contextmenu/component/ContextMenu.jsx">Source</a>
</p>

Gives people access to additional functionality related to onscreen items
without cluttering the interface.

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
import { ContextMenu } from 'chayns-components';

// ...

<ContextMenu {...} />
```

## Methods

To open or close the context menu imperatively, call the `show()` and `hide()`
on its reference.

## Props

The `ContextMenu`-component takes the following props:

| Name                                            | Type                                                                                                 | Default                         | Required |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------- | :------: |
| [onLayerClick](#onlayerclick)                   | `function`                                                                                           |                                 |          |
| [coordinates](#coordinates)                     | `{ x: number, y: number }`                                                                           |                                 |          |
| [items](#items)                                 | `Array<{ className: string, onClick: function, text: string \| ReactNode, icon: string \| Object }>` | `[]`                            |          |
| [position](#position)                           | `number`                                                                                             |                                 |          |
| [positionOnChildren](#positiononchildren)       | `number`                                                                                             | `1`                             |          |
| [parent](#parent)                               | `custom`                                                                                             |                                 |          |
| [children](#children)                           | `ReactNode`                                                                                          | `<Icon icon="ts-ellipsis_v" />` |          |
| [onChildrenClick](#onchildrenclick)             | `function`                                                                                           |                                 |          |
| [childrenStyle](#childrenstyle)                 | `{ [key: string]: string \| number }`                                                                |                                 |          |
| [childrenClassName](#childrenclassname)         | `string`                                                                                             |                                 |          |
| [stopPropagation](#stoppropagation)             | `boolean`                                                                                            | `false`                         |          |
| [minWidth](#minwidth)                           | `number`                                                                                             |                                 |          |
| [maxWidth](#maxwidth)                           | `number`                                                                                             |                                 |          |
| [showTriggerBackground](#showtriggerbackground) | `boolean`                                                                                            | `false`                         |          |
| [className](#classname)                         | `string`                                                                                             |                                 |          |
| [style](#style)                                 | `object`                                                                                             |                                 |          |
| [removeParentSpace](#removeparentspace)         | `boolean`                                                                                            | `false`                         |          |
| [disableDialog](#disabledialog)                 | `boolean`                                                                                            | `false`                         |          |
| [arrowDistance](#arrowdistance)                 | `number`                                                                                             | `0`                             |          |

### `onLayerClick`

```ts
onLayerClick?: function
```

This callback will be called when the `ContextMenu` is shown and the user clicks
away from it.

---

### `coordinates`

```ts
coordinates?: { x: number, y: number }
```

The coordinates at which the context menu will get rendered.

---

### `items`

```ts
items?: Array<{ className: string, onClick: function, text: string | ReactNode, icon: string | Object }>
```

The action items inside of the context menu. Their shape should look like this:
`{ className: <string>, onClick: <function>, text: <string>, icon: <string> }`.

---

### `position`

```ts
position?: number
```

This specifies where the menu will appear relative to the components provided in
the `children`-prop. Possible values are: `0` for top left, `1` for bottom left,
`2` for bottom right, `3` for top right, `4` for top center and `5` for bottom
center.

---

### `positionOnChildren`

```ts
positionOnChildren?: number
```

The position of the arrow relative to the children. Possible values are `0` for
left, `1` for center and `2` for right.

---

### `parent`

```ts
parent?: custom
```

Specifies the DOM node the context menu will be rendered into.

---

### `children`

```ts
children?: ReactNode
```

The React node that the context menu refers to.

---

### `onChildrenClick`

```ts
onChildrenClick?: function
```

Called when the `onclick`-event is triggered on the children.

---

### `childrenStyle`

```ts
childrenStyle?: { [key: string]: string | number }
```

A React style object that will be applied to the children wrapper.

---

### `childrenClassName`

```ts
childrenClassName?: string
```

A classname string that will be applied to the children wrapper.

---

### `stopPropagation`

```ts
stopPropagation?: boolean
```

Wether to stop propagation of click events on the children elements.

---

### `minWidth`

```ts
minWidth?: number
```

The minimum width of the context menu.

---

### `maxWidth`

```ts
maxWidth?: number
```

The maximum width of the context menu.

---

### `showTriggerBackground`

```ts
showTriggerBackground?: boolean
```

Adds a white background to the children wrapper, for when it would otherwise be
difficult to view (e.g. on images or video).

---

### `className`

```ts
className?: string
```

A classname string applied to the Bubble component.

---

### `style`

```ts
style?: object
```

A React style object that is applied to the Bubble component.

---

### `removeParentSpace`

```ts
removeParentSpace?: boolean
```

Removes the parent padding to the page borders from the context menu position.
This is needed when the parent is padded and relatively positioned.

---

### `disableDialog`

```ts
disableDialog?: boolean
```

Disables the use of a dialog on mobile.

---

### `arrowDistance`

```ts
arrowDistance?: number
```

Adjust the distance of the arrow and the end of the children. This only applies
if `positionOnChildren` is set to left (`0`) or right (`2`).
