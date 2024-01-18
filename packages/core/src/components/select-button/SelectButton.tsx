import React, { type FC, useMemo } from 'react';
import { StyledSelectButton } from './SelectButton.styles';
import Button from '../button/Button';
import type { SelectButtonItem } from './types';
import { createDialog, type DialogSelectListItemType, DialogType } from 'chayns-api';

export type SelectButtonProps = {
    /**
     * The text that should be displayed inside the button.
     */
    buttonText: string;
    /**
     * The description of the dialog.
     */
    description?: string;
    /**
     * Whether the button should be disabled.
     */
    isDisabled?: boolean;
    /**
     * A list of item that could be selected.
     */
    list: SelectButtonItem[];
    /**
     * Function to be executed after an item is selected.
     */
    onSelect?: (ids: string[]) => void;
    /**
     * The id of an item that should be preselected.
     */
    selectedItemId?: id;
    /**
     * Whether more than one item should be selectable.
     */
    shouldAllowMultiSelect?: boolean;
    /**
     * Whether the search should be displayed inside the dialog.
     */
    shouldShowSearch?: boolean;
    /**
     * The title of the dialog.
     */
    title?: string;
};

const SelectButton: FC<SelectButtonProps> = ({
    onSelect,
    selectedItemId,
    shouldAllowMultiSelect,
    buttonText,
    shouldShowSearch,
    list,
    title,
    description,
    isDisabled,
}) => {
    const itemList = useMemo(() => {
        const items: DialogSelectListItemType[] = [];

        list.forEach(({ text, id }) => {
            items.push({
                name: text,
                id,
                isSelected: id === selectedItemId,
            });
        });

        return items;
    }, [list, selectedItemId]);

    const handleClick = () => {
        const result = createDialog({
            type: DialogType.SELECT,
            list: itemList,
            multiselect: shouldAllowMultiSelect,
            quickfind: shouldShowSearch,
        }).open();

        console.log('result', result);
    };

    return (
        <StyledSelectButton>
            <Button onClick={handleClick} isDisabled={isDisabled}>
                {buttonText}
            </Button>
        </StyledSelectButton>
    );
};

SelectButton.displayName = 'SelectButton';

export default SelectButton;
