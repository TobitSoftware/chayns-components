<h1 align="center">Slider</h1>

<p align="center">
    <a href="/src/react-chayns-slider/component/Slider.jsx">Source</a>
</p>

A horizontal track with a thumb that can be moved between a minimum and a
maximum value.

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
import { Slider } from 'chayns-components';

// ...

<Slider {...} />
```

## Props

The `Slider`-component takes the following props:

| Name                                    | Type                                  | Default                                                                                             | Required |
| --------------------------------------- | ------------------------------------- | --------------------------------------------------------------------------------------------------- | :------: |
| [min](#min)                             | `number`                              | `0`                                                                                                 |          |
| [max](#max)                             | `number`                              | `100`                                                                                               |          |
| [step](#step)                           | `number`                              |                                                                                                     |          |
| [defaultValue](#defaultvalue)           | `number`                              | `0`                                                                                                 |          |
| [value](#value)                         | `number`                              |                                                                                                     |          |
| [style](#style)                         | `{ [key: string]: number \| string }` |                                                                                                     |          |
| [className](#classname)                 | `string`                              |                                                                                                     |          |
| [showLabel](#showlabel)                 | `boolean`                             | `false`                                                                                             |          |
| [valueFormatter](#valueformatter)       | `function`                            | `(value1, value2) => value2 ? `${Math.round(value1)} - ${Math.round(value2)}` : Math.round(value1)` |          |
| [labelStyle](#labelstyle)               | `{ [key: string]: number \| string }` | `{ minWidth: '50px' }`                                                                              |          |
| [onChangeStart](#onchangestart)         | `function`                            |                                                                                                     |          |
| [onChange](#onchange)                   | `function`                            |                                                                                                     |          |
| [onChangeEnd](#onchangeend)             | `function`                            |                                                                                                     |          |
| [thumbStyle](#thumbstyle)               | `{ [key: string]: number \| string }` |                                                                                                     |          |
| [disabled](#disabled)                   | `boolean`                             | `false`                                                                                             |          |
| [vertical](#vertical)                   | `boolean`                             | `false`                                                                                             |          |
| [interval](#interval)                   | `boolean`                             | `false`                                                                                             |          |
| [minInterval](#mininterval)             | `number`                              |                                                                                                     |          |
| [maxInterval](#maxinterval)             | `number`                              |                                                                                                     |          |
| [defaultStartValue](#defaultstartvalue) | `number`                              | `0`                                                                                                 |          |
| [defaultEndValue](#defaultendvalue)     | `number`                              | `0`                                                                                                 |          |
| [startValue](#startvalue)               | `number`                              |                                                                                                     |          |
| [endValue](#endvalue)                   | `number`                              |                                                                                                     |          |
| [trackStyle](#trackstyle)               | `{ [key: string]: number \| string }` |                                                                                                     |          |
| [innerTrackStyle](#innertrackstyle)     | `{ [key: string]: number \| string }` |                                                                                                     |          |
| [showValueInThumb](#showvalueinthumb)   | `boolean`                             | `false`                                                                                             |          |
| [scaleOnDown](#scaleondown)             | `boolean`                             |                                                                                                     |          |
| [thumbWidth](#thumbwidth)               | `number`                              | `20`                                                                                                |          |

### `min`

```ts
min?: number
```

The minimum value of the slider.

---

### `max`

```ts
max?: number
```

The maximum value of the slider.

---

### `step`

```ts
step?: number
```

The amount of steps that the slider should be divided into.

---

### `defaultValue`

```ts
defaultValue?: number
```

A default value for the slider.

---

### `value`

```ts
value?: number
```

The current value of the slider.

---

### `style`

```ts
style?: { [key: string]: number | string }
```

A React style object that will be applied to root element.

---

### `className`

```ts
className?: string
```

A classname string that will be applied to the root element.

---

### `showLabel`

```ts
showLabel?: boolean
```

Wether the label should be shown. Only applies to horizontal sliders.

---

### `valueFormatter`

```ts
valueFormatter?: function
```

A function to format the current value for display in the label.

---

### `labelStyle`

```ts
labelStyle?: { [key: string]: number | string }
```

A React style object that will be applied to the label.

---

### `onChangeStart`

```ts
onChangeStart?: function
```

A callback that is invoked when the user starts changing the value.

---

### `onChange`

```ts
onChange?: function
```

A callback that is invoked when the user changes the value of the slider.

---

### `onChangeEnd`

```ts
onChangeEnd?: function
```

A callback that is invoked when the user stops changing the slider value.

---

### `thumbStyle`

```ts
thumbStyle?: { [key: string]: number | string }
```

A React style object that will be applied to the thumb.

---

### `disabled`

```ts
disabled?: boolean
```

Wether to ignore any user interaction and render the slider with a disabled
style.

---

### `vertical`

```ts
vertical?: boolean
```

Wether the slider should be vertical instead of horizontal.

---

### `interval`

```ts
interval?: boolean
```

Wether the slider should select a range instead of a single value. This will add
a second thumb for the user to adjust.

---

### `minInterval`

```ts
minInterval?: number
```

The minimum range that can be selected by the two thumbs.

---

### `maxInterval`

```ts
maxInterval?: number
```

The maximum range that can be selected by the two thumbs.

---

### `defaultStartValue`

```ts
defaultStartValue?: number
```

The default value for the left thumb.

---

### `defaultEndValue`

```ts
defaultEndValue?: number
```

The default value for the right thumb.

---

### `startValue`

```ts
startValue?: number
```

The current value of the left thumb.

---

### `endValue`

```ts
endValue?: number
```

The current value of the right thumb.

---

### `trackStyle`

```ts
trackStyle?: { [key: string]: number | string }
```

A React style object that will be applied to the track.

---

### `innerTrackStyle`

```ts
innerTrackStyle?: { [key: string]: number | string }
```

A React style object that will be applied ot the inner track.

---

### `showValueInThumb`

```ts
showValueInThumb?: boolean
```

Wether the current value should be shown inside the thumb.

---

### `scaleOnDown`

```ts
scaleOnDown?: boolean
```

Wether the slider should be scaled when the user grabs it on mobile devices.

---

### `thumbWidth`

```ts
thumbWidth?: number
```

The width of the thumb.
