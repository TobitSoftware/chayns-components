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
    onSelect?: (key: string) => void;
    /**
     * The key of an item that should be selected.
     */
    selectedItemKey?: string;
    /**
     * The size auf the filter buttons. Use the FilterButtonSize enum.
     */
    size?: FilterButtonSize;
};

const FilterButton: FC<FilterButtonProps> = ({
    selectedItemKey,
    onSelect,
    items,
    size = FilterButtonSize.Normal,
}) => {
    const [selectedItemId, setSelectedItemId] = useState<string>('all');

    /**
     * Function that calls the onSelect
     */
    useEffect(() => {
        if (onSelect && selectedItemId) {
            onSelect(selectedItemId);
        }
    }, [items, onSelect, selectedItemId]);

    /**
     * This function set the selectedItemKey
     */
    useEffect(() => {
        if (selectedItemKey) {
            setSelectedItemId(selectedItemKey);
        }
    }, [selectedItemKey]);

    /**
     * Function to update the selected item
     */
    const handleSelect = useCallback(
        (key: string) => {
            if (key === selectedItemId) {
                setSelectedItemId('all');

                return;
            }

            setSelectedItemId(key);
        },
        [selectedItemId]
    );

    const reactItems = useMemo(() => {
        const array: ReactElement[] = [
            <FilterButtonItem
                id="all"
                key="all"
                onSelect={handleSelect}
                selected={selectedItemId === 'all'}
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
                    selected={selectedItemId === id}
                    shape={FilterButtonItemShape.Round}
                    size={size}
                    text={text}
                />
            );
        });

        return array;
    }, [handleSelect, items, selectedItemId, size]);

    return useMemo(() => <StyledFilterButton>{reactItems}</StyledFilterButton>, [reactItems]);
};

FilterButton.displayName = 'FilterButton';

export default FilterButton;
