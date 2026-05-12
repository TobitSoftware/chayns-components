import type { InternalFileItem } from '@chayns-components/core';

/**
 * Props for a single editable gallery tile.
 */
export interface GalleryEditorItemProps {
    /**
     * Provides the media item that should be rendered inside the tile.
     * @description
     * The item may represent a pending local upload or an already uploaded media file managed by the editor.
     * @example
     * <GalleryEditorItem fileItem={fileItem} handleDeleteFile={handleDeleteFile} onClick={handleOpen} />
     */
    fileItem: InternalFileItem;
    /**
     * Controls whether the item may load the final media source immediately.
     * @description
     * The item forwards this flag to the shared media renderer so uploaded media can stay on the preview until loading is allowed.
     * @default true
     * @optional
     */
    shouldLoadImages?: boolean;
    /**
     * Is called when the delete button is clicked in edit mode.
     * @description
     * The callback receives the internal item identifier so the editor can remove the item from its local state.
     * @example
     * <GalleryEditorItem handleDeleteFile={(id) => console.log(id)} fileItem={fileItem} onClick={handleOpen} />
     */
    handleDeleteFile: (id?: string) => void;
    /**
     * Defines the aspect ratio that should be reserved for the rendered media.
     * @description
     * Use this when the editor item should reserve a fixed tile ratio for uploaded previews.
     * @default 1
     * @example
     * <GalleryEditorItem fileItem={fileItem} handleDeleteFile={handleDeleteFile} onClick={handleOpen} ratio={1.5} />
     * @optional
     */
    ratio?: number;
    /**
     * Is called when the tile is clicked.
     * @description
     * The editor uses this callback to open the currently selected media within the slideshow flow.
     * @example
     * <GalleryEditorItem fileItem={fileItem} handleDeleteFile={handleDeleteFile} onClick={handleOpen} />
     */
    onClick: (file: InternalFileItem) => void;
}
