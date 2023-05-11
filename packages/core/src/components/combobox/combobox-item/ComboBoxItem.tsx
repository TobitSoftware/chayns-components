import React, { FC, useCallback, useMemo } from 'react';
import type { IComboBoxItem } from '../ComboBox';
import { StyledComboBoxItem, StyledComboBoxItemText } from './ComboBoxItem.styles';

export type ComboBoxItemProps = {
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

const ComboBoxItem: FC<ComboBoxItemProps> = ({ onSelect, text, value }) => {
    const handleItemClick = useCallback(() => {
        onSelect({ text, value });
    }, [onSelect, text, value]);

    return useMemo(
        () => (
            <StyledComboBoxItem onClick={handleItemClick}>
                <StyledComboBoxItemText>{text}</StyledComboBoxItemText>
            </StyledComboBoxItem>
        ),
        [handleItemClick, text]
    );
};

ComboBoxItem.displayName = 'ComboBoxItem';

export default ComboBoxItem;
