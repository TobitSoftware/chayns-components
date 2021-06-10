<h1 align="center">Signature</h1>

<p align="center">
    <a href="/src/react-chayns-signature/component/Signature.jsx">Source</a>
</p>

A component to let the user subscribe

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
import { Signature } from 'chayns-components';

// ...

<Signature {...} />
```

## Props

The `Signature`-component takes the following props:

| Name                        | Type       | Default | Required |
| --------------------------- | ---------- | ------- | :------: |
| [onSubscribe](#onsubscribe) | `function` |         |          |

### `onSubscribe`

```ts
onSubscribe?: function
```

callback which is called when the user subscribes
