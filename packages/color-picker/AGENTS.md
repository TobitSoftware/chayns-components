# @chayns-components/color-picker

React component package providing 4 documented components for chayns applications.

Documented components: `ColorPicker`, `ColorPickerPopup`, `HueSlider`, `TransparencySlider`.

## Import

```ts
import { ColorPicker, ColorPickerPopup, HueSlider } from '@chayns-components/color-picker';
```

## Typical Usage

```tsx
<ColorPicker />
```

## Components

- `ColorPicker`
- `ColorPickerPopup`
- `HueSlider`
- `TransparencySlider`

## ColorPicker

`ColorPicker` is exported by `@chayns-components/color-picker` and should be imported from the public package entry point.

### Import

```ts
import { ColorPicker } from '@chayns-components/color-picker';
```

### Examples

#### General

```tsx
<ColorPicker />
```

#### With Custom Children

```tsx
<ColorPicker />
```

#### With Preset Colors

```tsx
<ColorPicker
    shouldShowPresetColors
/>
```

#### With Transparency Slider

```tsx
<ColorPicker
    shouldShowTransparencySlider
/>
```

#### With More Options

```tsx
<ColorPicker
    shouldShowMoreOptions
/>
```

#### Show Plain

```tsx
<ColorPicker
    shouldShowAsPopup={false}
    shouldShowMoreOptions
    shouldShowTransparencySlider
    shouldShowPresetColors
/>
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `ColorPicker` directly from `@chayns-components/color-picker` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/color-picker/src/...`; always use the public package export.
## ColorPickerPopup

`ColorPickerPopup` is exported by `@chayns-components/color-picker` and should be imported from the public package entry point.

### Import

```ts
import { ColorPickerPopup } from '@chayns-components/color-picker';
```

### Examples

#### General

```tsx
<ColorPickerPopup />
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `ColorPickerPopup` directly from `@chayns-components/color-picker` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/color-picker/src/...`; always use the public package export.
## HueSlider

`HueSlider` is exported by `@chayns-components/color-picker` and should be imported from the public package entry point.

### Import

```ts
import { HueSlider } from '@chayns-components/color-picker';
```

### Examples

#### General

```tsx
<HueSlider />
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `HueSlider` directly from `@chayns-components/color-picker` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/color-picker/src/...`; always use the public package export.
## TransparencySlider

`TransparencySlider` is exported by `@chayns-components/color-picker` and should be imported from the public package entry point.

### Import

```ts
import { TransparencySlider } from '@chayns-components/color-picker';
```

### Examples

#### General

```tsx
<TransparencySlider
    color={'rgba(255, 0, 0, 1)'}
/>
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `TransparencySlider` directly from `@chayns-components/color-picker` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/color-picker/src/...`; always use the public package export.
