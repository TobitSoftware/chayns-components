<h1 align="center">Gallery</h1>

<p align="center">
    <a href="/src/react-chayns-gallery/component/Gallery.jsx">Source</a>
</p>

An image gallery that displays up to four images by default. Also supports
reordering and deletion of images and blurred image previews for images loaded
from `tsimg.cloud`.

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
import { Gallery } from 'chayns-components';

// ...

<Gallery {...} />
```

## Props

The `Gallery`-component takes the following props:

| Name                                | Type                                  | Default | Required |
| ----------------------------------- | ------------------------------------- | ------- | :------: |
| [images](#images)                   | `custom`                              |         |          |
| [onClick](#onclick)                 | `function`                            |         |          |
| [onDelete](#ondelete)               | `function`                            |         |          |
| [deleteMode](#deletemode)           | `boolean`                             | `false` |          |
| [height](#height)                   | `number \| string`                    |         |          |
| [width](#width)                     | `number \| string`                    |         |          |
| [className](#classname)             | `string`                              |         |          |
| [style](#style)                     | `{ [key: string]: string \| number }` | `{}`    |          |
| [stopPropagation](#stoppropagation) | `boolean`                             | `false` |          |
| [dragMode](#dragmode)               | `boolean`                             | `false` |          |
| [onDragEnd](#ondragend)             | `function`                            |         |          |
| [preventParams](#preventparams)     | `boolean`                             | `false` |          |
| [smallTiles](#smalltiles)           | `boolean`                             | `false` |          |

### `images`

```ts
images?: custom
```

An array of strings or File objects that will be the image sources.

---

### `onClick`

```ts
onClick?: function
```

A function that is called when an Image is clicked.

---

### `onDelete`

```ts
onDelete?: function
```

A function that is called when an image is deleted in deletion mode.

---

### `deleteMode`

```ts
deleteMode?: boolean
```

Wether the deletion mode is active.

---

### `height`

```ts
height?: number | string
```

The height of the gallery as a number of pixels or CSS string.

---

### `width`

```ts
width?: number | string
```

The width of the gallery as a number of pixels or CSS string.

---

### `className`

```ts
className?: string
```

A classname string that will be applied to the root container.

---

### `style`

```ts
style?: { [key: string]: string | number }
```

A React style object that is applied to the root container.

---

### `stopPropagation`

```ts
stopPropagation?: boolean
```

Wether to stop propagation of click events to parent elements.

---

### `dragMode`

```ts
dragMode?: boolean
```

Wether drag mode is active.

---

### `onDragEnd`

```ts
onDragEnd?: function
```

Called after the user finished reordering the array. Receives the new array as
its first parameter.

---

### `preventParams`

```ts
preventParams?: boolean
```

This will be forwarded to the `Image`-component. It prevents parameters of the
loaded image. E.g. supply `{ width: true }` to prevent the `width`-parameter on
the loaded image.

---

### `smallTiles`

```ts
smallTiles?: boolean
```

This option changes the layout to the layout known from delete- and drag-mode
without activating this modes.
