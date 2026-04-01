# @chayns-components/gallery

React component package providing 3 documented components for chayns applications.

Documented components: `Gallery`, `GalleryEditor`, `GalleryViewer`.

## Import

```ts
import { Gallery, GalleryEditor, GalleryViewer } from '@chayns-components/gallery';
```

## Typical Usage

```tsx
<Gallery
    files={galleryStoryFiles}
/>
```

## Components

- `Gallery`
- `GalleryEditor`
- `GalleryViewer`

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
    files={galleryStoryFiles}
/>
```

#### Edit Mode

```tsx
<Gallery
    files={galleryStoryFiles.slice(0, 3)}
    isEditMode
    maxFiles={6}
/>
```

#### Wrapper Read Only Square

```tsx
<Gallery
    files={galleryViewerSquareFiles}
    viewMode={GalleryViewMode.SQUARE}
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
## GalleryEditor

`GalleryEditor` is exported by `@chayns-components/gallery` and should be imported from the public package entry point.

### Import

```ts
import { GalleryEditor } from '@chayns-components/gallery';
```

### Examples

#### General

```tsx
<GalleryEditor
    allowDragAndDrop={false}
    fileMinWidth={100}
    files={galleryStoryFiles.slice(0, 3)}
    maxFiles={6}
/>
```

#### Reached Max Files

```tsx
<GalleryEditor
    allowDragAndDrop={false}
    fileMinWidth={100}
    files={galleryStoryFiles.slice(0, 4)}
    maxFiles={4}
/>
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `GalleryEditor` directly from `@chayns-components/gallery` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/gallery/src/...`; always use the public package export.
## GalleryViewer

`GalleryViewer` is exported by `@chayns-components/gallery` and should be imported from the public package entry point.

### Import

```ts
import { GalleryViewer } from '@chayns-components/gallery';
```

### Examples

#### General

```tsx
<GalleryViewer
    files={galleryStoryFiles}
    viewMode={GalleryViewMode.GRID}
/>
```

#### Square Mode

```tsx
<GalleryViewer
    files={galleryViewerSquareFiles}
    viewMode={GalleryViewMode.SQUARE}
/>
```

#### Single Item Fallback Ratio

```tsx
<GalleryViewer
    files={[
            {
                id: 'single-fallback-image',
                file: {
                    id: 'fallback-1',
                    url: 'https://picsum.photos/id/1025/1200/900',
                },
            },
        ]}
    viewMode={GalleryViewMode.GRID}
/>
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `GalleryViewer` directly from `@chayns-components/gallery` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/gallery/src/...`; always use the public package export.
