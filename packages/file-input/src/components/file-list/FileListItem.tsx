import Icon from '@chayns-components/core/lib/components/icon/Icon';
import ListItem from '@chayns-components/core/lib/components/list/list-item/ListItem';
import React, { FC, useMemo } from 'react';
import { getHumanSize, getIconByMimeType } from '../../utils/file';
import { StyledFileListItem } from './FileListItem.styles';

export type FileListItemProps = {
    fileName: string;
    fileSize: number;
    fileType: string;
    onRemove: (name: string) => void;
};

const FileListItem: FC<FileListItemProps> = ({ fileName, fileSize, fileType, onRemove }) => {
    const humanFileSize = useMemo(() => getHumanSize(fileSize), [fileSize]);

    const icon = useMemo(() => getIconByMimeType(fileType), [fileType]);

    return useMemo(
        () => (
            <StyledFileListItem>
                <ListItem
                    title={fileName}
                    subtitle={humanFileSize}
                    icons={[icon]}
                    rightElements={[
                        <Icon icons={['ts-wrong']} onClick={() => onRemove(fileName)} />,
                    ]}
                />
            </StyledFileListItem>
        ),
        [fileName, humanFileSize, icon, onRemove]
    );
};

FileListItem.displayName = 'FileList';

export default FileListItem;
