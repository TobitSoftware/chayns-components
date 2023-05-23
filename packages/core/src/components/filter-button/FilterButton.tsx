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
    selectedItemId?: string;
    /**
     * The size auf the filter buttons. Use the FilterButtonSize enum.
     */
    size?: FilterButtonSize;
};

const FilterButton: FC<FilterButtonProps> = ({
    selectedItemId,
    onSelect,
    items,
    size = FilterButtonSize.Normal,
}) => {
    const [selectedId, setSelectedId] = useState<string>('all');

    /**
     * This function set the selectedItemKey
     */
    useEffect(() => {
        if (selectedItemId) {
            setSelectedId(selectedItemId);
        }
    }, [selectedItemId]);

    /**
     * Function to update the selected item
     */
    const handleSelect = useCallback(
        (id: string) => {
            const newId = id === selectedId ? 'all' : id;

            setSelectedId(newId);

            if (typeof onSelect === 'function') {
                onSelect(newId);
            }
        },
        [onSelect, selectedId]
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
                isSelected={selectedId === 'all'}
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
                    isSelected={selectedId === id}
                    shape={FilterButtonItemShape.Round}
                    size={size}
                    text={text}
                />
            );
        });

        return array;
    }, [handleSelect, items, selectedId, size]);

    return useMemo(() => <StyledFilterButton>{reactItems}</StyledFilterButton>, [reactItems]);
};

FilterButton.displayName = 'FilterButton';

export default FilterButton;
