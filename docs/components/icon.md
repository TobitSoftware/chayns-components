<h1 align="center">Icon</h1>

<p align="center">
    <a href="/src/react-chayns-icon/component/Icon.jsx">Source</a>
</p>

Displays a FontAwesome icon.

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
import { Icon } from 'chayns-components';

// ...

<Icon {...} />
```

## Props

The `Icon`-component takes the following props:

| Name                                | Type                                                              | Default | Required |
| ----------------------------------- | ----------------------------------------------------------------- | ------- | :------: |
| [icon](#icon)                       | `string \| { iconName: string, prefix: string } \| Array<string>` |         |    ✓     |
| [className](#classname)             | `string`                                                          | `''`    |          |
| [style](#style)                     | `{ [key: string]: number \| string }`                             |         |          |
| [onClick](#onclick)                 | `function`                                                        |         |          |
| [disabled](#disabled)               | `boolean`                                                         | `false` |          |
| [stopPropagation](#stoppropagation) | `boolean`                                                         | `false` |          |

### `icon`

```ts
icon: string | { iconName: string, prefix: string } | Array<string>;
```

The icon to display. Supply a string or an array of strings like this:
`fa fa-plane`. Search for icons and their strings on
https://fontawesome.com/icons/. For backwards compatibility you can also specify
an icon object from the `@fortawesome`-packages, but this should not be used
going forward.

---

### `className`

```ts
className?: string
```

A classname string that will be applied to the HTML element of the icon.

---

### `style`

```ts
style?: { [key: string]: number | string }
```

A React style object that will be applied ot the `<i>`-element of the icon.

---

### `onClick`

```ts
onClick?: function
```

A callback that is called for the `onclick`-event on the icon.

---

### `disabled`

```ts
disabled?: boolean
```

Disables any user interaction on the icon and renders it in a disabled style.

---

### `stopPropagation`

```ts
stopPropagation?: boolean
```

Wether to stop propagation of click events to parent elements.
