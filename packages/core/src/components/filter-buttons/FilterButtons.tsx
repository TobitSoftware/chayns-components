import React, { FC, ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import {
    FilterButtonItemShape,
    FilterButtonSize,
    IFilterButtonItem,
} from '../../types/filterButtons';
import FilterButton from './filter-button/FilterButton';
import { StyledFilterButton } from './FilterButtons.styles';

export type FilterButtonsProps = {
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
     * The size auf the filter buttons. Use the FilterButtonSize enum.
     */
    size?: FilterButtonSize;
};

const FilterButtons: FC<FilterButtonsProps> = ({
    selectedItemIds,
    onSelect,
    items,
    size = FilterButtonSize.Normal,
}) => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    /**
     * This function set the selectedItemKey
     */
    useEffect(() => {
        if (selectedItemIds) {
            setSelectedIds(selectedItemIds);
        }
    }, [selectedItemIds]);

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

            setSelectedIds(newIds);

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

        const array: ReactElement[] = [
            <FilterButton
                id="all"
                key="all"
                onSelect={handleSelect}
                isSelected={selectedIds.includes('all')}
                shape={FilterButtonItemShape.Rectangular}
                size={size}
                text="Alle"
            />,
        ];

        items.forEach(({ icons, text, color, count, id }) => {
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
                />,
            );
        });

        return array;
    }, [handleSelect, items, selectedIds, size]);

    return useMemo(() => <StyledFilterButton>{reactItems}</StyledFilterButton>, [reactItems]);
};

FilterButtons.displayName = 'FilterButtons';

export default FilterButtons;
