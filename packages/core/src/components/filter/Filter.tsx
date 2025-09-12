import React, { FC, useMemo, useState } from 'react';
import {
    StyledFilter,
    StyledFilterHead,
    StyledFilterHeadline,
    StyledFilterIcon,
} from './Filter.styles';
import ExpandableContent from '../expandable-content/ExpandableContent';
import Icon from '../icon/Icon';
import FilterContent from './filter-content/FIlterContent';
import { FilterButtonConfig, SearchConfig, SortConfig } from '../../types/filter';

export type FilterProps = {
    headline: string;
    searchConfig?: SearchConfig;
    filterButtonConfig?: FilterButtonConfig;
    sortConfig?: SortConfig;
};

const Filter: FC<FilterProps> = ({ headline, searchConfig, sortConfig, filterButtonConfig }) => {
    const [isOpen, setIsOpen] = useState(false);

    const icons = useMemo(() => {
        let icon = 'fa fa-search';

        if (filterButtonConfig && !searchConfig && !sortConfig) {
            icon = 'fa fa-filter';
        }
        if (!filterButtonConfig && !searchConfig && sortConfig) {
            icon = 'fa fa-arrow-up-arrow-down';
        }

        return [icon];
    }, [filterButtonConfig, searchConfig, sortConfig]);

    return useMemo(
        () => (
            <StyledFilter>
                <StyledFilterHead>
                    <StyledFilterHeadline>{headline}</StyledFilterHeadline>
                    <StyledFilterIcon onClick={() => setIsOpen((prev) => !prev)}>
                        <Icon icons={icons} size={18} />
                    </StyledFilterIcon>
                </StyledFilterHead>
                <ExpandableContent isOpen={isOpen}>
                    <FilterContent
                        searchConfig={searchConfig}
                        filterButtonConfig={filterButtonConfig}
                        sortConfig={sortConfig}
                    />
                </ExpandableContent>
            </StyledFilter>
        ),
        [headline, icons, isOpen, searchConfig, filterButtonConfig, sortConfig],
    );
};

Filter.displayName = 'Filter';

export default Filter;
