import { AnimatePresence } from 'motion/react';
import React, {
    ChangeEventHandler,
    CSSProperties,
    FC,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import Icon from '../icon/Icon';
import Input, { InputRef, InputSize } from '../input/Input';
import {
    StyledMotionSearchInputContentWrapper,
    StyledMotionSearchInputIconWrapper,
    StyledMotionSearchInputIconWrapperContent,
    StyledSearchInput,
    StyledSearchInputPseudoElement,
} from './SearchInput.styles';
import { useTheme } from 'styled-components';
import type { Theme } from '../color-scheme-provider/ColorSchemeProvider';
import { useElementSize } from '../../hooks/element';

export type SearchInputProps = {
    /**
     * Color of the icon
     */
    iconColor?: CSSProperties['color'];
    /**
     * Force the active state of the input and override the internal state
     */
    isActive?: boolean;
    /**
     * Function that is executed when the active state of the input changes
     */
    onActiveChange?: (isActive: boolean) => void;
    /**
     * Function that is executed when the text of the input changes
     */
    onChange: ChangeEventHandler<HTMLInputElement>;
    /**
     * Function that is executed when a key is pressed
     */
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    /**
     * Placeholder for the input field
     */
    placeholder?: string;
    /**
     * Whether the SearchInput should be positioned absolute.
     */
    shouldUseAbsolutePositioning?: boolean;
    /**
     * The size of the input field
     */
    size?: InputSize;
    /**
     * Value if the input field should be controlled
     */
    value?: string;
    /**
     * The width of the parent.
     */
    width?: number;
};

const SearchInput: FC<SearchInputProps> = ({
    iconColor,
    isActive,
    onActiveChange,
    onChange,
    onKeyDown,
    placeholder,
    shouldUseAbsolutePositioning = false,
    size = InputSize.Medium,
    value,
    width: widthValue,
}) => {
    const [isSearchInputActive, setIsSearchInputActive] = useState(
        isActive ?? (typeof value === 'string' && value.trim() !== ''),
    );

    const inputRef = useRef<InputRef>(null);
    const pseudoRef = useRef<HTMLDivElement>(null);

    const parentWidth = useElementSize(pseudoRef);

    const theme = useTheme() as Theme;

    const handleBackIconClick = useCallback(() => setIsSearchInputActive(false), []);

    const handleSearchIconClick = useCallback(() => setIsSearchInputActive(true), []);

    useEffect(() => {
        if (typeof onActiveChange === 'function') {
            onActiveChange(isSearchInputActive);
        }

        if (isSearchInputActive) {
            inputRef.current?.focus();
        }
    }, [isSearchInputActive, onActiveChange]);

    useEffect(() => {
        if (typeof isActive === 'boolean') {
            setIsSearchInputActive(isActive);
        }
    }, [isActive]);

    const width = useMemo(() => widthValue ?? parentWidth?.width, [parentWidth?.width, widthValue]);

    return (
        <>
            <StyledSearchInput
                className="beta-chayns-search-input"
                $size={size}
                $shouldUseAbsolutePositioning={shouldUseAbsolutePositioning}
                onClick={() => {
                    if (shouldUseAbsolutePositioning) {
                        if (isSearchInputActive) {
                            handleBackIconClick();
                        } else {
                            handleSearchIconClick();
                        }
                    }
                }}
            >
                {shouldUseAbsolutePositioning ? (
                    <AnimatePresence initial={false}>
                        {isSearchInputActive && (
                            <StyledMotionSearchInputContentWrapper
                                $shouldUseAbsolutePositioning={shouldUseAbsolutePositioning}
                                animate={{ opacity: 1, width }}
                                exit={{ opacity: 0, width: 0 }}
                                initial={{ opacity: 0, width: 0 }}
                                key="searchInputContentWrapper"
                                transition={{ duration: 0.25, type: 'tween' }}
                            >
                                <Input
                                    onChange={onChange}
                                    onKeyDown={onKeyDown}
                                    placeholder={placeholder}
                                    ref={inputRef}
                                    shouldShowClearIcon
                                    size={size}
                                    value={value}
                                />
                            </StyledMotionSearchInputContentWrapper>
                        )}
                        <StyledMotionSearchInputIconWrapperContent
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, position: 'absolute' }}
                            initial={{ opacity: 0 }}
                            key={isSearchInputActive ? 'backIcon' : 'searchIcon'}
                            transition={{ duration: 0.3 }}
                            id={
                                isSearchInputActive
                                    ? 'search-input-backIcon'
                                    : 'search-input-searchIcon'
                            }
                        >
                            <Icon
                                key="icon"
                                color={iconColor}
                                icons={isSearchInputActive ? ['fa fa-xmark'] : ['fa fa-search']}
                                onClick={
                                    isSearchInputActive
                                        ? handleBackIconClick
                                        : handleSearchIconClick
                                }
                            />
                        </StyledMotionSearchInputIconWrapperContent>
                    </AnimatePresence>
                ) : (
                    <>
                        <StyledMotionSearchInputIconWrapper>
                            <AnimatePresence initial={false}>
                                <StyledMotionSearchInputIconWrapperContent
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, position: 'absolute' }}
                                    initial={{ opacity: 0 }}
                                    key={isSearchInputActive ? 'backIcon' : 'searchIcon'}
                                    transition={{ duration: 0.3 }}
                                    id={
                                        isSearchInputActive
                                            ? 'search-input-backIcon'
                                            : 'search-input-searchIcon'
                                    }
                                >
                                    <Icon
                                        key="icon"
                                        color={iconColor}
                                        icons={
                                            isSearchInputActive
                                                ? ['fa fa-arrow-left']
                                                : ['fa fa-search']
                                        }
                                        onClick={
                                            isSearchInputActive
                                                ? handleBackIconClick
                                                : handleSearchIconClick
                                        }
                                    />
                                </StyledMotionSearchInputIconWrapperContent>
                            </AnimatePresence>
                        </StyledMotionSearchInputIconWrapper>
                        <AnimatePresence initial={false}>
                            {isSearchInputActive && (
                                <StyledMotionSearchInputContentWrapper
                                    $shouldUseAbsolutePositioning={shouldUseAbsolutePositioning}
                                    animate={{ opacity: 1, width: '100%' }}
                                    exit={{ opacity: 0, width: 0 }}
                                    initial={{ opacity: 0, width: 0 }}
                                    key="searchInputContentWrapper"
                                    transition={{ duration: 0.3 }}
                                >
                                    <Input
                                        key="input"
                                        leftElement={
                                            <Icon color={theme.text} icons={['far fa-search']} />
                                        }
                                        onChange={onChange}
                                        onKeyDown={onKeyDown}
                                        placeholder={placeholder}
                                        ref={inputRef}
                                        shouldShowClearIcon
                                        size={size}
                                        value={value}
                                    />
                                </StyledMotionSearchInputContentWrapper>
                            )}
                        </AnimatePresence>
                    </>
                )}
            </StyledSearchInput>
            <StyledSearchInputPseudoElement ref={pseudoRef} />
        </>
    );
};

SearchInput.displayName = 'SearchInput';

export default SearchInput;
