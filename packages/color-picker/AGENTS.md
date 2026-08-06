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

| name | type | required | description |
| --- | --- | --- | --- |
| `alignment` | `PopupAlignment \| undefined` | no | The alignment of the popup |
| `children` | `ReactNode` | no | The element that should be rendered to trigger the ColorPicker popup on click. |
| `onPresetColorAdd` | `((presetColor: IPresetColor) => void) \| undefined` | no | Function to be executed when a preset color is added. |
| `onPresetColorRemove` | `((presetColorId: string) => void) \| undefined` | no | Function to be executed when a preset color is removed. |
| `onSelect` | `((color: string) => void) \| undefined` | no | Function to be executed when a color is selected. |
| `presetColors` | `IPresetColor[] \| undefined` | no | Colors the user can select from. |
| `selectedColor` | `string \| undefined` | no | The color that should be preselected. |
| `shouldEnableKeyboardHighlighting` | `boolean \| undefined` | no | Enables keyboard-only focus highlighting for color picker controls. |
| `shouldHideColorArea` | `boolean \| undefined` | no | Whether the color area should be displayed. |
| `shouldHideDefaultPresetColors` | `boolean \| undefined` | no | Whether the default preset colors should be hidden. |
| `shouldShowAsPopup` | `boolean \| undefined` | no | Whether the ColorPicker should be displayed inside a popup. |
| `shouldShowMoreOptions` | `boolean \| undefined` | no | Whether the more options accordion should be displayed. |
| `shouldShowPresetColors` | `boolean \| undefined` | no | Whether the preset colors should be displayed. |
| `shouldShowPreviewColorString` | `boolean \| undefined` | no | Whether the preview color should be displayed as text. |
| `shouldShowRoundPreviewColor` | `boolean \| undefined` | no | Whether the preview color should be displayed round. |
| `shouldShowTransparencySlider` | `boolean \| undefined` | no | Whether the transparency slider should be displayed. |
| `shouldUseSiteColors` | `boolean \| undefined` | no | Whether presetColors should be got and uploaded to the site storage. |

### Types

No additional exported types documented.

### Usage Notes

- Import `ColorPicker` directly from `@chayns-components/color-picker` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/color-picker/src/...`; always use the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
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

| name | type | required | description |
| --- | --- | --- | --- |
| `onPresetColorAdd` | `((presetColor: IPresetColor) => void) \| undefined` | no | No description available. |
| `onPresetColorRemove` | `((presetColorId: string) => void) \| undefined` | no | No description available. |
| `onSelect` | `((color: string) => void) \| undefined` | no | No description available. |
| `presetColors` | `IPresetColor[] \| undefined` | no | No description available. |
| `selectedColor` | `string \| undefined` | no | No description available. |
| `shouldEnableKeyboardHighlighting` | `boolean \| undefined` | no | No description available. |
| `shouldHideColorArea` | `boolean` | yes | No description available. |
| `shouldHideDefaultPresetColors` | `boolean` | yes | No description available. |
| `shouldShowMoreOptions` | `boolean` | yes | No description available. |
| `shouldShowPresetColors` | `boolean` | yes | No description available. |
| `shouldShowTransparencySlider` | `boolean` | yes | No description available. |
| `shouldUseSiteColors` | `boolean` | yes | No description available. |

### Types

No additional exported types documented.

### Usage Notes

- Import `ColorPickerPopup` directly from `@chayns-components/color-picker` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.
- Pay special attention to required props: `shouldHideColorArea`, `shouldHideDefaultPresetColors`, `shouldShowMoreOptions`, `shouldShowPresetColors`, `shouldShowTransparencySlider`, `shouldUseSiteColors`.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/color-picker/src/...`; always use the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
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

| name | type | required | description |
| --- | --- | --- | --- |
| `color` | `Color \| undefined` | no | The color that should be selected. |
| `onChange` | `((rgb: Color \| undefined, hsl: Color \| undefined) => void) \| undefined` | no | Function that will be executed when the color is changed. |
| `onEnd` | `((rgb: Color \| undefined, hsl: Color \| undefined) => void) \| undefined` | no | Function that will be executed when the color is ending to change. |
| `onStart` | `((rgb: Color \| undefined, hsl: Color \| undefined) => void) \| undefined` | no | Function that will be executed when the color is starting to change. |
| `opacity` | `number \| undefined` | no | The opacity of the Color. Is used if the color has no opacity value. |
| `shouldEnableKeyboardHighlighting` | `boolean \| undefined` | no | Enables keyboard-only focus highlighting for the slider. |

### Types

No additional exported types documented.

### Usage Notes

- Import `HueSlider` directly from `@chayns-components/color-picker` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/color-picker/src/...`; always use the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
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

| name | type | required | description |
| --- | --- | --- | --- |
| `color` | `string \| undefined` | no | The color that should be selected. |
| `onChange` | `((color: string) => void) \| undefined` | no | Function that will be executed when the opacity is changed. |
| `onEnd` | `((color: string) => void) \| undefined` | no | Function that will be executed when the opacity is ending to change. |
| `onStart` | `((color: string) => void) \| undefined` | no | Function that will be executed when the opacity is starting to change. |
| `shouldEnableKeyboardHighlighting` | `boolean \| undefined` | no | Enables keyboard-only focus highlighting for the slider. |

### Types

No additional exported types documented.

### Usage Notes

- Import `TransparencySlider` directly from `@chayns-components/color-picker` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/color-picker/src/...`; always use the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
