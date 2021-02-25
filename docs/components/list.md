<h1 align="center">List</h1>

<p align="center">
    <a href="src/react-chayns-list/component/List.jsx">Source</a>
</p>

The wrapper for the `ListItem`-component to create lists.

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
import { List } from 'chayns-components';

// ...

<List {...} />
```

## Props

The `List`-component takes the following props:

| Name                            | Type                            | Default | Required |
| ------------------------------- | ------------------------------- | ------- | :------: |
| [className](#classname)         | `string`                        |         |          |
| [children](#children)           | `ReactNode \| Array<ReactNode>` |         |          |
| [notExpandable](#notexpandable) | `boolean`                       | `false` |          |

### `className`

```ts
className?: string
```

A classname string that will be applied to the wrapper container.

---

### `children`

```ts
children?: ReactNode | Array<ReactNode>
```

The children of the list.

---

### `notExpandable`

```ts
notExpandable?: boolean
```

Wether the components inside of the list should not be expandable.
