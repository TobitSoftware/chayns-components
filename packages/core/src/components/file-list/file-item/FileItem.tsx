import React, { FC, KeyboardEventHandler, useCallback, useMemo } from 'react';
import { getHumanSize, getIconByMimeType } from '../../../utils/file';
import Icon from '../../icon/Icon';
import ListItem from '../../list/list-item/ListItem';
import type { IFileItem } from '../FileList';
import {
    StyledFileItem,
    StyledFileItemActions,
    StyledFileItemKeyboardWrapper,
    StyledFileItemRemoveButton,
} from './FileItem.styles';

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
    const handleRemove = useCallback(() => {
        if (typeof onRemove === 'function') {
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
            if (event.key === 'Enter' || event.key === ' ') {
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

    return useMemo(
        () => (
            <StyledFileItem>
                <StyledFileItemKeyboardWrapper
                    onKeyDown={handleItemKeyDown}
                    tabIndex={typeof onRemove === 'function' ? 0 : -1}
                >
                    <ListItem
                        title={name}
                        subtitle={humanFileSize}
                        icons={[icon]}
                        rightElements={
                            <StyledFileItemActions>
                                {shouldAllowDownload && source && (
                                    <Icon icons={['fa fa-download']} onClick={handleDownload} />
                                )}
                                {typeof onRemove === 'function' && (
                                    <StyledFileItemRemoveButton
                                        onKeyDown={handleRemoveKeyDown}
                                        tabIndex={0}
                                        role="button"
                                        aria-label={`Datei ${name} entfernen`}
                                    >
                                        <Icon icons={['ts-wrong']} onClick={handleRemove} />
                                    </StyledFileItemRemoveButton>
                                )}
                            </StyledFileItemActions>
                        }
                    />
                </StyledFileItemKeyboardWrapper>
            </StyledFileItem>
        ),
        [
            handleDownload,
            handleItemKeyDown,
            handleRemove,
            handleRemoveKeyDown,
            humanFileSize,
            icon,
            name,
            onRemove,
            shouldAllowDownload,
            source,
        ],
    );
};

FileItem.displayName = 'FileList';

export default FileItem;
