import React, {
    type ChangeEvent,
    cloneElement,
    forwardRef,
    KeyboardEvent,
    MouseEvent,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';
import { StyledFinderInner, StyledFinderInnerLeftElement } from './FinderInner.styles';
import { useDevice } from 'chayns-api';
import { InputType, FinderInnerProps, FinderRef } from '../Finder.types';
import { useFinderContext } from '../Finder.context';
import FinderBody from './finder-body/FinderBody';
import { hasEntries } from './FinderInner.utils';
import Input, { InputRef } from '../../input/Input';
import TagInput, { TagInputRef } from '../../tag-input/TagInput';
import DropdownBodyWrapper from '../../dropdown-body-wrapper/DropdownBodyWrapper';
import Icon from '../../icon/Icon';

const DEFAULT_LEFT_ELEMENT = (
    <StyledFinderInnerLeftElement>
        <Icon icons={['fa fa-search']} />
    </StyledFinderInnerLeftElement>
);

const FinderInner = forwardRef<FinderRef, FinderInnerProps>(
    (
        {
            inputType,
            shouldRenderInline,
            placeholder,
            shouldAllowMultiple,
            onDropdownHide,
            onDropdownShow,
            onInputBlur,
            onInputChange,
            onInputFocus,
            onInputKeyDown,
            onTagAdd,
            isInvalid,
            rightElement,
            shouldDisableRemove,
            shouldToggleOnRightElementClick,
            dropdownDirection,
            leftElement = DEFAULT_LEFT_ELEMENT,
            container,
        },
        ref,
    ) => {
        const [isFocused, setIsFocused] = useState(false);
        const [isDropdownOpen, setIsDropdownOpen] = useState(false);
        const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

        const wrapperRef = useRef<HTMLDivElement>(null);
        const contentRef = useRef<HTMLDivElement>(null);
        const inputRef = useRef<InputRef>(null);
        const tagInputRef = useRef<TagInputRef>(null);
        const keyRef = useRef(`finder-${Math.random()}`);

        const { isTouch } = useDevice();

        const {
            tags,
            setTags,
            searchString,
            setSearchString,
            data,
            resetInputSignal,
            closeDropdownSignal,
            removeTag,
            shouldShowContent,
        } = useFinderContext();

        const handleClose = useCallback(() => {
            setIsDropdownOpen(false);
            setFocusedIndex(null);
        }, []);

        const handleOpen = useCallback(() => {
            setIsDropdownOpen(true);
        }, []);

        const handleBlur = useCallback(
            (event: React.FocusEvent<HTMLInputElement>) => {
                setIsFocused(false);

                if (typeof onInputBlur === 'function') {
                    onInputBlur(event);
                }
            },
            [onInputBlur],
        );

        const handleFocus = useCallback(
            (event: React.FocusEvent<HTMLInputElement>) => {
                setIsFocused(true);

                if (typeof onInputFocus === 'function') {
                    onInputFocus(event);
                }
            },
            [onInputFocus],
        );

        const handleChange = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                setSearchString(event.target.value);

                if (typeof onInputChange === 'function') {
                    onInputChange(event);
                }
            },
            [onInputChange, setSearchString],
        );

        const handleRemove = useCallback(
            (id: string) => {
                if (shouldDisableRemove) {
                    return;
                }

                if (typeof removeTag === 'function') {
                    removeTag(id);

                    return;
                }

                if (typeof setTags === 'function') {
                    setTags(tags.filter((entry) => entry.id !== id));
                }
            },
            [removeTag, setTags, shouldDisableRemove, tags],
        );

        const handleClear = useCallback(() => {
            if (shouldDisableRemove) {
                return;
            }

            tagInputRef.current?.resetValue();
            setSearchString('');

            if (typeof removeTag === 'function') {
                tags.forEach((tag) => removeTag(tag.id));
            } else {
                setTags([]);
            }
        }, [removeTag, setSearchString, setTags, shouldDisableRemove, tags]);

        const handleClearInput = useCallback(() => {
            tagInputRef.current?.resetValue();
            setSearchString('');
        }, [setSearchString]);

        const handleDropdownOutsideClick = useCallback(() => {
            tagInputRef.current?.blur();
            inputRef.current?.blur();

            return isFocused && isTouch;
        }, [isFocused, isTouch]);

        useEffect(() => {
            if (isDropdownOpen) {
                if (typeof onDropdownShow === 'function') {
                    onDropdownShow();
                }
            } else if (typeof onDropdownHide === 'function') {
                onDropdownHide();
            }
        }, [isDropdownOpen, onDropdownHide, onDropdownShow]);

        useEffect(() => {
            tagInputRef.current?.resetValue();
        }, [resetInputSignal]);

        useEffect(() => {
            if (closeDropdownSignal < 1) {
                return;
            }

            handleClose();
        }, [closeDropdownSignal, handleClose]);

        useImperativeHandle(
            ref,
            () => ({
                blur: () => (inputRef.current ?? tagInputRef.current)?.blur(),
                focus: () => (inputRef.current ?? tagInputRef.current)?.focus(),
                clear: () => handleClear(),
                clearInput: () => handleClearInput(),
            }),
            [handleClear, handleClearInput],
        );

        const shouldShowBody = useMemo(() => {
            const mobileCheck = isTouch ? isFocused : true;
            const shouldShowFinderContent =
                shouldShowContent ?? (hasEntries(data) || searchString.length >= 3);

            return mobileCheck && isDropdownOpen && shouldShowFinderContent;
        }, [data, isDropdownOpen, isFocused, isTouch, searchString.length, shouldShowContent]);

        const getSelectableElements = useCallback(
            () =>
                Array.from(
                    contentRef.current?.querySelectorAll<HTMLElement>(
                        '[data-finder-selectable="true"]',
                    ) ?? [],
                ),
            [],
        );

        const focusSelectableElement = useCallback(
            (nextIndex: number) => {
                const selectableElements = getSelectableElements();

                selectableElements.forEach((element, index) => {
                    element.tabIndex = index === nextIndex ? 0 : -1;
                });

                const nextElement = selectableElements[nextIndex];

                if (!nextElement) {
                    return;
                }

                nextElement.focus();
                nextElement.scrollIntoView({ block: 'nearest' });
                setFocusedIndex(nextIndex);
            },
            [getSelectableElements],
        );

        const handleFinderKeyDown = useCallback(
            (event: KeyboardEvent<HTMLDivElement>) => {
                if (typeof onInputKeyDown === 'function') {
                    onInputKeyDown(event as unknown as React.KeyboardEvent<HTMLInputElement>);
                }

                if (event.defaultPrevented) {
                    return;
                }

                if (event.key === 'Escape') {
                    handleClose();

                    return;
                }

                if (!shouldShowBody) {
                    return;
                }

                const selectableElements = getSelectableElements();

                if (selectableElements.length === 0) {
                    return;
                }

                if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                    event.preventDefault();

                    const nextIndex =
                        focusedIndex !== null
                            ? (focusedIndex +
                                  (event.key === 'ArrowUp' ? -1 : 1) +
                                  selectableElements.length) %
                              selectableElements.length
                            : 0;

                    focusSelectableElement(nextIndex);

                    return;
                }

                if (event.key === 'Enter') {
                    event.preventDefault();
                    event.stopPropagation();

                    const nextIndex = focusedIndex ?? 0;
                    const nextElement = selectableElements[nextIndex];

                    if (nextElement) {
                        nextElement.click();
                    }
                }
            },
            [
                focusSelectableElement,
                focusedIndex,
                getSelectableElements,
                handleClose,
                onInputKeyDown,
                shouldShowBody,
            ],
        );

        const content = useMemo(() => {
            const body = <FinderBody ref={contentRef} shouldRenderInline={shouldRenderInline} />;

            if (shouldRenderInline) {
                return body;
            }

            if (wrapperRef.current) {
                return (
                    <DropdownBodyWrapper
                        anchorElement={wrapperRef.current}
                        container={container}
                        direction={dropdownDirection}
                        onClose={handleClose}
                        onOutsideClick={handleDropdownOutsideClick}
                        shouldShowDropdown={shouldShowBody}
                    >
                        {body}
                    </DropdownBodyWrapper>
                );
            }

            return null;
        }, [
            container,
            dropdownDirection,
            handleClose,
            handleDropdownOutsideClick,
            shouldRenderInline,
            shouldShowBody,
        ]);

        const resolvedRightElement = useMemo(() => {
            if (!rightElement || !shouldToggleOnRightElementClick) {
                return rightElement;
            }

            return cloneElement(rightElement, {
                onClick: (event: MouseEvent) => {
                    event.preventDefault();
                    event.stopPropagation();

                    const originalClick = rightElement.props.onClick as
                        | ((event: MouseEvent) => void)
                        | undefined;

                    if (typeof originalClick === 'function') {
                        originalClick(event);
                    }

                    setIsDropdownOpen((currentState) => !currentState);
                },
            });
        }, [rightElement, shouldToggleOnRightElementClick]);

        useEffect(() => {
            if (!shouldShowBody) {
                setFocusedIndex(null);
            }
        }, [shouldShowBody]);

        const inputElement = useMemo(() => {
            if (inputType === InputType.TagInput) {
                return (
                    <TagInput
                        leftElement={leftElement}
                        onAdd={onTagAdd}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onRemove={handleRemove}
                        placeholder={placeholder}
                        ref={tagInputRef}
                        shouldAllowMultiple={shouldAllowMultiple}
                        shouldPreventEnter
                        tags={tags}
                    />
                );
            }

            if (inputType === InputType.Input) {
                return (
                    <Input
                        isInvalid={isInvalid}
                        leftElement={leftElement}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        placeholder={placeholder}
                        ref={inputRef}
                        rightElement={resolvedRightElement}
                        value={searchString}
                    />
                );
            }

            return null;
        }, [
            handleBlur,
            handleChange,
            handleFocus,
            handleRemove,
            inputType,
            isInvalid,
            leftElement,
            onTagAdd,
            placeholder,
            resolvedRightElement,
            searchString,
            shouldAllowMultiple,
            tags,
        ]);

        return (
            <StyledFinderInner
                ref={wrapperRef}
                key={keyRef.current}
                onFocus={handleOpen}
                onKeyDown={handleFinderKeyDown}
            >
                {inputElement}
                {content}
            </StyledFinderInner>
        );
    },
);

FinderInner.displayName = 'FinderInner';

export default FinderInner;
