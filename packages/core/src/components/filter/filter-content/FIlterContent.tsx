import React, { FC, useCallback, useMemo } from 'react';
import {
    StyledFilterContent,
    StyledFilterSort,
    StyledFilterSortText,
} from './FilterContent.styles';
import OldInput from '../../old-input/OldInput';
import Icon from '../../icon/Icon';
import FilterButtons from '../../filter-buttons/FilterButtons';
import { FilterButtonConfig, SearchConfig, SortConfig } from '../../../types/filter';
import ComboBox, { IComboBoxItem } from '../../combobox/ComboBox';

export type FilterContentProps = {
    searchConfig?: SearchConfig;
    filterButtonConfig?: FilterButtonConfig;
    sortConfig?: SortConfig;
};

const FilterContent: FC<FilterContentProps> = ({
    searchConfig,
    sortConfig,
    filterButtonConfig,
}) => {
    const handleSelectSortItem = useCallback(
        (item: IComboBoxItem | undefined) => {
            if (!item) {
                return;
            }

            const { text, value } = item;

            if (sortConfig) {
                sortConfig.onSortChange({ text, id: value });
            }
        },
        [sortConfig],
    );

    return useMemo(
        () => (
            <StyledFilterContent>
                {searchConfig && (
                    <OldInput
                        onChange={(ev) => searchConfig.onSearchChange(ev.target.value)}
                        placeholder="Suche"
                        value={searchConfig.searchValue}
                        shouldShowClearIcon={searchConfig.searchValue.length > 0}
                        leftElement={<Icon icons={['fa fa-search']} />}
                    />
                )}
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                {filterButtonConfig && <FilterButtons {...filterButtonConfig} />}
                {sortConfig && (
                    <StyledFilterSort>
                        <StyledFilterSortText>Sortierung</StyledFilterSortText>
                        <ComboBox
                            lists={[
                                {
                                    list: sortConfig.items.map(({ text, id }) => ({
                                        text,
                                        value: id,
                                    })),
                                },
                            ]}
                            placeholder=""
                            selectedItem={{
                                text: sortConfig.selectedItem.text,
                                value: sortConfig.selectedItem.id,
                            }}
                            onSelect={handleSelectSortItem}
                        />
                    </StyledFilterSort>
                )}
            </StyledFilterContent>
        ),
        [filterButtonConfig, handleSelectSortItem, searchConfig, sortConfig],
    );
};

FilterContent.displayName = 'FilterContent';

export default FilterContent;
