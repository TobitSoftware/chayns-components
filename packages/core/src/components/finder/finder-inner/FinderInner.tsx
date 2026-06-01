import React, {
    type ChangeEvent,
    forwardRef,
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
            shouldDisableRemove,
            dropdownDirection,
            leftElement = DEFAULT_LEFT_ELEMENT,
            container,
        },
        ref,
    ) => {
        const [isFocused, setIsFocused] = useState(false);
        const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
        } = useFinderContext();

        const handleClose = useCallback(() => {
            setIsDropdownOpen(false);
        }, []);

        const handleOpen = useCallback(() => {
            setIsDropdownOpen(true);
        }, []);

        const handleBlur = useCallback(() => {
            setIsFocused(false);
        }, []);

        const handleFocus = useCallback(() => {
            setIsFocused(true);
        }, []);

        const handleChange = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                setSearchString(event.target.value);
            },
            [setSearchString],
        );

        const handleRemove = useCallback(
            (id: string) => {
                if (typeof setTags !== 'function' || shouldDisableRemove) {
                    return;
                }

                setTags(tags.filter((entry) => entry.id !== id));
            },
            [setTags, shouldDisableRemove, tags],
        );

        const handleClear = useCallback(() => {
            if (shouldDisableRemove) {
                return;
            }

            tagInputRef.current?.resetValue();
            setSearchString('');

            setTags([]);
        }, [setSearchString, setTags, shouldDisableRemove]);

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
            }),
            [handleClear],
        );

        const shouldShowBody = useMemo(() => {
            const mobileCheck = isTouch ? isFocused : true;

            return mobileCheck && isDropdownOpen && (hasEntries(data) || searchString.length >= 3);
        }, [data, isDropdownOpen, isFocused, isTouch, searchString.length]);

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

        const inputElement = useMemo(() => {
            if (inputType === InputType.TagInput) {
                return (
                    <TagInput
                        leftElement={leftElement}
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
                        leftElement={leftElement}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        placeholder={placeholder}
                        ref={inputRef}
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
            leftElement,
            placeholder,
            searchString,
            shouldAllowMultiple,
            tags,
        ]);

        return (
            <StyledFinderInner ref={wrapperRef} key={keyRef.current} onFocus={handleOpen}>
                {inputElement}
                {content}
            </StyledFinderInner>
        );
    },
);

FinderInner.displayName = 'FinderInner';

export default FinderInner;
