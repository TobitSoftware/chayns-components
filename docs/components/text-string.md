<h1 align="center">TextString</h1>

<p align="center">
    <a href="src/react-chayns-textstring/component/TextString.jsx">Source</a>
</p>

Loads text strings from our database and displays them. Handles replacements and
changing the string via `CTRL` + `Click` (only internal).

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
import { TextString } from 'chayns-components';

// ...

<TextString {...} />
```

## Props

The `TextString`-component takes the following props:

| Name                                                      | Type                                            | Default | Required |
| --------------------------------------------------------- | ----------------------------------------------- | ------- | :------: |
| [stringName](#stringname)                                 | `string`                                        |         |          |
| [replacements](#replacements)                             | `{ [key: string]: string \| number }`           | `{}`    |          |
| [children](#children)                                     | `ReactNode`                                     | `<p />` |          |
| [useDangerouslySetInnerHTML](#usedangerouslysetinnerhtml) | `boolean`                                       | `false` |          |
| [language](#language)                                     | `string`                                        |         |          |
| [fallback](#fallback)                                     | `string`                                        | `''`    |          |
| [setProps](#setprops)                                     | `{ [key: string]: object \| string \| number }` | `{}`    |          |
| [preventNoTranslate](#preventnotranslate)                 | `boolean`                                       | `false` |          |

### `stringName`

```ts
stringName?: string
```

The string id of the text you want to display.

---

### `replacements`

```ts
replacements?: { [key: string]: string | number }
```

An map of replacements in the form of an object with the string that should be
replaced as its key and the replacement as its value.

---

### `children`

```ts
children?: ReactNode
```

The child node the text should be rendered into.

---

### `useDangerouslySetInnerHTML`

```ts
useDangerouslySetInnerHTML?: boolean
```

Wether the component should render HTML content in the string.

---

### `language`

```ts
language?: string
```

The language of the string, provided as a
[ISO 639-1](https://de.wikipedia.org/wiki/ISO_639#ISO_639-1) code. Please note
that the language has to be loaded beforehand for this to work.

---

### `fallback`

```ts
fallback?: string
```

A fallback string that will be displayed if the main string failed to load.

---

### `setProps`

```ts
setProps?: { [key: string]: object | string | number }
```

The string names of the children props, e.g. placeholder or accordion head.

---

### `preventNoTranslate`

```ts
preventNoTranslate?: boolean
```

Prevents setting the `no-translate` class to the children when the language of
the text string matches the current language of the user.
