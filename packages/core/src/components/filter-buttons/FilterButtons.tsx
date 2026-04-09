import React, { FC, ReactElement, useCallback, useMemo, useState } from 'react';
import {
    FilterButtonItemShape,
    FilterButtonSize,
    IFilterButtonItem,
} from '../../types/filterButtons';
import FilterButton from './filter-button/FilterButton';
import { StyledFilterButton } from './FilterButtons.styles';
import { AllButton } from './all-button/AllButton';
import { TextstringProvider } from '@chayns-components/textstring';

export type FilterButtonsProps = {
    /**
     * The number that should be displayed as count in the "all" button.
     */
    allCount?: number;
    /**
     * The items that should be displayed.
     */
    items: IFilterButtonItem[];
    /**
     * A function that should be executed when an item is selected.
     */
    onSelect?: (keys: string[]) => void;
    /**
     * The keys of items that should be selected.
     */
    selectedItemIds?: string[];
    /**
     * If true, the count of all items will be shown in the "all" button.
     */
    shouldCalcCountForAll?: boolean;
    /**
     * The size auf the filter buttons. Use the FilterButtonSize enum.
     */
    size?: FilterButtonSize;
};

const FilterButtons: FC<FilterButtonsProps> = ({
    allCount,
    selectedItemIds,
    onSelect,
    items,
    shouldCalcCountForAll = false,
    size = FilterButtonSize.Normal,
}) => {
    const [internalSelectedIds, setInternalSelectedIds] = useState<string[]>(['all']);

    const selectedIds = selectedItemIds || internalSelectedIds;

    /**
     * Function to update the selected items
     */
    const handleSelect = useCallback(
        (id: string) => {
            let newIds: string[];

            if (id === 'all') {
                newIds = selectedIds.includes('all') ? ['all'] : [];
            } else {
                newIds = selectedIds.includes(id)
                    ? selectedIds.filter((filteredId) => filteredId !== id)
                    : [...selectedIds.filter((filteredId) => filteredId !== 'all'), id];
            }

            if (newIds.length === 0) {
                newIds = ['all'];
            }

            setInternalSelectedIds(newIds);

            if (typeof onSelect === 'function') {
                onSelect(newIds.filter((selectedId) => selectedId !== 'all'));
            }
        },
        [onSelect, selectedIds],
    );

    const reactItems = useMemo(() => {
        if (items.length === 0) {
            return null;
        }

        let allButtonCount = allCount;

        if (typeof allButtonCount !== 'number' && shouldCalcCountForAll) {
            allButtonCount = items.reduce((acc, item) => acc + (item.count || 0), 0);
        }

        const array: ReactElement[] = [
            <TextstringProvider libraryName="@chayns-components-core">
                <AllButton
                    count={allButtonCount}
                    isSelected={
                        selectedIds.includes('all') ||
                        (Array.isArray(selectedIds) && selectedIds.length === 0)
                    }
                    size={size}
                    onSelect={handleSelect}
                />
            </TextstringProvider>,
        ];

        items.forEach(({ icons, text, color, count, id, isDisabled }) => {
            array.push(
                <FilterButton
                    color={color}
                    icons={icons}
                    id={id}
                    key={id}
                    count={count}
                    onSelect={handleSelect}
                    isSelected={selectedIds.includes(id)}
                    shape={FilterButtonItemShape.Round}
                    size={size}
                    text={text}
                    isDisabled={isDisabled}
                />,
            );
        });

        return array;
    }, [allCount, handleSelect, items, selectedIds, shouldCalcCountForAll, size]);

    return useMemo(() => <StyledFilterButton>{reactItems}</StyledFilterButton>, [reactItems]);
};

FilterButtons.displayName = 'FilterButtons';

export default FilterButtons;
