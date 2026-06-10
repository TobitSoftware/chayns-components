import React, { FC, ReactElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
    /**
     * Enables keyboard-only focus highlighting for filter buttons.
     */
    shouldEnableKeyboardHighlighting?: boolean;
};

const FilterButtons: FC<FilterButtonsProps> = ({
    allCount,
    selectedItemIds,
    onSelect,
    items,
    shouldCalcCountForAll = false,
    size = FilterButtonSize.Normal,
    shouldEnableKeyboardHighlighting = false,
}) => {
    const [selectedIds, setSelectedIds] = useState<string[]>(['all']);
    const [focusedId, setFocusedId] = useState<string>('all');
    const buttonRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const keyboardNavigationItems = useMemo(
        () => [
            { id: 'all', isDisabled: false },
            ...items.map(({ id, isDisabled }) => ({ id, isDisabled: Boolean(isDisabled) })),
        ],
        [items],
    );

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

    useEffect(() => {
        const currentFocusedItem = keyboardNavigationItems.find(({ id }) => id === focusedId);

        if (currentFocusedItem && !currentFocusedItem.isDisabled) {
            return;
        }

        const nextFocusable = keyboardNavigationItems.find(({ isDisabled }) => !isDisabled);

        if (nextFocusable) {
            setFocusedId(nextFocusable.id);
        }
    }, [focusedId, keyboardNavigationItems]);

    const handleArrowNavigate = useCallback(
        (currentId: string, direction: -1 | 1) => {
            if (!shouldEnableKeyboardHighlighting || keyboardNavigationItems.length < 2) {
                return;
            }

            const startIndex = keyboardNavigationItems.findIndex(({ id }) => id === currentId);

            if (startIndex < 0) {
                return;
            }

            let attempts = 0;
            let nextIndex = startIndex;

            while (attempts < keyboardNavigationItems.length) {
                nextIndex =
                    (nextIndex + direction + keyboardNavigationItems.length) %
                    keyboardNavigationItems.length;

                const nextItem = keyboardNavigationItems[nextIndex];

                if (!nextItem.isDisabled) {
                    setFocusedId(nextItem.id);
                    buttonRefs.current[nextItem.id]?.focus();
                    return;
                }

                attempts += 1;
            }
        },
        [keyboardNavigationItems, shouldEnableKeyboardHighlighting],
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
                    shouldEnableKeyboardHighlighting={shouldEnableKeyboardHighlighting}
                    onArrowNavigate={handleArrowNavigate}
                    onFocus={setFocusedId}
                    tabIndex={0}
                    buttonRef={(element) => {
                        buttonRefs.current.all = element;
                    }}
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
                    shouldEnableKeyboardHighlighting={shouldEnableKeyboardHighlighting}
                    onArrowNavigate={handleArrowNavigate}
                    onFocus={setFocusedId}
                    tabIndex={isDisabled ? -1 : 0}
                    buttonRef={(element) => {
                        buttonRefs.current[id] = element;
                    }}
                />,
            );
        });

        return array;
    }, [
        allCount,
        handleSelect,
        items,
        selectedIds,
        shouldCalcCountForAll,
        shouldEnableKeyboardHighlighting,
        handleArrowNavigate,
        size,
    ]);

    return useMemo(() => <StyledFilterButton>{reactItems}</StyledFilterButton>, [reactItems]);
};

FilterButtons.displayName = 'FilterButtons';

export default FilterButtons;
