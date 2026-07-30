# @chayns-components/translation

React component package providing `AdaptiveTranslation` for chayns applications.

Documented components: `AdaptiveTranslation`.

## Import

```ts
import { AdaptiveTranslation } from '@chayns-components/translation';
```

## Typical Usage

```tsx
<AdaptiveTranslation from={undefined} to={undefined}>
    {'Hallo'}
</AdaptiveTranslation>
```

## AdaptiveTranslation

`AdaptiveTranslation` is exported by `@chayns-components/translation` and should be imported from
the public package entry point.

### Import

```ts
import { AdaptiveTranslation } from '@chayns-components/translation';
```

### Examples

#### General

```tsx
<AdaptiveTranslation from={undefined} to={undefined}>
    {'Hallo'}
</AdaptiveTranslation>
```

### Props

| name                   | type                                                                                                                                                                                                                | required | description                                                                          |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------ |
| `children`             | `TranslationChildren`                                                                                                                                                                                               | yes      | The Text that should be translated.                                                  |
| `className`            | `string \| undefined`                                                                                                                                                                                               | no       | The className of the element.                                                        |
| `from`                 | `Language.German \| Language.English \| Language.Dutch \| Language.French \| Language.Spanish \| Language.Italian \| Language.Portuguese \| Language.Turkish \| Language.Polish \| Language.Ukrainian \| undefined` | no       | The language from which the text should be translated.                               |
| `onStateChange`        | `((isLoading: boolean, isFetching: boolean) => void) \| undefined`                                                                                                                                                  | no       | Function to be executed when the state of the translation is changed.                |
| `shouldDisableOpacity` | `boolean \| undefined`                                                                                                                                                                                              | no       | Whether the opacity change should be disabled.                                       |
| `style`                | `CSSProperties \| undefined`                                                                                                                                                                                        | no       | Optional styles of the HTML element.                                                 |
| `tagName`              | `keyof IntrinsicElements \| undefined`                                                                                                                                                                              | no       | The HTML tag of the children.                                                        |
| `text`                 | `string \| undefined`                                                                                                                                                                                               | no       | The text that should be translated. Only active if the children is type of function. |
| `textType`             | `string \| undefined`                                                                                                                                                                                               | no       | The type of the text.                                                                |
| `to`                   | `Language.German \| Language.English \| Language.Dutch \| Language.French \| Language.Spanish \| Language.Italian \| Language.Portuguese \| Language.Turkish \| Language.Polish \| Language.Ukrainian \| undefined` | no       | The language to which the text should be translated.                                 |

### Types

No additional exported types documented.

### Usage Notes

- Import `AdaptiveTranslation` directly from `@chayns-components/translation` instead of internal
  source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use
  case.
- Pay special attention to required props: `children`.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/translation/src/...`; always use the
  public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
