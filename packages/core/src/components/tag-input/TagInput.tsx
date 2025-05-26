import React, {
    forwardRef,
    useCallback,
    useEffect,
    useMemo,
    useState,
    type ChangeEvent,
    type KeyboardEvent,
    type ReactElement,
    useImperativeHandle,
    useContext,
    ChangeEventHandler,
} from 'react';
import { useTheme } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import type { Tag } from '../../types/tagInput';
import Badge from '../badge/Badge';
import Icon from '../icon/Icon';
import {
    StyledTagInput,
    StyledTagInputTagInput,
    StyledTagInputTagWrapper,
    StyledTagInputTagWrapperText,
} from './TagInput.styles';
import { AreaContext } from '../area-provider/AreaContextProvider';
import type { Theme } from '../color-scheme-provider/ColorSchemeProvider';

export type TagInputProps = {
    /**
     * An element that should be displayed on the left side of the input.
     */
    leftElement?: ReactElement;
    /**
     * Function to be executed when a tag is added.
     */
    onAdd?: (tag: Tag) => void;
    /**
     * Function to be executed when the value of the input is changed.
     */
    onChange?: ChangeEventHandler<HTMLInputElement>;
    /**
     * Function to be executed when a tag is removed.
     */
    onRemove?: (id: string) => void;
    /**
     * The placeholder that should be displayed.
     */
    placeholder?: string;
    /**
     * The tags that should be displayed.
     */
    tags?: Tag[];
    /**
     * Whether multiple tags should be allowed.
     */
    shouldAllowMultiple?: boolean;
    /**
     * Whether the enter key should be prevented.
     */
    shouldPreventEnter?: boolean;
};

export type TagInputRef = {
    getUnsavedTagText: Tag['text'] | undefined;
    resetValue: () => void;
};

const TagInput = forwardRef<TagInputRef, TagInputProps>(
    (
        {
            placeholder,
            tags,
            onRemove,
            onChange,
            onAdd,
            leftElement,
            shouldAllowMultiple = true,
            shouldPreventEnter,
        },
        ref,
    ) => {
        const [internalTags, setInternalTags] = useState<Tag[]>();
        const [currentValue, setCurrentValue] = useState('');
        const [selectedId, setSelectedId] = useState<Tag['id']>();

        const areaProvider = useContext(AreaContext);

        const theme = useTheme() as Theme;

        useEffect(() => {
            if (tags) {
                setInternalTags(shouldAllowMultiple ? tags : tags.slice(0, 1));
            }
        }, [shouldAllowMultiple, tags]);

        const handleResetValue = () => {
            setCurrentValue('');
        };

        const shouldChangeColor = useMemo(
            () => areaProvider.shouldChangeColor ?? false,
            [areaProvider.shouldChangeColor],
        );

        useImperativeHandle(
            ref,
            () => ({
                getUnsavedTagText: currentValue !== '' ? currentValue : undefined,
                resetValue: handleResetValue,
            }),
            [currentValue],
        );

        const handleKeyDown = useCallback(
            (event: KeyboardEvent) => {
                if (event.key === 'Enter' && !shouldPreventEnter) {
                    setCurrentValue((prevValue) => {
                        if (!prevValue) {
                            return '';
                        }

                        setInternalTags((prevTags) => {
                            if (!shouldAllowMultiple && (prevTags?.length ?? 0) > 0)
                                return prevTags;

                            const newTag = { id: uuidv4(), text: prevValue };

                            if (typeof onAdd === 'function') {
                                onAdd(newTag);
                            }

                            return prevTags ? [...prevTags, newTag] : [newTag];
                        });

                        return '';
                    });
                }

                if (event.key === 'Backspace' && currentValue === '') {
                    if (!selectedId) {
                        if (!internalTags) {
                            return;
                        }

                        const newSelectedId = internalTags[internalTags.length - 1]?.id;

                        setSelectedId(newSelectedId);

                        return;
                    }

                    setInternalTags((prevState) => {
                        if (!prevState) {
                            return prevState;
                        }

                        const removedId = prevState[prevState.length - 1]?.id;

                        if (!removedId) {
                            return prevState;
                        }

                        const updatedTags = (prevState ?? []).filter((tag) => tag.id !== removedId);

                        if (typeof onRemove === 'function') {
                            onRemove(removedId);
                        }

                        setSelectedId(undefined);

                        return updatedTags;
                    });
                }
            },
            [
                currentValue,
                internalTags,
                onAdd,
                onRemove,
                selectedId,
                shouldAllowMultiple,
                shouldPreventEnter,
            ],
        );

        const handleChange = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                setCurrentValue(event.target.value);

                if (typeof onChange === 'function') {
                    onChange(event);
                }

                if (event.target.value !== '') {
                    setSelectedId(undefined);
                }
            },
            [onChange],
        );

        const handleIconClick = useCallback(
            (id: string) => {
                setInternalTags((prevState) => {
                    const updatedTags = (prevState ?? []).filter((tag) => tag.id !== id);

                    if (typeof onRemove === 'function') {
                        onRemove(id);
                    }

                    return updatedTags;
                });
            },
            [onRemove],
        );

        const content = useMemo(() => {
            const items: ReactElement[] = [];

            if (!internalTags) {
                return items;
            }

            internalTags.forEach(({ text, id, rightElement }) => {
                items.push(
                    <Badge
                        key={`tag-input-${id}`}
                        backgroundColor={
                            id === selectedId ? ((theme['206'] as string) ?? undefined) : undefined
                        }
                    >
                        <StyledTagInputTagWrapper>
                            <StyledTagInputTagWrapperText>{text}</StyledTagInputTagWrapperText>
                            {rightElement}
                            <Icon icons={['ts-wrong']} onClick={() => handleIconClick(id)} />
                        </StyledTagInputTagWrapper>
                    </Badge>,
                );
            });

            return items;
        }, [handleIconClick, internalTags, selectedId, theme]);

        const shouldShowInput = useMemo(
            () => shouldAllowMultiple || (internalTags?.length ?? 0) < 1,
            [internalTags?.length, shouldAllowMultiple],
        );

        return useMemo(
            () => (
                <StyledTagInput $shouldChangeColor={shouldChangeColor}>
                    {leftElement && leftElement}
                    {content}
                    {shouldShowInput && (
                        <StyledTagInputTagInput
                            placeholder={tags && tags.length > 0 ? undefined : placeholder}
                            onKeyDown={handleKeyDown}
                            onChange={handleChange}
                            value={currentValue}
                        />
                    )}
                </StyledTagInput>
            ),
            [
                content,
                currentValue,
                handleChange,
                handleKeyDown,
                leftElement,
                placeholder,
                shouldChangeColor,
                shouldShowInput,
                tags,
            ],
        );
    },
);

export default TagInput;
