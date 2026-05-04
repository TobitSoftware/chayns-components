/**
 * Props for the add-file tile inside the gallery editor.
 */
export interface AddFileProps {
    /**
     * Defines the icon that is displayed inside the add-file tile.
     * @description
     * This icon is shown in the tile that opens the file picker for adding new items to the gallery.
     * @default 'fa fa-plus'
     * @example
     * <AddFile addFileIcon="fa fa-image-circle-plus" onAdd={(files) => console.log(files)} />
     * @optional
     */
    addFileIcon?: string;
    /**
     * Is called with the selected local files.
     * @description
     * The editor add-tile uses this callback after the file picker resolves with the selected local image or video files.
     * @example
     * <AddFile onAdd={(files) => console.log(files)} />
     */
    onAdd: (files: File[]) => void;
}
