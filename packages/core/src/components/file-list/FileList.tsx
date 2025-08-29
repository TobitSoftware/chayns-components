import React, { FC, useMemo } from 'react';
import List from '../list/List';
import { StyledFileList } from './FileList.styles';
import FileItem from './file-item/FileItem';

export interface IFileItem {
    id: string;
    name: string;
    size?: number;
    mimeType: string;
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
};

const FileList: FC<FileListProps> = ({ files, onRemove }) => {
    const content = useMemo(
        () =>
            files?.map(({ mimeType, size, name, id }) => (
                <FileItem
                    key={id}
                    id={id}
                    name={name}
                    size={size}
                    mimeType={mimeType}
                    onRemove={onRemove}
                />
            )),
        [files, onRemove],
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
