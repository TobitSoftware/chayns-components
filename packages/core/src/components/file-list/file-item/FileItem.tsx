import React, { FC, useCallback, useMemo } from 'react';
import { getHumanSize, getIconByMimeType } from '../../../utils/file';
import Icon from '../../icon/Icon';
import ContextMenu from '../../context-menu/ContextMenu';
import type { ContextMenuItem } from '../../context-menu/ContextMenu.types';
import ListItem from '../../list/list-item/ListItem';
import type { IFileItem } from '../FileList';
import { StyledFileItem, StyledFileItemIcon } from './FileItem.styles';
import { ttsToITextString, useTextstringValue } from '@chayns-components/textstring';
import textStrings from '../../../constants/textStrings';

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

    const canDownload = shouldAllowDownload && !!source;
    const canRemove = typeof onRemove === 'function';

    const downloadText = useTextstringValue({
        textstring: ttsToITextString(textStrings.components.fileItem.download),
    });
    const removeText = useTextstringValue({
        textstring: ttsToITextString(textStrings.components.fileItem.remove),
    });

    const rightElement = useMemo(() => {
        // Both actions available → show as ContextMenu
        if (canDownload && canRemove) {
            const items: ContextMenuItem[] = [
                {
                    icons: ['fa fa-download'],
                    key: 'download',
                    onClick: handleDownload,
                    text: downloadText,
                },
                {
                    icons: ['fa fa-trash'],
                    key: 'remove',
                    onClick: () => onRemove(id),
                    text: removeText,
                },
            ];

            return <ContextMenu items={items} />;
        }

        // Only download
        if (canDownload) {
            return (
                <StyledFileItemIcon onClick={handleDownload}>
                    <Icon icons={['fa fa-download']} />
                </StyledFileItemIcon>
            );
        }

        // Only remove
        if (canRemove) {
            return (
                <StyledFileItemIcon onClick={() => onRemove(id)}>
                    <Icon icons={['ts-wrong']} />
                </StyledFileItemIcon>
            );
        }

        return undefined;
    }, [canDownload, canRemove, downloadText, handleDownload, id, onRemove, removeText]);

    return useMemo(
        () => (
            <StyledFileItem>
                <ListItem
                    title={name}
                    subtitle={humanFileSize}
                    icons={[icon]}
                    rightElements={rightElement}
                />
            </StyledFileItem>
        ),
        [humanFileSize, icon, name, rightElement],
    );
};

FileItem.displayName = 'FileList';

export default FileItem;
