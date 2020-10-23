<div align="center"><h1>SetupWizardItem</h1></div>

An item that represents one step in a `SetupWizard`.

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
import { SetupWizardItem } from 'chayns-components';

// ...

<SetupWizardItem {...} />
```

## Props

The `SetupWizardItem`-component takes the following props:

| Name                  | Type       | Default                                          | Required |
| --------------------- | ---------- | ------------------------------------------------ | :------: |
| [step](#step)         | `number`   |                                                  |    ✓     |
| [title](#title)       | `string`   |                                                  |    ✓     |
| [required](#required) | `boolean`  | `false`                                          |          |
| [right](#right)       | `ReactNode | { complete: ReactNode, notComplete: ReactNode }` |          |  |

### `step`

```ts
step: number;
```

The index of the step (`0`-based).

---

### `title`

```ts
title: string;
```

The title of the step.

---

### `required`

```ts
required?: boolean
```

Wether the step is required to continue the wizard.

---

### `right`

```ts
right?: ReactNode | { complete: ReactNode, notComplete: ReactNode }
```

A component that is shown on the right hand of the accordion head.
