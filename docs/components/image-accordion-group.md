<h1 align="center">ImageAccordionGroup</h1>

<p align="center">
    <a href="src/react-chayns-image_accordion/component/ImageAccordionGroup.jsx">Source</a>
</p>

Groups several `ImageAccordion` components together, so only one of them can be
open at a time.

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
import { ImageAccordionGroup } from 'chayns-components';

// ...

<ImageAccordionGroup {...} />
```

## Props

The `ImageAccordionGroup`-component takes the following props:

| Name                      | Type        | Default | Required |
| ------------------------- | ----------- | ------- | :------: |
| [children](#children)     | `ReactNode` | `[]`    |          |
| [dataGroup](#datagroup)   | `string`    |         |          |
| [className](#classname)   | `string`    | `''`    |          |
| [reference](#reference)   | `function`  |         |          |
| [onHeadOpen](#onheadopen) | `function`  |         |          |

### `children`

```ts
children?: ReactNode
```

A list of `ImageAccordion` components, that are contained in this group.

---

### `dataGroup`

```ts
dataGroup?: string
```

An id that identifies this group. Accordions in groups that share the same
`dataGroup` close each other.

---

### `className`

```ts
className?: string
```

A classname string that will be applied to the container element.

---

### `reference`

```ts
reference?: function
```

A function that receives a reference to the root containers DOM node.

---

### `onHeadOpen`

```ts
onHeadOpen?: function
```

A callback that is invoked when one of the `ImageAccordion` components in this
group opens.
