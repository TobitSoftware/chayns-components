import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
    StyledFilterComboboxWrapper,
    StyledFilterContent,
    StyledFilterSort,
    StyledFilterSortText,
} from './FilterContent.styles';
import OldInput from '../../old-input/OldInput';
import Icon from '../../icon/Icon';
import FilterButtons from '../../filter-buttons/FilterButtons';
import {
    CheckboxConfig,
    FilterButtonConfig,
    SearchConfig,
    SortConfig,
} from '../../../types/filter';
import ComboBox, { IComboBoxItem } from '../../combobox/ComboBox';
import Checkbox from '../../checkbox/Checkbox';

export type FilterContentProps = {
    searchConfig?: SearchConfig;
    filterButtonConfig?: FilterButtonConfig;
    sortConfig?: SortConfig;
    checkboxConfig?: CheckboxConfig;
};

const FilterContent: FC<FilterContentProps> = ({
    searchConfig,
    sortConfig,
    filterButtonConfig,
    checkboxConfig,
}) => {
    const sortTextRef = useRef<HTMLDivElement>(null);

    const [sortTextWidth, setSortTextWidth] = useState(0);

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

    useEffect(() => {
        if (sortTextRef.current) {
            setSortTextWidth(sortTextRef.current.clientWidth + 20);
        }
    }, []);

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
                        <StyledFilterSortText ref={sortTextRef}>Sortierung</StyledFilterSortText>
                        <StyledFilterComboboxWrapper $textWidth={sortTextWidth}>
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
                        </StyledFilterComboboxWrapper>
                    </StyledFilterSort>
                )}
                {checkboxConfig && (
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    <Checkbox {...checkboxConfig} />
                )}
            </StyledFilterContent>
        ),
        [
            checkboxConfig,
            filterButtonConfig,
            handleSelectSortItem,
            searchConfig,
            sortConfig,
            sortTextWidth,
        ],
    );
};

FilterContent.displayName = 'FilterContent';

export default FilterContent;
