import React, { FC, ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import FilterButtonItem from './filter-button-item/FilterButtonItem';
import { StyledFilterButton } from './FilterButton.styles';
import { FilterButtonItemShape, FilterButtonSize, IFilterButtonItem } from './interface';

export type FilterButtonProps = {
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

const FilterButton: FC<FilterButtonProps> = ({
    selectedItemIds,
    onSelect,
    items,
    size = FilterButtonSize.Normal,
}) => {
    const [selectedIds, setSelectedIds] = useState<string[]>(['all']);

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
                newIds = selectedIds.includes('all') ? [] : ['all'];
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
                onSelect(newIds);
            }
        },
        [onSelect, selectedIds]
    );

    const reactItems = useMemo(() => {
        if (items.length === 0) {
            return null;
        }

        const array: ReactElement[] = [
            <FilterButtonItem
                id="all"
                key="all"
                onSelect={handleSelect}
                isSelected={selectedIds.includes('all')}
                shape={FilterButtonItemShape.Rectangular}
                size={size}
                text="Alle"
            />,
        ];

        items.forEach(({ icons, text, color, id }) => {
            array.push(
                <FilterButtonItem
                    color={color}
                    icons={icons}
                    id={id}
                    key={id}
                    onSelect={handleSelect}
                    isSelected={selectedIds.includes(id)}
                    shape={FilterButtonItemShape.Round}
                    size={size}
                    text={text}
                />
            );
        });

        return array;
    }, [handleSelect, items, selectedIds, size]);

    return useMemo(() => <StyledFilterButton>{reactItems}</StyledFilterButton>, [reactItems]);
};

FilterButton.displayName = 'FilterButton';

export default FilterButton;
