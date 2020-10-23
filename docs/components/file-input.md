<div align="center"><h1>FileInput</h1></div>

Accepts specified file types via dialog or drag and drop.

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
import { FileInput } from 'chayns-components';

// ...

<FileInput {...} />
```

## Props

The `FileInput`-component takes the following props:

| Name                                | Type                                                                                                                                                                                                                                                                                                                            | Default                                                                                                                                                                                                                                                                                                                                             | Required |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------: |
| [className](#classname)             | `string`                                                                                                                                                                                                                                                                                                                        |                                                                                                                                                                                                                                                                                                                                                     |          |
| [style](#style)                     | `{ [key: string]: string \| number }`                                                                                                                                                                                                                                                                                           |                                                                                                                                                                                                                                                                                                                                                     |          |
| [stopPropagation](#stoppropagation) | `boolean`                                                                                                                                                                                                                                                                                                                       | `false`                                                                                                                                                                                                                                                                                                                                             |          |
| [disabled](#disabled)               | `boolean`                                                                                                                                                                                                                                                                                                                       | `false`                                                                                                                                                                                                                                                                                                                                             |          |
| [errorMessages](#errormessages)     | `{ tooMuchFiles: string, fileTooBig: string, wrongFileType: string, permanentNoPermission: string, temporaryNoPermission: string }`                                                                                                                                                                                             | `{ tooMuchFiles: 'Du kannst nur ##NUMBER## Dateien hochladen.', fileTooBig: 'Es sind nur Dateien bis ##SIZE## erlaubt.', wrongFileType: 'Mindestens eine Datei hat das falsche Dateiformat.', permanentNoPermission: 'Bitte überprüfe die Einstellungen Deiner App und erlaube den Dateizugriff auf Deinem Gerät.', temporaryNoPermission: null, }` |          |
| [items](#items)                     | `Array<{ types: Array<string>, maxFileSize: number, maxNumberOfFiles: number, directory: boolean, onClick: function, onChange: function, className: string, style: { [key: string]: string \| number }, disabled: boolean, content: { text: string, icon: string \| object } \| { children: ReactNode \| Array<ReactNode> } }>` | `[ { types: [FileInput.types.ALL], maxFileSize: 4 * 1024 * 1024, // 4 MB maxNumberOfFiles: 0, // 0=infinity directory: false, onClick: null, onChange: null, className: null, style: null, disabled: false, content: null, }, ]`                                                                                                                    |          |

### `className`

```ts
className?: string
```

A classname string that is applied to the root element.

---

### `style`

```ts
style?: { [key: string]: string | number }
```

A React style object that is applied to the root element.

---

### `stopPropagation`

```ts
stopPropagation?: boolean
```

Wether to stop propagation of click events to parent elements.

---

### `disabled`

```ts
disabled?: boolean
```

Disables any interaction with the component and renders it in a disabled style.

---

### `errorMessages`

```ts
errorMessages?: { tooMuchFiles: string, fileTooBig: string, wrongFileType: string, permanentNoPermission: string, temporaryNoPermission: string }
```

Custom error messages for the component.

---

### `items`

```ts
items?: Array<{ types: Array<string>, maxFileSize: number, maxNumberOfFiles: number, directory: boolean, onClick: function, onChange: function, className: string, style: { [key: string]: string | number }, disabled: boolean, content: { text: string, icon: string | object } | { children: ReactNode | Array<ReactNode> } }>
```

The different fields that will be shown in the file input.
