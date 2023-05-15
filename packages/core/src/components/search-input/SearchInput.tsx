import { AnimatePresence } from 'framer-motion';
import React, { ChangeEventHandler, FC, useCallback, useEffect, useState } from 'react';
import Icon from '../icon/Icon';
import Input from '../input/Input';
import {
    StyledMotionSearchInputContentWrapper,
    StyledMotionSearchInputIconWrapper,
    StyledMotionSearchInputIconWrapperContent,
    StyledSearchInput,
} from './SearchInput.styles';

export type SearchInputProps = {
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

const SearchInput: FC<SearchInputProps> = ({ onActiveChange, onChange, placeholder, value }) => {
    const [isActive, setIsActive] = useState(typeof value === 'string' && value.trim() !== '');

    const handleBackIconClick = useCallback(() => {
        setIsActive(false);
    }, []);

    const handleSearchIconClick = useCallback(() => setIsActive(true), []);

    useEffect(() => {
        if (typeof onActiveChange === 'function') {
            onActiveChange(isActive);
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
                    >
                        <Icon
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
                    >
                        <Input
                            onChange={onChange}
                            placeholder={placeholder}
                            placeholderElement={<Icon icons={['fa fa-search']} />}
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
