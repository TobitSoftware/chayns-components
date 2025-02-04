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
import Icon from '../icon/Icon';
import Input, { InputRef, InputSize } from '../input/Input';
import {
    StyledMotionSearchInputContentWrapper,
    StyledMotionSearchInputIconWrapperContent,
    StyledSearchInput,
} from './SearchInput.styles';

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
     * The size of the input field
     */
    size?: InputSize;
    /**
     * Value if the input field should be controlled
     */
    value?: string;
};

const SearchInput: FC<SearchInputProps> = ({
    iconColor,
    isActive,
    onActiveChange,
    onChange,
    onKeyDown,
    placeholder,
    size = InputSize.Medium,
    value,
}) => {
    const [isSearchInputActive, setIsSearchInputActive] = useState(
        isActive ?? (typeof value === 'string' && value.trim() !== ''),
    );

    const inputRef = useRef<InputRef>(null);

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

    return (
        <StyledSearchInput className="beta-chayns-search-input" $size={size}>
            <AnimatePresence initial={false}>
                {isSearchInputActive && (
                    <StyledMotionSearchInputContentWrapper
                        animate={{ opacity: 1, width: '100%' }}
                        exit={{ opacity: 0, width: 0 }}
                        initial={{ opacity: 0, width: 0 }}
                        key="searchInputContentWrapper"
                        transition={{ duration: 0.3 }}
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
                    id={isSearchInputActive ? 'search-input-backIcon' : 'search-input-searchIcon'}
                >
                    <Icon
                        color={iconColor}
                        icons={isSearchInputActive ? ['fa fa-xmark'] : ['fa fa-search']}
                        onClick={isSearchInputActive ? handleBackIconClick : handleSearchIconClick}
                        size={18}
                    />
                </StyledMotionSearchInputIconWrapperContent>
            </AnimatePresence>
        </StyledSearchInput>
    );
};

SearchInput.displayName = 'SearchInput';

export default SearchInput;
