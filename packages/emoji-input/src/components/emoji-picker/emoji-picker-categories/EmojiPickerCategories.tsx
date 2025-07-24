import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CATEGORY_EMOJIS } from '../../../constants/categories';
import type { Category } from '../../../types/category';
import {
    StyledEmojiPickerCategories,
    StyledMotionEmojiPickerCategory,
} from './EmojiPickerCategories.styles';
import { useCombinedRefs, useIsMeasuredClone } from '@chayns-components/core';

export type EmojiPickerCategoriesProps = {
    onSelect: (category: Category) => void;
    searchString: string;
    selectedCategory: Category;
};

const EmojiPickerCategories: FC<EmojiPickerCategoriesProps> = ({
    onSelect,
    searchString,
    selectedCategory,
}) => {
    const [focusedIndex, setFocusedIndex] = useState(1);

    const [shouldPreventListener, ref] = useIsMeasuredClone();

    const categoryRef = useRef<HTMLDivElement>(null);

    const combinedRef = useCombinedRefs(categoryRef, ref);

    const isSearchStringGiven = searchString.trim() !== '';

    const handleSelect = useCallback(
        (slug: Category) => {
            onSelect(slug);
        },
        [onSelect],
    );

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (shouldPreventListener) {
                return;
            }

            if (event.key === 'Tab' || (event.key === 'Tab' && event.shiftKey)) {
                event.preventDefault();

                const children = categoryRef.current?.children;
                if (children && children.length > 0) {
                    let newIndex = focusedIndex !== null ? focusedIndex : 0;

                    if (event.key === 'Tab' && event.shiftKey) {
                        newIndex = (newIndex - 1) % children.length;
                    } else if (event.key === 'Tab') {
                        newIndex = (newIndex + 1) % children.length;
                    }

                    // remove focus from the old element
                    if (focusedIndex !== null) {
                        const prevElement = children[focusedIndex] as HTMLDivElement;
                        prevElement.tabIndex = -1;
                    }

                    if (newIndex < 0) {
                        newIndex = children.length - 1;
                    } else if (newIndex > children.length - 1) {
                        newIndex = 0;
                    }

                    setFocusedIndex(newIndex);

                    // Set focus to the element
                    const newElement = children[newIndex] as HTMLDivElement;
                    newElement.tabIndex = 0;
                    newElement.focus();

                    if (!newElement) {
                        return;
                    }

                    const { id } = newElement;

                    handleSelect(id as Category);
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [focusedIndex, handleSelect, shouldPreventListener]);

    const handleClick = useCallback(
        (slug: Category) => {
            handleSelect(slug);
        },
        [handleSelect],
    );

    const categories = useMemo(
        () =>
            Object.keys(CATEGORY_EMOJIS).map((slug) => {
                const isSelected = selectedCategory === slug && !isSearchStringGiven;

                return (
                    <StyledMotionEmojiPickerCategory
                        animate={{
                            filter: `grayscale(${isSelected ? 0 : 0.75})`,
                            opacity: isSelected ? 1 : 0.5,
                        }}
                        className="prevent-lose-focus"
                        initial={false}
                        key={slug}
                        id={slug}
                        onClick={() => handleClick(slug as Category)}
                        transition={{ duration: 0.2 }}
                    >
                        {CATEGORY_EMOJIS[slug as Category]}
                    </StyledMotionEmojiPickerCategory>
                );
            }),
        [handleClick, isSearchStringGiven, selectedCategory],
    );

    return (
        <StyledEmojiPickerCategories ref={combinedRef}>{categories}</StyledEmojiPickerCategories>
    );
};

EmojiPickerCategories.displayName = 'EmojiPickerCategories';

export default EmojiPickerCategories;
