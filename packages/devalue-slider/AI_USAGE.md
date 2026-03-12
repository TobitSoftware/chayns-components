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

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `DevalueSlider` directly from `@chayns-components/devalue-slider` instead of internal
  source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use
  case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/devalue-slider/src/...`; always use
  the public package export.
