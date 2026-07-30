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

Die Wrapper-Komponente entscheidet zwischen Viewer und Editor und steuert das optionale verzögerte
Laden der finalen Medien. Die Stories zeigen die typischen Einsatzfälle sowie die neue
Preview-first-Ladelogik.

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

| name                      | type                                         | required | description                                                                   |
| ------------------------- | -------------------------------------------- | -------- | ----------------------------------------------------------------------------- |
| `addFileIcon`             | `string \| undefined`                        | no       | Defines the icon that is shown in the add-file tile in edit mode.             |
| `allowDragAndDrop`        | `boolean \| undefined`                       | no       | Enables drag and drop while the component is used in edit mode.               |
| `doubleFileDialogMessage` | `string \| undefined`                        | no       | Defines the dialog message that is shown when a duplicate upload is detected. |
| `fileMinWidth`            | `number \| undefined`                        | no       | Defines the minimum width of one tile in edit mode.                           |
| `files`                   | `FileItem[] \| undefined`                    | no       | Provides already known media items that should be rendered by the gallery.    |
| `isEditMode`              | `boolean \| undefined`                       | no       | Enables the editable upload mode instead of the read-only viewer mode.        |
| `maxFiles`                | `number \| undefined`                        | no       | Limits how many files can be managed in edit mode.                            |
| `onAdd`                   | `((file: FileItem) => void) \| undefined`    | no       | Is called after a file has been uploaded successfully in edit mode.           |
| `onFileCountChange`       | `((fileCount: number) => void) \| undefined` | no       | Is called whenever the internal item count changes in edit mode.              |
| `onRemove`                | `((file: FileItem) => void) \| undefined`    | no       | Is called after an uploaded file has been removed in edit mode.               |
| `shouldLoadImages`        | `boolean \| undefined`                       | no       | Controls when the gallery is allowed to load the final media assets.          |
| `viewMode`                | `GalleryViewMode \| undefined`               | no       | Defines how known media items are arranged in read-only mode.                 |

### Types

- `GalleryViewMode` ->
  `enum GalleryViewMode {     /**      * Arranges visible items in a square-first layout.      */     SQUARE,     /**      * Arranges visible items in the gallery grid layout.      */     GRID, }`

### Usage Notes

- Import `Gallery` directly from `@chayns-components/gallery` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use
  case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/gallery/src/...`; always use the
  public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.

## GalleryEditor

Der Editor verwaltet lokale und externe Medien, unterstützt Drag-and-Drop und kann die endgültige
Medienladung über `shouldLoadImages` verzögern.

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

| name                      | type                                         | required | description                                                                          |
| ------------------------- | -------------------------------------------- | -------- | ------------------------------------------------------------------------------------ |
| `addFileIcon`             | `string \| undefined`                        | no       | Defines the icon that is shown in the add-file tile.                                 |
| `allowDragAndDrop`        | `boolean \| undefined`                       | no       | Enables drag and drop file selection inside the editor grid.                         |
| `doubleFileDialogMessage` | `string \| undefined`                        | no       | Defines the dialog message that is shown when a duplicate upload is detected.        |
| `fileMinWidth`            | `number \| undefined`                        | no       | Defines the minimum width of one tile in the editor grid.                            |
| `files`                   | `FileItem[] \| undefined`                    | no       | Provides already uploaded media items that should be merged into the editor state.   |
| `maxFiles`                | `number \| undefined`                        | no       | Limits how many files can be managed by the editor.                                  |
| `onAdd`                   | `((file: FileItem) => void) \| undefined`    | no       | Is called after a file has been uploaded successfully.                               |
| `onFileCountChange`       | `((fileCount: number) => void) \| undefined` | no       | Is called whenever the internal item count changes, including local pending uploads. |
| `onRemove`                | `((file: FileItem) => void) \| undefined`    | no       | Is called after an uploaded file has been removed.                                   |
| `shouldLoadImages`        | `boolean \| undefined`                       | no       | Controls whether the editor may load the final media assets immediately.             |

### Types

No additional exported types documented.

### Usage Notes

- Import `GalleryEditor` directly from `@chayns-components/gallery` instead of internal source
  paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use
  case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/gallery/src/...`; always use the
  public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.

## GalleryViewer

Der read-only Viewer rendert bekannte Medien im Grid- oder Square-Layout und unterstützt das
verzögerte Laden finaler Medien über `shouldLoadImages`.

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
<GalleryViewer files={galleryStoryFiles} shouldLoadImages viewMode={GalleryViewMode.GRID} />
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
<GalleryViewer files={galleryVideoFiles} shouldLoadImages viewMode={GalleryViewMode.GRID} />
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `GalleryViewer` directly from `@chayns-components/gallery` instead of internal source
  paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use
  case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/gallery/src/...`; always use the
  public package export.
