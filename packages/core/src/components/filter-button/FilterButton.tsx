import React, { FC, ReactElement, useEffect, useMemo, useState } from 'react';
import FilterButtonItem from './filter-button-item/FilterButtonItem';
import { StyledFilterButton } from './FilterButton.styles';
import { FilterButtonItemShape, FilterButtonSize, IFilterButtonItem } from './interface';
import { selectFilterButtonItemByKey } from './utils';

export type FilterButtonProps = {
    /**
     * The items that should be displayed.
     */
    items: IFilterButtonItem[];
    /**
     * A function that should be executed when an item is selected.
     */
    onSelect?: (itemKey: string) => void;
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
    const [selectedItem, setSelectedItem] = useState<IFilterButtonItem>();

    /**
     * Function that calls the onSelect
     */
    useEffect(() => {
        if (onSelect) {
            onSelect(selectedItem);
        }
    }, [onSelect, selectedItem]);

    /**
     * This function set the selectedItemKey
     */
    useEffect(() => {
        if (selectedItemKey) {
            const filteredItem = selectFilterButtonItemByKey({ key: selectedItemKey, items });

            if (!filteredItem) {
                return;
            }

            setSelectedItem(filteredItem);
        }
    }, [items, selectedItemKey]);

    /**
     * Function to update the selected item
     */
    // const handleSelect = (key: string) => {
    //
    // }

    const reactItems = useMemo(() => {
        const array: ReactElement[] = [
            <FilterButtonItem
                key="all"
                shape={FilterButtonItemShape.Rectangular}
                size={size}
                text="Alle"
            />,
        ];

        items.forEach(({ icons, text, color, id }) => {
            array.push(
                <FilterButtonItem
                    key={id}
                    shape={FilterButtonItemShape.Round}
                    size={size}
                    text={text}
                    icons={icons}
                    color={color}
                />
            );
        });

        return array;
    }, [items, size]);

    return useMemo(() => <StyledFilterButton>{reactItems}</StyledFilterButton>, [reactItems]);
};

FilterButton.displayName = 'FilterButton';

export default FilterButton;
