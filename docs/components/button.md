<div align="center"><h1>Button</h1></div>

You can import the Button-component like this:

```jsx
import { Button } from 'chayns-components';
```

and use it like this:

```jsx
<Button
    onClick={() => {
        console.log('I have been clicked!');
    }}
>
    Click Me!
</Button>
```

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
import { Button } from 'chayns-components';

// ...

<Button {...} />
```

## Props

The `Button`-component takes the following props:

| Name                                | Type        | Default    | Required |
| ----------------------------------- | ----------- | ---------- | :------: |
| [children](#children)               | `ReactNode` |            |    ✓     |
| [chooseButton](#choosebutton)       | `boolean`   | `false`    |          |
| [disabled](#disabled)               | `boolean`   | `false`    |          |
| [onClick](#onclick)                 | `function`  |            |          |
| [className](#classname)             | `string`    |            |          |
| [icon](#icon)                       | `string     | object`    |          |  |
| [secondary](#secondary)             | `boolean`   | `false`    |          |
| [stopPropagation](#stoppropagation) | `boolean`   | `false`    |          |
| [type](#type)                       | `enum`      | `'button'` |          |

### `children`

```ts
children: ReactNode;
```

String or components that are rendered inside of the button.

---

### `chooseButton`

```ts
chooseButton?: boolean
```

Renders the button on the "ChooseButton"-style. Alternatively use the
`ChooseButton`-component.

---

### `disabled`

```ts
disabled?: boolean
```

Renders the button as disabled and disables click events.

---

### `onClick`

```ts
onClick?: function
```

Will be called after the button has been clicked with the event as the first
parameter.

---

### `className`

```ts
className?: string
```

String of classnames that should be added to the button.

---

### `icon`

```ts
icon?: string | object
```

An optional icon that is displayed on the left of the button. Supply a
FontAwesome icon like this: "fa fa-plane"

---

### `secondary`

```ts
secondary?: boolean
```

Render the button in a secondary style.

---

### `stopPropagation`

```ts
stopPropagation?: boolean
```

Stop the event propagation on click.

---

### `type`

```ts
type?: enum
```

Set the type for the native button HTML element.
