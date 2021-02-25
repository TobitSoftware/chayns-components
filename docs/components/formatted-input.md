<h1 align="center">FormattedInput</h1>

<p align="center">
    <a href="src/react-chayns-formatted_input/component/FormattedInput.jsx">Source</a>
</p>

A text input that automatically formats its input with a formatter. Since this
component is based on the `Input`-component, it takes any of the
`Input`-components props, which are not listed here.

This component only works as an uncontrolled component, meaning that it does not
take a `value`-prop.

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
import { FormattedInput } from 'chayns-components';

// ...

<FormattedInput {...} />
```

## Props

The `FormattedInput`-component takes the following props:

| Name                                  | Type        | Default | Required |
| ------------------------------------- | ----------- | ------- | :------: |
| [initialFormatter](#initialformatter) | `Formatter` |         |    ✓     |
| [onChange](#onchange)                 | `function`  |         |          |
| [defaultValue](#defaultvalue)         | `any`       |         |          |

### `initialFormatter`

```ts
initialFormatter: Formatter;
```

An instance of a formatter that will be used to format the value of the input.

---

### `onChange`

```ts
onChange?: function
```

The function that will be called on change.

---

### `defaultValue`

```ts
defaultValue?: any
```

The initial value of the input.
