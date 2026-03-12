# @chayns-components/scanner

React component package providing `CodeScanner` for chayns applications.

Documented components: `CodeScanner`.

## Import

```ts
import { CodeScanner } from '@chayns-components/scanner';
```

## Typical Usage

```tsx
<CodeScanner
    errorMessages={{
                alreadyInUse: 'Die Kamera wird bereits von einer anderen Anwendung verwendet.',
                cameraNotAvailable: 'Die Kameranutzung ist nicht möglich.',
                noCodeFound: 'Es konnte kein Code gefunden werden.',
                noPermission: 'Um einen QR-Code zu scannen, aktiviere Deine Kamera.',
            }}
    shouldTriggerForSameCode
/>
```

## CodeScanner

`CodeScanner` is exported by `@chayns-components/scanner` and should be imported from the public package entry point.

### Import

```ts
import { CodeScanner } from '@chayns-components/scanner';
```

### Examples

#### General

```tsx
<CodeScanner
    errorMessages={{
                alreadyInUse: 'Die Kamera wird bereits von einer anderen Anwendung verwendet.',
                cameraNotAvailable: 'Die Kameranutzung ist nicht möglich.',
                noCodeFound: 'Es konnte kein Code gefunden werden.',
                noPermission: 'Um einen QR-Code zu scannen, aktiviere Deine Kamera.',
            }}
    shouldTriggerForSameCode
/>
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `CodeScanner` directly from `@chayns-components/scanner` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/scanner/src/...`; always use the public package export.
