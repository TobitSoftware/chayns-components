import React, { FC, useMemo } from 'react';
import { TextStringProviderSSR } from '@chayns/textstrings';
import List from '../list/List';
import { StyledFileList } from './FileList.styles';
import FileItem from './file-item/FileItem';
import type { ContextMenuItem } from '../context-menu/ContextMenu.types';

export interface IFileItem {
    id: string;
    name: string;
    size?: number;
    mimeType: string;
    source?: string | File;
    /**
     * Additional context menu actions, appended after the built-in download and remove actions.
     * Use keys other than `download` and `remove` when those built-in actions are enabled.
     */
    contextMenuItems?: ContextMenuItem[];
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
            files?.map(({ mimeType, size, name, id, source, contextMenuItems }) => (
                <FileItem
                    key={id}
                    id={id}
                    name={name}
                    size={size}
                    mimeType={mimeType}
                    source={source}
                    contextMenuItems={contextMenuItems}
                    onRemove={onRemove}
                    shouldAllowDownload={shouldAllowDownload}
                />
            )),
        [files, onRemove, shouldAllowDownload],
    );

    return useMemo(
        () => (
            <TextStringProviderSSR libraries="chayns-components-v5-core" id="file-list">
                <StyledFileList>
                    <List>{content}</List>
                </StyledFileList>
            </TextStringProviderSSR>
        ),
        [content],
    );
};

FileList.displayName = 'FileList';

export default FileList;
