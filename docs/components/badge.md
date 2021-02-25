<h1 align="center">Badge</h1>

<p align="center">
    <a href="src/react-chayns-badge/component/Badge.jsx">Source</a>
</p>

Badges are small, circular containers used to decorate other components with
glancable information.

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
import { Badge } from 'chayns-components';

// ...

<Badge {...} />
```

## Props

The `Badge`-component takes the following props:

| Name                    | Type                                  | Default | Required |
| ----------------------- | ------------------------------------- | ------- | :------: |
| [children](#children)   | `ReactNode`                           |         |    ✓     |
| [className](#classname) | `string`                              | `''`    |          |
| [style](#style)         | `{ [key: string]: string \| number }` |         |          |
| [badgeRef](#badgeref)   | `function`                            |         |          |

### `children`

```ts
children: ReactNode;
```

A React node that is displayed inside of the Badge.

---

### `className`

```ts
className?: string
```

A classname that is applied to the Badge `<div>`-element.

---

### `style`

```ts
style?: { [key: string]: string | number }
```

A React style object that will be applied to the Badge `<div>`-element.

---

### `badgeRef`

```ts
badgeRef?: function
```

Retrieves the ref to the Badge `<div>`-element.
