import React, { FC, useCallback, useMemo } from 'react';
import { getHumanSize, getIconByMimeType } from '../../../utils/file';
import Icon from '../../icon/Icon';
import ListItem from '../../list/list-item/ListItem';
import type { IFileItem } from '../FileList';
import { StyledFileItem } from './FileItem.styles';

export type FileItemProps = IFileItem & {
    onRemove?: (name: string) => void;
    shouldAllowDownload?: boolean;
};

const FileItem: FC<FileItemProps> = ({
    mimeType,
    onRemove,
    size,
    name,
    id,
    source,
    shouldAllowDownload,
}) => {
    const humanFileSize = useMemo(() => {
        if (typeof size === 'number') {
            return getHumanSize(size);
        }

        return undefined;
    }, [size]);

    const icon = useMemo(() => getIconByMimeType(mimeType), [mimeType]);

    const handleDownload = useCallback(() => {
        if (!source) return;

        if (source instanceof File) {
            const url = URL.createObjectURL(source);
            const a = document.createElement('a');
            a.href = url;
            a.download = name;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } else {
            // Try fetching as blob to force download. If CORS blocks it,
            // fall back to opening the URL directly.
            fetch(source)
                .then((res) => {
                    if (!res.ok) throw new Error('fetch failed');
                    return res.blob();
                })
                .then((blob) => {
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = name;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                })
                .catch(() => {
                    // CORS or network error: fall back to direct link
                    const a = document.createElement('a');
                    a.href = source;
                    a.download = name;
                    a.rel = 'noopener noreferrer';
                    a.target = '_blank';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                });
        }
    }, [name, source]);

    return useMemo(
        () => (
            <StyledFileItem>
                <ListItem
                    title={name}
                    subtitle={humanFileSize}
                    icons={[icon]}
                    rightElements={
                        <span style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            {shouldAllowDownload && source && (
                                <Icon icons={['fa fa-download']} onClick={handleDownload} />
                            )}
                            {typeof onRemove === 'function' && (
                                <Icon icons={['ts-wrong']} onClick={() => onRemove(id)} />
                            )}
                        </span>
                    }
                />
            </StyledFileItem>
        ),
        [handleDownload, humanFileSize, icon, id, name, onRemove, shouldAllowDownload, source],
    );
};

FileItem.displayName = 'FileList';

export default FileItem;
