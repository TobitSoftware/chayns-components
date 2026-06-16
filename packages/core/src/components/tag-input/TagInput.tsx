import React, {
    forwardRef,
    useCallback,
    useMemo,
    useState,
    type ChangeEvent,
    type KeyboardEvent,
    type ReactElement,
    useImperativeHandle,
    useContext,
    ChangeEventHandler,
    ReactNode,
    FocusEventHandler,
    useRef,
} from 'react';
import { useTheme } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import type { Tag } from '../../types/tagInput';
import Badge from '../badge/Badge';
import Icon from '../icon/Icon';
import {
    StyledTagInput,
    StyledTagInputTagFocusWrapper,
    StyledTagInputIconWrapper,
    StyledTagInputTagInput,
    StyledTagInputTagWrapper,
    StyledTagInputTagWrapperText,
} from './TagInput.styles';
import { AreaContext } from '../area-provider/AreaContextProvider';
import type { Theme } from '../color-scheme-provider/ColorSchemeProvider';
import { useCursorRepaint } from '../../hooks/resize';
import { useKeyboardFocusHighlighting } from '../../hooks/useKeyboardFocusHighlighting';

export type TagInputProps = {
    /**
     * An element that should be displayed on the left side of the input.
     */
    leftElement?: ReactNode;
    /**
     * Function to be executed when a tag is added.
     */
    onAdd?: (tag: Tag) => Promise<boolean> | boolean | void;
    /**
     * Function to be executed when the input is blurred.
     */
    onBlur?: FocusEventHandler;
    /**
     * Function to be executed when the value of the input is changed.
     */
    onChange?: ChangeEventHandler<HTMLInputElement>;
    /**
     * Function to be executed when the input is focused.
     */
    onFocus?: FocusEventHandler;
    /**
     * Enables keyboard-only focus highlighting.
     */
    shouldEnableKeyboardHighlighting?: boolean;
    /**
     * Function to be executed when a tag is removed.
     */
    onRemove?: (id: string) => void;
    /**
     * The placeholder that should be displayed.
     */
    placeholder?: string;
    /**
     * Whether multiple tags should be allowed.
     */
    shouldAllowMultiple?: boolean;
    /**
     * Whether the enter key should be prevented.
     */
    shouldPreventEnter?: boolean;
    /**
     * The tags that should be displayed.
     */
    tags?: Tag[];
};

export interface TagInputRef {
    blur: () => void;
    getUnsavedTagText: Tag['text'] | undefined;
    resetValue: () => void;
}

