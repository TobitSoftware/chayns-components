<div align="center"><h1>Accordion</h1></div>

Accordions are collapsible sections that are toggled by interacting with a
permanently visible header.

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
import { Accordion } from 'chayns-components';

// ...

<Accordion {...} />
```

## Props

The `Accordion`-component takes the following props:

| Name                                          | Type                                                 | Default            | Required |
| --------------------------------------------- | ---------------------------------------------------- | ------------------ | :------: |
| [head](#head)                                 | `ReactNode \| { open: ReactNode, close: ReactNode }` |                    |    ✓     |
| [headMultiline](#headmultiline)               | `boolean`                                            | `false`            |          |
| [headClassNames](#headclassnames)             | `string \| Array<string> \| object`                  |                    |          |
| [headCustomAttributes](#headcustomattributes) | `object`                                             |                    |          |
| [children](#children)                         | `ReactNode`                                          |                    |    ✓     |
| [right](#right)                               | `ReactNode \| { open: ReactNode, close: ReactNode }` |                    |          |
| [renderClosed](#renderclosed)                 | `boolean`                                            | `false`            |          |
| [isWrapped](#iswrapped)                       | `boolean`                                            | `false`            |          |
| [dataGroup](#datagroup)                       | `string`                                             |                    |          |
| [className](#classname)                       | `string`                                             | `''`               |          |
| [id](#id)                                     | `string`                                             |                    |          |
| [style](#style)                               | `{ [key: string]: string \| number }`                |                    |          |
| [styleBody](#stylebody)                       | `{ [key: string]: string \| number }`                |                    |          |
| [onOpen](#onopen)                             | `function`                                           |                    |          |
| [onClose](#onclose)                           | `function`                                           |                    |          |
| [defaultOpened](#defaultopened)               | `boolean`                                            |                    |          |
| [reference](#reference)                       | `function`                                           |                    |          |
| [autogrow](#autogrow)                         | `boolean`                                            | `false`            |          |
| [open](#open)                                 | `boolean`                                            |                    |          |
| [icon](#icon)                                 | `object \| string \| ReactNode`                      | `'ts-angle-right'` |          |
| [noRotate](#norotate)                         | `boolean`                                            | `false`            |          |
| [fixed](#fixed)                               | `boolean`                                            | `false`            |          |
| [noIcon](#noicon)                             | `boolean`                                            | `false`            |          |
| [onSearch](#onsearch)                         | `function`                                           |                    |          |
| [onSearchEnter](#onsearchenter)               | `function`                                           |                    |          |
| [searchPlaceholder](#searchplaceholder)       | `string`                                             | `''`               |          |
| [searchValue](#searchvalue)                   | `string`                                             |                    |          |
| [removeContentClosed](#removecontentclosed)   | `boolean`                                            | `false`            |          |
| [onClick](#onclick)                           | `function`                                           |                    |          |
| [disabled](#disabled)                         | `boolean`                                            | `false`            |          |
| [controlled](#controlled)                     | `boolean`                                            | `false`            |          |

### `head`

```ts
head: ReactNode | { open: ReactNode, close: ReactNode };
```

The component that should be displayed in the accordion head when it is closed.
Can be a `string`, React node or object like this:
`{ open: OpenComponent, close: CloseComponent }`. If an object is provided, the
components will be swapped based on the opening state.

---

### `headMultiline`

```ts
headMultiline?: boolean
```

Allows text to wrap inside of the head.

---

### `headClassNames`

```ts
headClassNames?: string | Array<string> | object
```

Additional classnames to be applied to the head. Can be specified as a `string`,
`string[]` or `{[key: string]: boolean}`, which will be passed to the
[`classnames`](https://www.npmjs.com/package/classnames) function.

---

### `headCustomAttributes`

```ts
headCustomAttributes?: object
```

Custom HTML attributes that will be added to the `<div>` that contains the head
component.

---

### `children`

```ts
children: ReactNode;
```

The content the Accordion reveals when it is open. To get proper spacing inside
of the Accordion body, supply a `<div>` with the classname `accordion__content`
applied to it.

---

### `right`

```ts
right?: ReactNode | { open: ReactNode, close: ReactNode }
```

Component that will be shown on the right side of the component. Typically a
badge. If you want different components for the open and closed state, supply an
object: `{ open: ..., closed: ... }`.

---

### `renderClosed`

```ts
renderClosed?: boolean
```

Render the Accordion content, even if it is closed.

---

### `isWrapped`

```ts
isWrapped?: boolean
```

Enables the wrapped Accordion style. Use this if the Accordion is nested inside
of another Accordion.

---

### `dataGroup`

```ts
dataGroup?: string
```

A string identifier for a group of Accordions. Only one Accordion of a group
that have the same `dataGroup`-prop can be open.

---

### `className`

```ts
className?: string
```

A classname that will be applied to the outer most `<div>`-wrapper of the
Accordion.

---

### `id`

```ts
id?: string
```

An HTML id that will be applied to the outer most `<div>`-wrapper.

---

### `style`

```ts
style?: { [key: string]: string | number }
```

A React style object that will be applied to the outer most `<div>`-wrapper of
the Accordion.

---

### `styleBody`

```ts
styleBody?: { [key: string]: string | number }
```

A React style object that will be applied to the body of the Accordion.

---

### `onOpen`

```ts
onOpen?: function
```

A callback that is called when the Accordion gets opened.

---

### `onClose`

```ts
onClose?: function
```

A callback that is called when the Accordion gets closed.

---

### `defaultOpened`

```ts
defaultOpened?: boolean
```

Wether the Accordion should be opened by default (when it first gets rendered).

---

### `reference`

```ts
reference?: function
```

A function that receives the ref of the outer most `<div>`-element of the
Accordion.

---

### `autogrow`

```ts
autogrow?: boolean
```

Wether the Accordion should adjust its height in the opened state.

---

### `open`

```ts
open?: boolean
```

Control the open state.

---

### `icon`

```ts
icon?: object | string | ReactNode
```

The icon that is displayed to the left of the Accordion head. Supply a
FontAwesome string like `"fa fa-plane"` or a React component.

---

### `noRotate`

```ts
noRotate?: boolean
```

Disable the icon rotation.

---

### `fixed`

```ts
fixed?: boolean
```

Disable the opening and closing logic. The Accordion will be stuck in one state.

---

### `noIcon`

```ts
noIcon?: boolean
```

Remove the Accordion to the left of the head.

---

### `onSearch`

```ts
onSearch?: function
```

A callback that will be called when the text in the search field on the right
changes. This will also enable the search field.

---

### `onSearchEnter`

```ts
onSearchEnter?: function
```

A callback that will be called when the enter-key is pressed in the search
field.

---

### `searchPlaceholder`

```ts
searchPlaceholder?: string
```

The placeholder for the search field.

---

### `searchValue`

```ts
searchValue?: string
```

The value for the search field (for making a controlled input).

---

### `removeContentClosed`

```ts
removeContentClosed?: boolean
```

Remove content from the Accordion body when it is closing.

---

### `onClick`

```ts
onClick?: function
```

Add a click listener for the Accordion head.

---

### `disabled`

```ts
disabled?: boolean
```

Disables the Accordion, which changes the style and removes any interactions.

---

### `controlled`

```ts
controlled?: boolean
```

When set, the open-prop updates and onChange does not update the internal state.
