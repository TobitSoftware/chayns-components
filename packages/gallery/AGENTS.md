# @chayns-components/gallery

React component package providing `Gallery` for chayns applications.

Documented components: `Gallery`.

## Import

```ts
import { Gallery } from '@chayns-components/gallery';
```

## Typical Usage

```tsx
<Gallery
    files={[
                {
                    id: 'first-image',
                    file: {
                        id: '1',
                        url: 'https://tsimg.cloud/77896-21884/8aee1a304297729a4542b97325940a656a3da8f2.png',
                    },
                },
                {
                    id: 'second-image',
                    file: {
                        id: '2',
                        url: 'https://tsimg.cloud/77896-21884/54a117f35e5fb57520e64471461af5491c0eff06.png',
                    },
                },
                {
                    id: 'third-image',
                    file: {
                        id: '3',
                        url: 'https://tsimg.cloud/77896-21884/25399416f38c1d960f521a3530c8a2bc70a88bb9.png',
                    },
                },
            ]}
/>
```

## Gallery

`Gallery` is exported by `@chayns-components/gallery` and should be imported from the public package entry point.

### Import

```ts
import { Gallery } from '@chayns-components/gallery';
```

### Examples

#### General

```tsx
<Gallery
    files={[
                {
                    id: 'first-image',
                    file: {
                        id: '1',
                        url: 'https://tsimg.cloud/77896-21884/8aee1a304297729a4542b97325940a656a3da8f2.png',
                    },
                },
                {
                    id: 'second-image',
                    file: {
                        id: '2',
                        url: 'https://tsimg.cloud/77896-21884/54a117f35e5fb57520e64471461af5491c0eff06.png',
                    },
                },
                {
                    id: 'third-image',
                    file: {
                        id: '3',
                        url: 'https://tsimg.cloud/77896-21884/25399416f38c1d960f521a3530c8a2bc70a88bb9.png',
                    },
                },
            ]}
/>
```

#### Edit Mode

```tsx
<Gallery
    files={[
                {
                    id: 'first-image',
                    file: {
                        id: '1',
                        url: 'https://tsimg.cloud/77896-21884/8aee1a304297729a4542b97325940a656a3da8f2.png',
                    },
                },
                {
                    id: 'second-image',
                    file: {
                        id: '2',
                        url: 'https://tsimg.cloud/77896-21884/54a117f35e5fb57520e64471461af5491c0eff06.png',
                    },
                },
                {
                    id: 'third-image',
                    file: {
                        id: '3',
                        url: 'https://tsimg.cloud/77896-21884/25399416f38c1d960f521a3530c8a2bc70a88bb9.png',
                    },
                },
            ]}
    isEditMode
/>
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `Gallery` directly from `@chayns-components/gallery` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/gallery/src/...`; always use the public package export.
