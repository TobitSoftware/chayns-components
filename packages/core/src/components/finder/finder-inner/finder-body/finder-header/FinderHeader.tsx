import React, { FC, MouseEvent } from 'react';
import {
    StyledFinderHeader,
    StyledFinderHeaderFilter,
    StyledFinderHeaderGroupName,
} from './FinderHeader.styles';
import { FinderHeaderProps } from './FinderHeader.types';
import { useFinderContext } from '../../../Finder.context';
import FilterButtons from '../../../../filter-buttons/FilterButtons';
import { FilterButtonSize } from '../../../../../types/filterButtons';

const handlePreventDefault = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
};

const FinderHeader: FC<FinderHeaderProps> = ({
    shouldUseShadow,
    shouldDisplayNames,
    currentFilterName,
    shouldHideFilterButtons = false,
}) => {
    const { activeFilter, filter, setActiveFilter } = useFinderContext();

    const handleFilterSelect = (keys: string[]) => {
        setActiveFilter(keys);
    };

    const filterButtons = filter.map(({ key, label }) => ({ id: key, text: label }));

    const shouldShowFilters = filter.length > 1 && !shouldHideFilterButtons;
    const shouldShowGroupName = shouldDisplayNames && currentFilterName !== '';

    if (!shouldShowFilters && !shouldShowGroupName) {
        return null;
    }

    return (
        <StyledFinderHeader $shouldUseShadow={shouldUseShadow} onClick={handlePreventDefault}>
            {shouldShowFilters && (
                <StyledFinderHeaderFilter>
                    <FilterButtons
                        size={FilterButtonSize.Small}
                        items={filterButtons}
                        onSelect={handleFilterSelect}
                        selectedItemIds={activeFilter}
                    />
                </StyledFinderHeaderFilter>
            )}
            {shouldShowGroupName && (
                <StyledFinderHeaderGroupName>{currentFilterName}</StyledFinderHeaderGroupName>
            )}
        </StyledFinderHeader>
    );
};

FinderHeader.displayName = 'FinderHeader';

export default FinderHeader;
