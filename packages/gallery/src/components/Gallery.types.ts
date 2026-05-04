import type { FileItem } from '@chayns-components/core';
import type { GalleryViewMode } from '../types/gallery';

/**
 * Props for the public Gallery wrapper component.
 */
export interface GalleryProps {
    /**
     * Enables drag and drop while the component is used in edit mode.
     * @description
     * This prop only affects the editor path. In read-only mode, drag and drop stays disabled regardless of this value.
     * @default false
     * @example
     * <Gallery allowDragAndDrop isEditMode files={files} />
     * @optional
     */
    allowDragAndDrop?: boolean;
    /**
     * Defines the dialog message that is shown when a duplicate upload is detected.
     * @description
     * The message is used by the editor when a locally added file resolves to an already known uploaded file.
     * @default 'Diese Datei ist bereits vorhanden'
     * @example
     * <Gallery doubleFileDialogMessage="This file already exists." isEditMode files={files} />
     * @optional
     */
    doubleFileDialogMessage?: string;
    /**
     * Defines the minimum width of one tile in edit mode.
     * @description
     * The editor uses this value to build its responsive grid. It has no effect in the read-only viewer.
     * @default 100
     * @example
     * <Gallery fileMinWidth={140} isEditMode files={files} />
     * @optional
     */
    fileMinWidth?: number;
    /**
     * Defines the icon that is shown in the add-file tile in edit mode.
     * @description
     * The icon is forwarded to the editor and replaces the default plus icon on the add-tile.
     * @default 'fa fa-plus'
     * @example
     * <Gallery addFileIcon="fa fa-image-circle-plus" isEditMode files={files} />
     * @optional
     */
    addFileIcon?: string;
    /**
     * Provides already known media items that should be rendered by the gallery.
     * @description
     * In read-only mode, these files are rendered directly from props. In edit mode, they are used as the external baseline
     * for already uploaded media while local uploads are managed internally.
     * @example
     * <Gallery files={files} />
     * @optional
     */
    files?: FileItem[];
    /**
     * Enables the editable upload mode instead of the read-only viewer mode.
     * @description
     * When set to `true`, the public wrapper renders `GalleryEditor`. Otherwise it renders `GalleryViewer`.
     * @default false
     * @example
     * <Gallery isEditMode files={files} />
     * @optional
     */
    isEditMode?: boolean;
    /**
     * Limits how many files can be managed in edit mode.
     * @description
     * Once the limit is reached, the editor hides the add-tile and does not accept more files.
     * This prop has no effect in read-only mode.
     * @example
     * <Gallery isEditMode maxFiles={6} files={files} />
     * @optional
     */
    maxFiles?: number;
    /**
     * Is called after a file has been uploaded successfully in edit mode.
     * @description
     * The callback receives the uploaded file representation that should be merged into the consuming state.
     * It is never called by the read-only viewer.
     * @example
     * <Gallery isEditMode onAdd={(file) => setFiles((prev) => [...prev, file])} />
     * @optional
     */
    onAdd?: (file: FileItem) => void;
    /**
     * Is called whenever the internal item count changes in edit mode.
     * @description
     * This includes already uploaded files and locally pending uploads that are currently managed by the editor.
     * It is useful when surrounding UI needs to know whether uploads are still in progress.
     * @example
     * <Gallery isEditMode onFileCountChange={(count) => console.log(count)} />
     * @optional
     */
    onFileCountChange?: (fileCount: number) => void;
    /**
     * Is called after an uploaded file has been removed in edit mode.
     * @description
     * The callback receives the removed uploaded file so the consuming state can remove it as well.
     * It is never called by the read-only viewer.
     * @example
     * <Gallery isEditMode onRemove={(file) => removeFile(file.id)} />
     * @optional
     */
    onRemove?: (file: FileItem) => void;
    /**
     * Defines how known media items are arranged in read-only mode.
     * @description
     * This prop only affects the viewer path. The editor always uses its dedicated editable grid layout.
     * @default GalleryViewMode.GRID
     * @example
     * <Gallery files={files} viewMode={GalleryViewMode.SQUARE} />
     * @optional
     */
    viewMode?: GalleryViewMode;
}
