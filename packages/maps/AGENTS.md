# @chayns-components/maps

React component package providing `PositionInput` for chayns applications.

Documented components: `PositionInput`.

## Import

```ts
import { PositionInput } from '@chayns-components/maps';
```

## Typical Usage

```tsx
<PositionInput
    apiToken={'AIzaSyCicm5YKKdfym2UtjVwuoSvMAL9uKD_yxo'}
    searchPlaceholder={'Stadt suchen'}
/>
```

## PositionInput

`PositionInput` is exported by `@chayns-components/maps` and should be imported from the public
package entry point.

### Import

```ts
import { PositionInput } from '@chayns-components/maps';
```

### Examples

#### General

```tsx
<PositionInput
    apiToken={'AIzaSyCicm5YKKdfym2UtjVwuoSvMAL9uKD_yxo'}
    searchPlaceholder={'Stadt suchen'}
/>
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `PositionInput` directly from `@chayns-components/maps` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use
  case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/maps/src/...`; always use the public
  package export.
