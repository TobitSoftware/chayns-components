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

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `AdaptiveTranslation` directly from `@chayns-components/translation` instead of internal
  source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use
  case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/translation/src/...`; always use the
  public package export.