const TagInput = forwardRef<TagInputRef, TagInputProps>(
    (
        {
            leftElement,
            onAdd,
            onBlur,
            onChange,
            onFocus,
            onRemove,
            placeholder,
            shouldAllowMultiple = true,
            shouldEnableKeyboardHighlighting,
            shouldPreventEnter,
            tags,
        },
        ref,
    ) => {
        const [currentValue, setCurrentValue] = useState('');
        const [selectedId, setSelectedId] = useState<Tag['id']>();

        const areaProvider = useContext(AreaContext);

        const inputRef = useRef<HTMLInputElement | null>(null);

        useCursorRepaint(inputRef);

        const theme = useTheme() as Theme;

        const handleResetValue = () => {
            setCurrentValue('');
        };

        const shouldChangeColor = useMemo(
            () => areaProvider.shouldChangeColor ?? false,
            [areaProvider.shouldChangeColor],
        );

        const shouldShowKeyboardHighlighting = useKeyboardFocusHighlighting(
            shouldEnableKeyboardHighlighting,
        );

        const shouldShowTagHighlighting =
            shouldShowKeyboardHighlighting && typeof selectedId === 'string';

        useImperativeHandle(
            ref,
            () => ({
                blur: () => inputRef.current?.blur(),
                getUnsavedTagText: currentValue !== '' ? currentValue : undefined,
                resetValue: handleResetValue,
            }),
            [currentValue],
        );

        const handleRemoveTag = useCallback(
            (id: string, currentTags: Tag[]) => {
                const removedTagIndex = currentTags.findIndex((tag) => tag.id === id);

                if (typeof onRemove === 'function') {
                    onRemove(id);
                }

                if (removedTagIndex < 0) {
                    setSelectedId(undefined);
                    return;
                }

                setSelectedId(
                    currentTags[removedTagIndex + 1]?.id ?? currentTags[removedTagIndex - 1]?.id,
                );
            },
            [onRemove],
        );

        const handleKeyDown = useCallback(
            (event: KeyboardEvent<HTMLInputElement>) => {
                const visibleTags = shouldAllowMultiple ? (tags ?? []) : (tags ?? []).slice(0, 1);
                const selectedTagIndex = visibleTags.findIndex((tag) => tag.id === selectedId);
                const selectedTag =
                    selectedTagIndex >= 0 ? visibleTags[selectedTagIndex] : undefined;
                const isSpaceKey = event.key === ' ';
                const isEnterKey = event.key === 'Enter';
                const isDeleteKey = event.key === 'Delete';

                if (currentValue === '' && visibleTags.length > 0) {
                    if (event.key === 'ArrowLeft') {
                        event.preventDefault();

                        if (!selectedId) {
                            setSelectedId(visibleTags[visibleTags.length - 1]?.id);
                            return;
                        }

                        if (selectedTagIndex <= 0) {
                            setSelectedId(undefined);
                            return;
                        }

                        setSelectedId(visibleTags[selectedTagIndex - 1]?.id);
                        return;
                    }

                    if (event.key === 'ArrowRight') {
                        event.preventDefault();

                        if (!selectedId || selectedTagIndex < 0) {
                            return;
                        }

                        if (selectedTagIndex >= visibleTags.length - 1) {
                            setSelectedId(undefined);
                            return;
                        }

                        setSelectedId(visibleTags[selectedTagIndex + 1]?.id);
                        return;
                    }

                    if (event.key === 'Home') {
                        event.preventDefault();
                        setSelectedId(visibleTags[0]?.id);
                        return;
                    }

                    if (event.key === 'End') {
                        event.preventDefault();
                        setSelectedId(visibleTags[visibleTags.length - 1]?.id);
                        return;
                    }

                    if (isEnterKey || isSpaceKey || event.key === 'Backspace' || isDeleteKey) {
                        event.preventDefault();

                        if (!selectedTag) {
                            setSelectedId(visibleTags[visibleTags.length - 1]?.id);
                            return;
                        }

                        handleRemoveTag(selectedTag.id, visibleTags);
                        return;
                    }
                }

                if (isEnterKey && !shouldPreventEnter) {
                    setCurrentValue((prevValue) => {
                        if (!prevValue) {
                            return '';
                        }

                        if (!shouldAllowMultiple && (tags?.length ?? 0) > 0) return '';

                        const newTag = { id: uuidv4(), text: prevValue };

                        if (typeof onAdd === 'function') {
                            const onAddResult = onAdd(newTag);

                            if (typeof onAddResult === 'boolean' && !onAddResult) {
                                return prevValue;
                            }

                            if (onAddResult instanceof Promise) {
                                void onAddResult.then((shouldAddTag) => {
                                    if (!shouldAddTag) {
                                        return prevValue;
                                    }

                                    return '';
                                });
                            }
                        }

                        return '';
                    });
                }
            },
            [
                currentValue,
                onAdd,
                handleRemoveTag,
                selectedId,
                shouldAllowMultiple,
                shouldPreventEnter,
                tags,
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
                handleRemoveTag(id, shouldAllowMultiple ? (tags ?? []) : (tags ?? []).slice(0, 1));
            },
            [handleRemoveTag, shouldAllowMultiple, tags],
        );

        const content = useMemo(() => {
            const items: ReactElement[] = [];

            if (!tags) {
                return items;
            }

            (shouldAllowMultiple ? tags : tags.slice(0, 1)).forEach(
                ({ text, id, rightElement }) => {
                    const isSelected = id === selectedId;

                    items.push(
                        <StyledTagInputTagFocusWrapper
                            $isSelected={isSelected}
                            $shouldShowKeyboardHighlighting={shouldShowKeyboardHighlighting}
                            key={`tag-input-${id}`}
                        >
                            <Badge
                                backgroundColor={
                                    isSelected ? ((theme['206'] as string) ?? undefined) : undefined
                                }
                            >
                                <StyledTagInputTagWrapper>
                                    <StyledTagInputTagWrapperText>
                                        {text}
                                    </StyledTagInputTagWrapperText>
                                    {rightElement}
                                    <Icon
                                        icons={['ts-wrong']}
                                        onClick={(event) => {
                                            event.preventDefault();
                                            event.stopPropagation();

                                            handleIconClick(id);
                                        }}
                                    />
                                </StyledTagInputTagWrapper>
                            </Badge>
                        </StyledTagInputTagFocusWrapper>,
                    );
                },
            );

            return items;
        }, [
            tags,
            shouldAllowMultiple,
            selectedId,
            shouldShowKeyboardHighlighting,
            theme,
            handleIconClick,
        ]);

        const shouldShowInput = useMemo(
            () => shouldAllowMultiple || (tags?.length ?? 0) < 1,
            [tags?.length, shouldAllowMultiple],
        );

        return useMemo(
            () => (
                <StyledTagInput
                    $shouldChangeColor={shouldChangeColor}
                    $shouldShowKeyboardHighlighting={shouldShowKeyboardHighlighting}
                    $shouldShowTagHighlighting={shouldShowTagHighlighting}
                >
                    {leftElement && (
                        <StyledTagInputIconWrapper>{leftElement}</StyledTagInputIconWrapper>
                    )}
                    {content}
                    {shouldShowInput && (
                        <StyledTagInputTagInput
                            onBlur={onBlur}
                            onChange={handleChange}
                            onFocus={onFocus}
                            onKeyDown={handleKeyDown}
                            placeholder={tags && tags.length > 0 ? undefined : placeholder}
                            ref={inputRef}
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
                onBlur,
                onFocus,
                placeholder,
                shouldChangeColor,
                shouldShowInput,
                shouldShowKeyboardHighlighting,
                shouldShowTagHighlighting,
                tags,
            ],
        );
    },
);

export default TagInput;
