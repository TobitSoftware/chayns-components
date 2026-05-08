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
    files={galleryStoryFiles.slice(0, 3)}
    isEditMode={false}
    shouldLoadImages
    viewMode={GalleryViewMode.GRID}
/>
```

## Components

- `Gallery`
- `GalleryEditor`
- `GalleryViewer`

## Gallery

Die Wrapper-Komponente entscheidet zwischen Viewer und Editor und steuert das optionale verzögerte Laden der finalen Medien. Die Stories zeigen die typischen Einsatzfälle sowie die neue Preview-first-Ladelogik.

### Import

```ts
import { Gallery } from '@chayns-components/gallery';
```

### Examples

#### General

```tsx
<Gallery
    files={galleryStoryFiles.slice(0, 3)}
    isEditMode={false}
    shouldLoadImages
    viewMode={GalleryViewMode.GRID}
/>
```

#### Read Only Square

```tsx
<Gallery
    files={galleryViewerSquareFiles}
    isEditMode={false}
    shouldLoadImages
    viewMode={GalleryViewMode.SQUARE}
/>
```

#### Deferred Load Preview First

```tsx
<Gallery
    files={galleryStoryFiles}
    isEditMode={false}
    shouldLoadImages={false}
    viewMode={GalleryViewMode.GRID}
/>
```

#### Edit Mode

```tsx
<Gallery
    files={galleryPreviewFiles.slice(0, 3)}
    isEditMode
    shouldLoadImages
    viewMode={GalleryViewMode.GRID}
    maxFiles={6}
/>
```

#### Edit Mode Max Files Reached

```tsx
<Gallery
    files={galleryPreviewFiles.slice(0, 4)}
    isEditMode
    shouldLoadImages
    viewMode={GalleryViewMode.GRID}
    maxFiles={4}
/>
```

#### Edit Mode Custom Add Icon

```tsx
<Gallery
    files={galleryPreviewFiles.slice(0, 3)}
    isEditMode
    shouldLoadImages
    viewMode={GalleryViewMode.GRID}
    maxFiles={6}
    addFileIcon={'fa fa-image-circle-plus'}
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

Der Editor verwaltet lokale und externe Medien, unterstützt Drag-and-Drop und kann die endgültige Medienladung über `shouldLoadImages` verzögern.

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
    shouldLoadImages
/>
```

#### Dense Layout

```tsx
<GalleryEditor
    allowDragAndDrop={false}
    fileMinWidth={140}
    files={galleryPreviewFiles.slice(0, 4)}
    maxFiles={6}
    shouldLoadImages
/>
```

#### Max Files Reached

```tsx
<GalleryEditor
    allowDragAndDrop={false}
    fileMinWidth={100}
    files={galleryPreviewFiles.slice(0, 4)}
    maxFiles={4}
    shouldLoadImages
/>
```

#### Custom Add Icon

```tsx
<GalleryEditor
    allowDragAndDrop={false}
    fileMinWidth={100}
    files={galleryPreviewFiles.slice(0, 3)}
    maxFiles={6}
    shouldLoadImages
    addFileIcon={'fa fa-image-circle-plus'}
/>
```

#### Drag And Drop Enabled

```tsx
<GalleryEditor
    allowDragAndDrop
    fileMinWidth={100}
    files={galleryPreviewFiles.slice(0, 3)}
    maxFiles={6}
    shouldLoadImages
/>
```

#### Deferred Load Preview First

```tsx
<GalleryEditor
    allowDragAndDrop={false}
    fileMinWidth={100}
    files={galleryPreviewFiles.slice(0, 4)}
    maxFiles={6}
    shouldLoadImages={false}
/>
```

#### Video And Images

```tsx
<GalleryEditor
    allowDragAndDrop={false}
    fileMinWidth={100}
    files={[...galleryStoryFiles.slice(0, 3), ...galleryVideoFiles]}
    maxFiles={6}
    shouldLoadImages
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

Der read-only Viewer rendert bekannte Medien im Grid- oder Square-Layout und unterstützt das verzögerte Laden finaler Medien über `shouldLoadImages`.

### Import

```ts
import { GalleryViewer } from '@chayns-components/gallery';
```

### Examples

#### General

```tsx
<GalleryViewer
    files={galleryStoryFiles.slice(0, 3)}
    shouldLoadImages
    viewMode={GalleryViewMode.GRID}
/>
```

#### Square Mode

```tsx
<GalleryViewer
    files={galleryViewerSquareFiles}
    shouldLoadImages
    viewMode={GalleryViewMode.SQUARE}
/>
```

#### Mixed Media

```tsx
<GalleryViewer
    files={galleryStoryFiles}
    shouldLoadImages
    viewMode={GalleryViewMode.GRID}
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
    shouldLoadImages
    viewMode={GalleryViewMode.GRID}
/>
```

#### Deferred Load Preview First

```tsx
<GalleryViewer
    files={galleryPreviewFiles}
    shouldLoadImages={false}
    viewMode={GalleryViewMode.GRID}
/>
```

#### Video Focus

```tsx
<GalleryViewer
    files={galleryVideoFiles}
    shouldLoadImages
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
