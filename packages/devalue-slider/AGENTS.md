# @chayns-components/devalue-slider

React component package providing `DevalueSlider` for chayns applications.

Documented components: `DevalueSlider`.

## Import

```ts
import { DevalueSlider } from '@chayns-components/devalue-slider';
```

## Typical Usage

```tsx
<DevalueSlider />
```

## DevalueSlider

This is a slider component that can be devalued.

For a normal devalue the user will drag the slider to the right and release it. It will show a
loading cursor and call the onDevalue handler. If the onDevalue handler does not give asuccessfully
response the thumb will snap back to the left. This gives feedback to the user and the person who
validates the devalue.

The developer should care about the some additional security measures to prevent fraud. For example
this could be an offline detection. For this you can disable the Slider with the isDisabled prop.
This will also cancel the current user drag.

### Import

```ts
import { DevalueSlider } from '@chayns-components/devalue-slider';
```

### Examples

#### General

```tsx
<DevalueSlider />
```

#### Custom Colors

```tsx
<DevalueSlider color={'blue'} devalueColor={'yellow'} />
```

#### Devalued Slider

```tsx
<DevalueSlider devalueTime={new Date(Date.now() - 5000)} />
```

#### Live Update

```tsx
<DevalueSlider />
```

#### Failing Devalue

```tsx
<DevalueSlider />
```

#### Success Devalue

```tsx
<DevalueSlider />
```

#### Early Devalue Time

```tsx
<DevalueSlider devalueTime={subHours(new Date(), 3)} />
```

#### Custom Label

```tsx
<DevalueSlider label={'ENTWERTEN'} />
```

### Props

| name                     | type                                          | required | description                                                                                                                                                                   |
| ------------------------ | --------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `backgroundColor`        | `BackgroundColor \| undefined`                | no       | The basic color of the slider.<br />This color is the background of the track before the slider is devalued.                                                                  |
| `devalueBackgroundColor` | `BackgroundColor \| undefined`                | no       | The devalue color of the slider.<br />This color fills the track from the left on user movement.<br />This color is the background of the timer after the slider is devalued. |
| `devalueTime`            | `Date \| undefined`                           | no       | If this slider was devalued, provide the time when it was devalued.<br />This will show a timer.                                                                              |
| `isDisabled`             | `boolean \| undefined`                        | no       | Disables the slider and cancels any active drags.                                                                                                                             |
| `label`                  | `string \| undefined`                         | no       | The label of the slider. The default value is "EINLÖSEN"                                                                                                                      |
| `onChange`               | `DevalueSliderOnChangeHandler \| undefined`   | no       | This function is called when the slider value changes.<br />With this function you can keep track of the movement of the slider.                                              |
| `onComplete`             | `DevalueSliderOnCompleteHandler \| undefined` | no       | This function is called when the slider is completed.<br />The slider is completed when the user devalues the slider<br />and the animation is completed.                     |
| `onDevalue`              | `DevalueSliderOnDevalueHandler \| undefined`  | no       | This function is called when the slider is devalued.                                                                                                                          |

### Types

- `DevalueSliderOnChangeHandler` ->
  `type DevalueSliderOnChangeHandler = (relativeValue: number) => void;`
- `DevalueSliderOnCompleteHandler` -> `type DevalueSliderOnCompleteHandler = () => void;`
- `DevalueSliderOnDevalueHandler` ->
  `type DevalueSliderOnDevalueHandler = () => Promise<DevalueSliderOnDevalueHandlerResult>;`

### Usage Notes

- Import `DevalueSlider` directly from `@chayns-components/devalue-slider` instead of internal
  source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use
  case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/devalue-slider/src/...`; always use
  the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
