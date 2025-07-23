import React, { FC, MouseEvent } from 'react';
import {
    StyledPersonFinderHeader,
    StyledPersonFinderHeaderFilter,
    StyledPersonFinderHeaderGroupName,
} from './PersonFinderHeader.styles';
import { FilterButtons, FilterButtonSize } from '@chayns-components/core';
import { usePersonFinder } from '../../../../PersonFinderProvider';
import { capitalizeFirstLetter } from '../../../../../utils/personFinder';
import { IFilterButtonItem } from '@chayns-components/core/lib/types/types/filterButtons';
import { PersonFinderFilterTypes } from '../../../../../types/personFinder';

export type PersonFinderHeaderProps = {
    filterTypes?: PersonFinderFilterTypes[];
    currentGroupName?: string | null;
    defaultGroupName?: string;
    isScrollTop: boolean;
    shouldShowGroupNames: boolean;
};

const PersonFinderHeader: FC<PersonFinderHeaderProps> = ({
    filterTypes,
    currentGroupName,
    defaultGroupName,
    isScrollTop,
    shouldShowGroupNames,
}) => {
    const { activeFilter, updateActiveFilter } = usePersonFinder();

    const handleFilterSelect = (keys: string[]) => {
        if (typeof updateActiveFilter === 'function') {
            const ordered = [PersonFinderFilterTypes.PERSON, PersonFinderFilterTypes.SITE].filter(
                (key) => keys.includes(key),
            );

            updateActiveFilter(ordered);
        }
    };

    const filter: IFilterButtonItem[] = Object.values(filterTypes ?? {}).map((type) => ({
        id: type,
        text: capitalizeFirstLetter(type.replace(/_/g, ' ')),
    }));

    if (filter.length <= 1) {
        return null;
    }

    const handlePreventDefault = (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
    };

    return (
        <StyledPersonFinderHeader $isScrollTop={isScrollTop} onClick={handlePreventDefault}>
            <StyledPersonFinderHeaderFilter>
                <FilterButtons
                    size={FilterButtonSize.Small}
                    items={filter}
                    onSelect={handleFilterSelect}
                    selectedItemIds={activeFilter}
                />
            </StyledPersonFinderHeaderFilter>
            {shouldShowGroupNames && (
                <StyledPersonFinderHeaderGroupName>
                    {currentGroupName ?? defaultGroupName}
                </StyledPersonFinderHeaderGroupName>
            )}
        </StyledPersonFinderHeader>
    );
};

PersonFinderHeader.displayName = 'PersonFinderHeader';

export default PersonFinderHeader;
