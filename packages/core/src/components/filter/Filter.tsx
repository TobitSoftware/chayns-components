import React, { FC, useCallback, useMemo } from 'react';
import {
    StyledFilter,
    StyledFilterHead,
    StyledFilterHeadline,
    StyledFilterIcon,
} from './Filter.styles';
import ExpandableContent from '../expandable-content/ExpandableContent';
import Icon from '../icon/Icon';

export type FilterProps = {
    headline: string;
    onSearchChange?: (search: string) => void;
    onSortChange?: (sort: string) => void;
    onFilterChange?: (filter: string) => void;
    onOpen?: VoidFunction;
    onClose?: VoidFunction;
    isOpen: boolean;
};

const Filter: FC<FilterProps> = ({
    headline,
    onFilterChange,
    onSortChange,
    onSearchChange,
    isOpen,
    onOpen,
    onClose,
}) => {
    const icons = useMemo(() => {
        let icon = 'fa fa-search';

        if (
            typeof onFilterChange === 'function' &&
            typeof onSearchChange !== 'function' &&
            typeof onSortChange !== 'function'
        ) {
            icon = 'fa fa-filter';
        }
        if (
            typeof onFilterChange !== 'function' &&
            typeof onSearchChange !== 'function' &&
            typeof onSortChange === 'function'
        ) {
            icon = 'fa fa-arrow-up-arrow-down';
        }

        return [icon];
    }, [onFilterChange, onSearchChange, onSortChange]);

    const handleIconClick = useCallback(() => {
        if (isOpen) {
            if (typeof onClose === 'function') {
                onClose();
            }
        } else if (typeof onOpen === 'function') {
            onOpen();
        }
    }, [isOpen, onClose, onOpen]);

    return useMemo(
        () => (
            <StyledFilter>
                <StyledFilterHead>
                    <StyledFilterHeadline>{headline}</StyledFilterHeadline>
                    <StyledFilterIcon onClick={handleIconClick}>
                        <Icon icons={icons} />
                    </StyledFilterIcon>
                </StyledFilterHead>
                <ExpandableContent isOpen={isOpen}>test</ExpandableContent>
            </StyledFilter>
        ),
        [handleIconClick, headline, icons, isOpen],
    );
};

Filter.displayName = 'Filter';

export default Filter;
