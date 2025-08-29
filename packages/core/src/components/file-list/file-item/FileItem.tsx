import React, { FC, useMemo } from 'react';
import { getHumanSize, getIconByMimeType } from '../../../utils/file';
import Icon from '../../icon/Icon';
import ListItem from '../../list/list-item/ListItem';
import type { IFileItem } from '../FileList';
import { StyledFileItem } from './FileItem.styles';

export type FileItemProps = IFileItem & {
    onRemove?: (name: string) => void;
};

const FileItem: FC<FileItemProps> = ({ mimeType, onRemove, size, name, id }) => {
    const humanFileSize = useMemo(() => {
        if (typeof size === 'number') {
            return getHumanSize(size);
        }

        return undefined;
    }, [size]);

    const icon = useMemo(() => getIconByMimeType(mimeType), [mimeType]);

    return useMemo(
        () => (
            <StyledFileItem>
                <ListItem
                    title={name}
                    subtitle={humanFileSize}
                    icons={[icon]}
                    rightElements={
                        typeof onRemove === 'function' ? (
                            <Icon icons={['ts-wrong']} onClick={() => onRemove(id)} />
                        ) : undefined
                    }
                />
            </StyledFileItem>
        ),
        [humanFileSize, icon, id, name, onRemove],
    );
};

FileItem.displayName = 'FileList';

export default FileItem;
