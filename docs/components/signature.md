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

| Name                                              | Type       | Default | Required |
| ------------------------------------------------- | ---------- | ------- | :------: |
| [buttonText](#buttontext)                         | `string`   |         |          |
| [buttonWrapperClassName](#buttonwrapperclassname) | `string`   |         |          |
| [disabled](#disabled)                             | `boolean`  | `false` |          |
| [skipLoadAndSave](#skiploadandsave)               | `boolean`  | `false` |          |
| [onSubscribe](#onsubscribe)                       | `function` |         |          |
| [onEdit](#onedit)                                 | `function` |         |          |
| [forceInitialShow](#forceinitialshow)             | `boolean`  | `false` |          |
| [showDeleteIcon](#showdeleteicon)                 | `boolean`  | `false` |          |

### `buttonText`

```ts
buttonText?: string
```

The text shown in the button

---

### `buttonWrapperClassName`

```ts
buttonWrapperClassName?: string
```

the className to use on the button wrapping div

---

### `disabled`

```ts
disabled?: boolean
```

whether the subscribe button is disabled

---

### `skipLoadAndSave`

```ts
skipLoadAndSave?: boolean
```

disables loading and saving of the signature

---

### `onSubscribe`

```ts
onSubscribe?: function
```

callback which is called when the user subscribes

---

### `onEdit`

```ts
onEdit?: function
```

callback which is called when the user edits his subscription

---

### `forceInitialShow`

```ts
forceInitialShow?: boolean
```

Forces to show signature on initial render

---

### `showDeleteIcon`

```ts
showDeleteIcon?: boolean
```

whether the icon to delete the signature should be shown
