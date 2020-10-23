<div align="center"><h1>ColorScheme</h1></div>

Adjusts the color scheme for all child components.

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
import { ColorScheme } from 'chayns-components';

// ...

<ColorScheme {...} />
```

## Props

The `ColorScheme`-component takes the following props:

| Name                              | Type                                  | Default | Required |
| --------------------------------- | ------------------------------------- | ------- | :------: |
| [color](#color)                   | `string`                              |         |          |
| [secondaryColor](#secondarycolor) | `string`                              |         |          |
| [colorMode](#colormode)           | `string \| number`                    |         |          |
| [children](#children)             | `ReactNode`                           |         |    ✓     |
| [style](#style)                   | `{ [key: string]: string \| number }` | `{}`    |          |
| [cssVariables](#cssvariables)     | `{ [key: string]: string \| number }` | `{}`    |          |

### `color`

```ts
color?: string
```

The color to use for child components in hex format.

---

### `secondaryColor`

```ts
secondaryColor?: string
```

A secondary color to use for child components in hex format.

---

### `colorMode`

```ts
colorMode?: string | number
```

A color mode to use for child components.

---

### `children`

```ts
children: ReactNode;
```

Children of the component.

---

### `style`

```ts
style?: { [key: string]: string | number }
```

Styles to be set on the wrapper `<div>`-element.

---

### `cssVariables`

```ts
cssVariables?: { [key: string]: string | number }
```

An object of CSS variables that should be set on the `<div>`-wrapper. Should
look like this: `{ "--my-css-var": 100 }`.
