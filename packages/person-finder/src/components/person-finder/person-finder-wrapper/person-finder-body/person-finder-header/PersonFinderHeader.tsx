import React, { FC } from 'react';
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
            updateActiveFilter(keys as PersonFinderFilterTypes[]);
        }
    };

    const filter: IFilterButtonItem[] = Object.values(filterTypes ?? {}).map((type) => ({
        id: type,
        text: capitalizeFirstLetter(type.replace(/_/g, ' ')),
    }));

    if (filter.length <= 1) {
        return null;
    }

    return (
        <StyledPersonFinderHeader $isScrollTop={isScrollTop}>
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
