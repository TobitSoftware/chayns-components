<h1 align="center">SharingBar</h1>

<p align="center">
    <a href="/src/react-chayns-sharingbar/component/SharingBar.jsx">Source</a>
</p>

A context menu for sharing a link and some text on various platforms.

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
import { SharingBar } from 'chayns-components';

// ...

<SharingBar {...} />
```

## Props

The `SharingBar`-component takes the following props:

| Name                                | Type                                  | Default                                                                                                                  | Required |
| ----------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | :------: |
| [link](#link)                       | `string`                              |                                                                                                                          |          |
| [linkText](#linktext)               | `string`                              | `''`                                                                                                                     |          |
| [className](#classname)             | `string`                              |                                                                                                                          |          |
| [stopPropagation](#stoppropagation) | `boolean`                             | `false`                                                                                                                  |          |
| [style](#style)                     | `{ [key: string]: string \| number }` |                                                                                                                          |          |
| [children](#children)               | `ReactNode`                           | `[ <Icon icon="fal fa-share-alt" className="sharing-bar__icon" />, <span className="sharing-bar__text">Teilen</span>, ]` |          |

### `link`

```ts
link?: string
```

The link that should be shared.

---

### `linkText`

```ts
linkText?: string
```

A text that will be added in front of the shared link.

---

### `className`

```ts
className?: string
```

A classname string that will be applied to the container element.

---

### `stopPropagation`

```ts
stopPropagation?: boolean
```

Wether click events should be prevented from propagating to parent elements.

---

### `style`

```ts
style?: { [key: string]: string | number }
```

A React style object that will be applied to the container element.

---

### `children`

```ts
children?: ReactNode
```

The children nodes of the `SharingBar`.
