<h1 align="center">AnimationWrapper</h1>

<p align="center">
    <a href="src/react-chayns-animation_wrapper/component/AnimationWrapper.jsx">Source</a>
</p>

The AnimationWrapper provides an eye-catching initial animation to its children.

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
import { AnimationWrapper } from 'chayns-components';

// ...

<AnimationWrapper {...} />
```

## Props

The `AnimationWrapper`-component takes the following props:

| Name                            | Type        | Default   | Required |
| ------------------------------- | ----------- | --------- | :------: |
| [children](#children)           | `ReactNode` | `<div />` |          |
| [animationTime](#animationtime) | `number`    | `0.2`     |          |
| [setAutoTime](#setautotime)     | `number`    | `400`     |          |

### `children`

```ts
children?: ReactNode
```

The children that should be animated.

---

### `animationTime`

```ts
animationTime?: number
```

The duration of the animation in seconds.

---

### `setAutoTime`

```ts
setAutoTime?: number
```

The time until the height of the content is set to auto to reflect changes in
children size.
