import React, { FC, useMemo } from 'react';
import { getHumanSize, getIconByMimeType } from '../../../utils/file';
import Icon from '../../icon/Icon';
import ListItem from '../../list/list-item/ListItem';
import { StyledFileListItem } from './FileListItem.styles';

export type FileListItemProps = {
    fileName?: string;
    fileSize?: number;
    fileType?: string;
    url?: string;
    onRemove: (name: string) => void;
};

const FileListItem: FC<FileListItemProps> = ({ fileName, fileSize, fileType, onRemove, url }) => {
    const humanFileSize = useMemo(() => fileSize && getHumanSize(fileSize), [fileSize]);

    const icon = useMemo(() => getIconByMimeType(fileType), [fileType]);

    return useMemo(
        () => (
            <StyledFileListItem>
                <ListItem
                    title={fileName ?? url}
                    subtitle={humanFileSize}
                    icons={url ? ['fa fa-file-image'] : [icon]}
                    rightElements={
                        <Icon
                            icons={['ts-wrong']}
                            onClick={() => onRemove(fileName ?? url ?? '')}
                        />
                    }
                />
            </StyledFileListItem>
        ),
        [fileName, humanFileSize, icon, onRemove, url],
    );
};

FileListItem.displayName = 'FileList';

export default FileListItem;
