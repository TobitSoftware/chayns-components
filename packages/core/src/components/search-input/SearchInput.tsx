import { AnimatePresence } from 'framer-motion';
import React, {
    ChangeEventHandler,
    CSSProperties,
    FC,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import { useTheme } from 'styled-components';
import type { Theme } from '../color-scheme-provider/ColorSchemeProvider';
import Icon from '../icon/Icon';
import Input, { InputRef } from '../input/Input';
import {
    StyledMotionSearchInputContentWrapper,
    StyledMotionSearchInputIconWrapper,
    StyledMotionSearchInputIconWrapperContent,
    StyledSearchInput,
} from './SearchInput.styles';

export type SearchInputProps = {
    /**
     * Color of the icon
     */
    iconColor?: CSSProperties['color'];
    /**
     * Function that is executed when the active state of the input changes
     */
    onActiveChange?: (isActive: boolean) => void;
    /**
     * Function that is executed when the text of the input changes
     */
    onChange: ChangeEventHandler<HTMLInputElement>;
    /**
     * Placeholder for the input field
     */
    placeholder?: string;
    /**
     * Value if the input field should be controlled
     */
    value?: string;
};

const SearchInput: FC<SearchInputProps> = ({
    iconColor,
    onActiveChange,
    onChange,
    placeholder,
    value,
}) => {
    const [isActive, setIsActive] = useState(typeof value === 'string' && value.trim() !== '');

    const inputRef = useRef<InputRef>(null);

    const theme = useTheme() as Theme;

    const handleBackIconClick = useCallback(() => setIsActive(false), []);

    const handleSearchIconClick = useCallback(() => setIsActive(true), []);

    useEffect(() => {
        if (typeof onActiveChange === 'function') {
            onActiveChange(isActive);
        }

        if (isActive) {
            inputRef.current?.focus();
        }
    }, [isActive, onActiveChange]);

    return (
        <StyledSearchInput className="beta-chayns-search-input">
            <StyledMotionSearchInputIconWrapper>
                <AnimatePresence initial={false}>
                    <StyledMotionSearchInputIconWrapperContent
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, position: 'absolute' }}
                        initial={{ opacity: 0 }}
                        key={isActive ? 'backIcon' : 'searchIcon'}
                        transition={{ duration: 0.3 }}
                    >
                        <Icon
                            color={iconColor}
                            icons={isActive ? ['fa fa-arrow-left'] : ['fa fa-search']}
                            onClick={isActive ? handleBackIconClick : handleSearchIconClick}
                            size={18}
                        />
                    </StyledMotionSearchInputIconWrapperContent>
                </AnimatePresence>
            </StyledMotionSearchInputIconWrapper>
            <AnimatePresence initial={false}>
                {isActive && (
                    <StyledMotionSearchInputContentWrapper
                        animate={{ opacity: 1, width: '100%' }}
                        exit={{ opacity: 0, width: 0 }}
                        initial={{ opacity: 0, width: 0 }}
                        key="searchInputContentWrapper"
                        transition={{ duration: 0.3 }}
                    >
                        <Input
                            iconElement={<Icon color={theme.text} icons={['far fa-search']} />}
                            onChange={onChange}
                            placeholder={placeholder}
                            ref={inputRef}
                            shouldShowClearIcon
                            value={value}
                        />
                    </StyledMotionSearchInputContentWrapper>
                )}
            </AnimatePresence>
        </StyledSearchInput>
    );
};

SearchInput.displayName = 'SearchInput';

export default SearchInput;
