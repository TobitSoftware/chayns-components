import type { FileItem } from '@chayns-components/core';
import type { GalleryViewMode } from '../../types/gallery';

/**
 * Props for the prop-driven read-only gallery viewer.
 */
export interface GalleryViewerProps {
    /**
     * Provides the already known media items that should be rendered without local upload state.
     * @description
     * The viewer renders these files directly from props and does not mirror them into local component state.
     * @example
     * <GalleryViewer files={files} />
     * @optional
     */
    files?: FileItem[];
    /**
     * Controls whether the viewer may load the final media assets immediately.
     * @description
     * When set to `true`, the viewer renders and loads the actual images right away.
     * When set to `false`, the viewer keeps showing previews first and defers the final image load until this flag becomes `true`.
     * @default true
     * @example
     * <GalleryViewer files={files} shouldLoadImages={false} />
     * @optional
     */
    shouldLoadImages?: boolean;
    /**
     * Defines how the media tiles are arranged in read-only mode.
     * @description
     * Use this prop to switch between the supported viewer layouts for known media.
     * @default GalleryViewMode.GRID
     * @example
     * <GalleryViewer files={files} viewMode={GalleryViewMode.SQUARE} />
     * @optional
     */
    viewMode?: GalleryViewMode;
}
