import React, { FC, KeyboardEventHandler, useCallback, useMemo } from 'react';
import { getHumanSize, getIconByMimeType } from '../../../utils/file';
import Icon from '../../icon/Icon';
import ContextMenu from '../../context-menu/ContextMenu';
import type { ContextMenuItem } from '../../context-menu/ContextMenu.types';
import ListItem from '../../list/list-item/ListItem';
import type { IFileItem } from '../FileList';
import {
    StyledFileItem,
    StyledFileItemActions,
    StyledFileItemKeyboardWrapper,
    StyledFileItemRemoveButton,
    StyledFileItemIcon,
} from './FileItem.styles';
import { ttsToITextString, useTextstringValue } from '@chayns-components/textstring';
import textStrings from '../../../constants/textStrings';
import { useKeyboardFocusHighlighting } from '../../../hooks/useKeyboardFocusHighlighting';

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
    const canDownload = shouldAllowDownload && !!source;
    const canRemove = typeof onRemove === 'function';

    const shouldShowKeyboardHighlighting = useKeyboardFocusHighlighting(canRemove || !!canDownload);

    const handleRemove = useCallback(() => {
        if (canRemove) {
            onRemove(id);
        }
    }, [id, onRemove]);

    const handleItemKeyDown = useCallback<KeyboardEventHandler<HTMLDivElement>>(
        (event) => {
            if (event.key === 'Delete') {
                event.preventDefault();
                handleRemove();
            }
        },
        [handleRemove],
    );

    const handleRemoveKeyDown = useCallback<KeyboardEventHandler<HTMLSpanElement>>(
        (event) => {
            if (canRemove && (event.key === 'Enter' || event.key === ' ')) {
                event.preventDefault();
                event.stopPropagation();
                handleRemove();
            }
        },
        [handleRemove],
    );

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

    const downloadText = useTextstringValue({
        textstring: ttsToITextString(textStrings.components.fileItem.download),
    });
    const removeText = useTextstringValue({
        textstring: ttsToITextString(textStrings.components.fileItem.remove),
    });

    const rightElement = useMemo(() => {
        if (!canDownload && !canRemove) return undefined;
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

        const handleClick = () => {
            if (canRemove) {
                onRemove(id);
                return;
            }

            handleDownload();
        };

        const handleKeyDown = canRemove ? handleRemoveKeyDown : undefined;

        const fileIcon = canRemove ? 'ts-wrong' : 'fa fa-download';

        return (
            <StyledFileItemIcon
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                role="button"
                tabIndex={0}
            >
                <Icon icons={[fileIcon]} />
            </StyledFileItemIcon>
        );
    }, [
        canDownload,
        canRemove,
        downloadText,
        handleDownload,
        handleRemoveKeyDown,
        id,
        onRemove,
        removeText,
    ]);

    return useMemo(
        () => (
            <StyledFileItem>
                <StyledFileItemKeyboardWrapper onKeyDown={handleItemKeyDown} tabIndex={-1}>
                    <ListItem
                        title={name}
                        subtitle={humanFileSize}
                        icons={[icon]}
                        rightElements={rightElement}
                        shouldEnableKeyboardHighlighting={shouldShowKeyboardHighlighting}
                    />
                </StyledFileItemKeyboardWrapper>
            </StyledFileItem>
        ),
        [
            handleItemKeyDown,
            humanFileSize,
            icon,
            name,
            rightElement,
            shouldShowKeyboardHighlighting,
        ],
    );
};

FileItem.displayName = 'FileList';

export default FileItem;
