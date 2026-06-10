import React, { FC, useMemo } from 'react';
import List from '../list/List';
import { StyledFileList } from './FileList.styles';
import FileItem from './file-item/FileItem';

export interface IFileItem {
    id: string;
    name: string;
    size?: number;
    mimeType: string;
    source?: string | File;
}

export type FileListProps = {
    /**
     * Already uploaded files to display.
     */
    files?: IFileItem[];
    /**
     * A function to be executed when a file is removed.
     */
    onRemove?: (id: IFileItem['id']) => void;
    /**
     * Whether to show a download icon for files that have a `source` set.
     */
    shouldAllowDownload?: boolean;
};

const FileList: FC<FileListProps> = ({ files, onRemove, shouldAllowDownload }) => {
    const content = useMemo(
        () =>
            files?.map(({ mimeType, size, name, id, source }) => (
                <FileItem
                    key={id}
                    id={id}
                    name={name}
                    size={size}
                    mimeType={mimeType}
                    source={source}
                    onRemove={onRemove}
                    shouldAllowDownload={shouldAllowDownload}
                />
            )),
        [files, onRemove, shouldAllowDownload],
    );

    return useMemo(
        () => (
            <StyledFileList>
                <List>{content}</List>
            </StyledFileList>
        ),
        [content],
    );
};

FileList.displayName = 'FileList';

export default FileList;
