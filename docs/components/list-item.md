<h1 align="center">ListItem</h1>

<p align="center">
    <a href="/src/react-chayns-list/component/ListItem/ListItem.jsx">Source</a>
</p>

The items in a list to display related data in a structured format. Should be
used inside of a `List` component.

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
import { ListItem } from 'chayns-components';

// ...

<ListItem {...} />
```

## Props

The `ListItem`-component takes the following props:

| Name                                  | Type                                  | Default                                     | Required |
| ------------------------------------- | ------------------------------------- | ------------------------------------------- | :------: |
| [title](#title)                       | `ReactNode \| Array<ReactNode>`       |                                             |    ✓     |
| [subtitle](#subtitle)                 | `ReactNode \| Array<ReactNode>`       |                                             |          |
| [image](#image)                       | `string`                              |                                             |          |
| [images](#images)                     | `Array<string>`                       |                                             |          |
| [icon](#icon)                         | `string \| object`                    |                                             |          |
| [className](#classname)               | `string`                              |                                             |          |
| [onClick](#onclick)                   | `function`                            |                                             |          |
| [right](#right)                       | `ReactNode \| Array<ReactNode>`       |                                             |          |
| [style](#style)                       | `{ [key: string]: string \| number }` |                                             |          |
| [headerProps](#headerprops)           | `object`                              |                                             |          |
| [circle](#circle)                     | `boolean`                             | `false`                                     |          |
| [hoverItem](#hoveritem)               | `ReactNode`                           |                                             |          |
| [onLongPress](#onlongpress)           | `function`                            |                                             |          |
| [onMouseDown](#onmousedown)           | `function`                            |                                             |          |
| [onMouseMove](#onmousemove)           | `function`                            |                                             |          |
| [onMouseUp](#onmouseup)               | `function`                            |                                             |          |
| [onTouchStart](#ontouchstart)         | `function`                            |                                             |          |
| [onTouchMove](#ontouchmove)           | `function`                            |                                             |          |
| [onTouchEnd](#ontouchend)             | `function`                            |                                             |          |
| [onTouchCancel](#ontouchcancel)       | `function`                            |                                             |          |
| [longPressTimeout](#longpresstimeout) | `number`                              | `450`                                       |          |
| [noContentClass](#nocontentclass)     | `boolean`                             |                                             |          |
| [onOpen](#onopen)                     | `function`                            |                                             |          |
| [imageBorderColor](#imagebordercolor) | `string`                              | `'rgba(var(--chayns-color-rgb--009), .08)'` |          |
| [headMultiline](#headmultiline)       | `boolean`                             | `false`                                     |          |

### `title`

```ts
title: ReactNode | Array<ReactNode>
```

A string or `ReactNode` that will be rendered as the title of the list item.

---

### `subtitle`

```ts
subtitle?: ReactNode | Array<ReactNode>
```

A string or `ReactNode` that will be rendered as the subtitle of the list item.

---

### `image`

```ts
image?: string
```

The URL to an image that will be shown on the left of the list item.

---

### `images`

```ts
images?: Array<string>
```

An array of URLs for creating a puzzle of images on the left hand of the image
item.

---

### `icon`

```ts
icon?: string | object
```

An icon to show on the left side of the list item.

---

### `className`

```ts
className?: string
```

A classname string that will be applied ot the outer-most `<div>`-element of the
list item.

---

### `onClick`

```ts
onClick?: function
```

An `onClick`-listener for the list item header.

---

### `right`

```ts
right?: ReactNode | Array<ReactNode>
```

A `ReactNode` that should be displayed on the right side of the list item.

---

### `style`

```ts
style?: { [key: string]: string | number }
```

A React style object that will be applied to the outer-most `<div>`-element of
the list item. `style.body` and `style.head` will be applied to the body and
head parts of the list item accordingly.

---

### `headerProps`

```ts
headerProps?: object
```

Any additional props that will be applied to the head of the list item.

---

### `circle`

```ts
circle?: boolean
```

Wether the image should be in a circular shape rather than a rectangle.

---

### `hoverItem`

```ts
hoverItem?: ReactNode
```

A ReactNode that is shown on the right side of the list item on hover.

---

### `onLongPress`

```ts
onLongPress?: function
```

This function will be called when the user long-presses on the list item header.

---

### `onMouseDown`

```ts
onMouseDown?: function
```

A callback for the `mousedown`-event on the list item header.

---

### `onMouseMove`

```ts
onMouseMove?: function
```

A callback for the `mousemove`-event on the list item header.

---

### `onMouseUp`

```ts
onMouseUp?: function
```

A callback for the `mouseup`-event on the list item header.

---

### `onTouchStart`

```ts
onTouchStart?: function
```

A callback for the `touchstart`-event on the list item header.

---

### `onTouchMove`

```ts
onTouchMove?: function
```

A callback for the `touchmove`-event on the list item header.

---

### `onTouchEnd`

```ts
onTouchEnd?: function
```

A callback for the `touchend`-event on the list item header.

---

### `onTouchCancel`

```ts
onTouchCancel?: function
```

A callback for the `touchcancel`-event on the list item header.

---

### `longPressTimeout`

```ts
longPressTimeout?: number
```

Control the time after which a press is considered a long press.

---

### `noContentClass`

```ts
noContentClass?: boolean
```

Whether the default classname for the children container should be removed,
which removes the padding around the list item content.

---

### `onOpen`

```ts
onOpen?: function
```

This function will be called when the list item is opening.

---

### `imageBorderColor`

```ts
imageBorderColor?: string
```

A CSS color that will be applied to the border of the image.

---

### `headMultiline`

```ts
headMultiline?: boolean
```

Whether the head of the list item should be multiline or ellipsis in expanded
state
