import type { FileItem } from '@chayns-components/core';
import type { GalleryRef } from '../Gallery.types';

/**
 * Props for the editable gallery component.
 */
export interface GalleryEditorProps {
    /**
     * Enables drag and drop file selection inside the editor grid.
     * @description
     * When enabled, users can drop local image or video files onto the editor grid to start the upload flow.
     * @default false
     * @example
     * <GalleryEditor allowDragAndDrop files={files} />
     * @optional
     */
    allowDragAndDrop?: boolean;
    /**
     * Defines the dialog message that is shown when a duplicate upload is detected.
     * @description
     * The message is shown when a newly uploaded file resolves to a URL that already exists in the editor state.
     * @default 'Diese Datei ist bereits vorhanden'
     * @example
     * <GalleryEditor doubleFileDialogMessage="This file already exists." files={files} />
     * @optional
     */
    doubleFileDialogMessage?: string;
    /**
     * Defines the minimum width of one tile in the editor grid.
     * @description
     * The editor uses this value to size the responsive grid columns that hold uploaded items and the add-tile.
     * @default 100
     * @example
     * <GalleryEditor fileMinWidth={140} files={files} />
     * @optional
     */
    fileMinWidth?: number;
    /**
     * Defines the icon that is shown in the add-file tile.
     * @description
     * The editor renders this icon inside the tile that opens the file picker for adding more items.
     * @default 'fa fa-plus'
     * @example
     * <GalleryEditor addFileIcon="fa fa-image-circle-plus" files={files} />
     * @optional
     */
    addFileIcon?: string;
    /**
     * Provides already uploaded media items that should be merged into the editor state.
     * @description
     * These files represent the externally known uploaded baseline. The editor may additionally hold local pending uploads.
     * @example
     * <GalleryEditor files={files} />
     * @optional
     */
    files?: FileItem[];
    /**
     * Limits how many files can be managed by the editor.
     * @description
     * After the limit is reached, the add-tile is hidden and additional file selection is ignored.
     * @example
     * <GalleryEditor files={files} maxFiles={6} />
     * @optional
     */
    maxFiles?: number;
    /**
     * Is called after a file has been uploaded successfully.
     * @description
     * The callback receives the uploaded file representation so the consuming state can persist it externally.
     * @example
     * <GalleryEditor onAdd={(file) => setFiles((prev) => [...prev, file])} />
     * @optional
     */
    onAdd?: (file: FileItem) => void;
    /**
     * Is called whenever the internal item count changes, including local pending uploads.
     * @description
     * Use this callback when surrounding UI needs to react to the number of currently managed items.
     * @example
     * <GalleryEditor onFileCountChange={(count) => console.log(count)} />
     * @optional
     */
    onFileCountChange?: (fileCount: number) => void;
    /**
     * Is called after an uploaded file has been removed.
     * @description
     * The callback receives the removed uploaded file so the consuming state can remove it from its controlled `files` array.
     * @example
     * <GalleryEditor onRemove={(file) => removeFile(file.id)} />
     * @optional
     */
    onRemove?: (file: FileItem) => void;
}

export type GalleryEditorRef = GalleryRef;
