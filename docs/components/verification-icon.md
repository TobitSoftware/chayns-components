<h1 align="center">VerificationIcon</h1>

<p align="center">
    <a href="/src/react-chayns-verification_icon/component/VerificationIcon.jsx">Source</a>
</p>

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
import { VerificationIcon } from 'chayns-components';

// ...

<VerificationIcon {...} />
```

## Props

The `VerificationIcon`-component takes the following props:

| Name                  | Type      | Default                        | Required |
| --------------------- | --------- | ------------------------------ | :------: |
| [name](#name)         | `string`  |                                |    ✓     |
| [design](#design)     | `number`  | `VerificationIcon.BLUE_DESIGN` |          |
| [verified](#verified) | `boolean` | `false`                        |          |

### `name`

```ts
name: string;
```

The username

---

### `design`

```ts
design?: number
```

The design of the icon. Use either `VerificationIcon.DEFAULT_DESIGN`,
`VerificationIcon.GRAY_DESIGN` or `VerificationIcon.BLUE_DESIGN`.

---

### `verified`

```ts
verified?: boolean
```

Whether the user is verified
