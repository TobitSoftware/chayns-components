import React, { FC, useCallback, useMemo } from 'react';
import type { IComboBoxItem } from '../ComboBox';
import { StyledComboBoxItem } from './ComboBoxItem.styles';

export type ComboBoxItemProps = {
    /**
     * Whether the item is selected.
     */
    isSelected: boolean;
    /**
     * Function to be executed when an item is selected.
     */
    onSelect: (itemToSelect: IComboBoxItem) => void;
    /**
     * The text of the item.
     */
    text: IComboBoxItem['text'];
    /**
     * The value of the item.
     */
    value: IComboBoxItem['value'];
};

const ComboBoxItem: FC<ComboBoxItemProps> = ({ isSelected, onSelect, text, value }) => {
    const handleItemClick = useCallback(() => {
        onSelect({ text, value });
    }, [onSelect, text, value]);

    const { isMobile } = chayns.env;

    return useMemo(
        () => (
            <StyledComboBoxItem
                onClick={handleItemClick}
                isMobile={isMobile}
                isSelected={isSelected}
            >
                {text}
            </StyledComboBoxItem>
        ),
        [handleItemClick, isMobile, isSelected, text],
    );
};

ComboBoxItem.displayName = 'ComboBoxItem';

export default ComboBoxItem;
