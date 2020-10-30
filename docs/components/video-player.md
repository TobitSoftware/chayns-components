<div align="center"><h1>VideoPlayer</h1></div>

Video player which tries to auto play video

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
import { VideoPlayer } from 'chayns-components';

// ...

<VideoPlayer {...} />
```

## Props

The `VideoPlayer`-component takes the following props:

| Name                      | Type                                   | Default          | Required |
| ------------------------- | -------------------------------------- | ---------------- | :------: |
| [style](#style)           | `{ [key: string]: string \| number }`  |                  |          |
| [className](#classname)   | `string`                               |                  |          |
| [reference](#reference)   | `function`                             |                  |          |
| [poster](#poster)         | `string`                               |                  |          |
| [sources](#sources)       | `Array<{ src: string, type: string }>` |                  |    ✓     |
| [icon](#icon)             | `string \| object`                     | `'fa fa-volume'` |          |
| [onUnMute](#onunmute)     | `function`                             | `() => { }`      |          |
| [onVideoEnd](#onvideoend) | `function`                             | `() => { }`      |          |

### `style`

```ts
style?: { [key: string]: string | number }
```

A React style object that will be applied to the video wrapper.

---

### `className`

```ts
className?: string
```

A classname string that will be applied to the video wrapper.

---

### `reference`

```ts
reference?: function
```

A function that will be invoked with a reference to the video wrapper.

---

### `poster`

```ts
poster?: string
```

Specifies an image to be shown while the video is downloading, or until the user
hits the play button

---

### `sources`

```ts
sources: Array<{ src: string, type: string }>
```

The <video> tag contains one or more <source> tags with different video sources.
The browser will choose the first source it supports.

---

### `icon`

```ts
icon?: string | object
```

Displays an icon on the right side of the video when muted. Supply a
FontAwesome-string like `"fa fa-mute"`.

---

### `onUnMute`

```ts
onUnMute?: function
```

Is called when video is unmuted or directly played (with sound)

---

### `onVideoEnd`

```ts
onVideoEnd?: function
```

Is called when video ends
