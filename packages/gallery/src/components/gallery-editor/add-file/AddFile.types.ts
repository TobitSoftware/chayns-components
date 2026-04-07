/**
 * Props for the add-file tile inside the gallery editor.
 */
export interface AddFileProps {
    /**
     * Is called with the selected local files.
     * @description
     * The editor add-tile uses this callback after the file picker resolves with the selected local image or video files.
     * @example
     * <AddFile onAdd={(files) => console.log(files)} />
     */
    onAdd: (files: File[]) => void;
}
