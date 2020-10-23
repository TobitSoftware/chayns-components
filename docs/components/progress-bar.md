<div align="center"><h1>ProgressBar</h1></div>

An animated progress bar that can show an actions progress or an indeterminate
state like a loading spinner.

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
import { ProgressBar } from 'chayns-components';

// ...

<ProgressBar {...} />
```

## Props

The `ProgressBar`-component takes the following props:

| Name                  | Type        | Default | Required |
| --------------------- | ----------- | ------- | :------: |
| [value](#value)       | `number`    |         |          |
| [children](#children) | `ReactNode` |         |          |
| [ready](#ready)       | `boolean`   | `false` |          |

### `value`

```ts
value?: number
```

The progress in percent (`0` - `100`).

---

### `children`

```ts
children?: ReactNode
```

A label that is shown beneath the progress bar.

---

### `ready`

```ts
ready?: boolean
```

When toggled on it will hide the progress bar in an animated transition and only
show its children.
