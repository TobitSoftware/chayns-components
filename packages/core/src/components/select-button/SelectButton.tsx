import { createDialog, DialogType, type DialogSelectListItemType } from 'chayns-api';
import React, { useMemo, type FC } from 'react';
import type { SelectButtonItem } from '../../types/selectButton';
import Button from '../button/Button';
import { StyledSelectButton } from './SelectButton.styles';

export type SelectButtonProps = {
    /**
     * The text that should be displayed inside the button.
     */
    buttonText: string;
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
    onSelect?: (ids: number[]) => void;
    /**
     * The id of an item that should be preselected.
     */
    selectedItemIds?: number[];
    /**
     * Whether more than one item should be selectable.
     */
    shouldAllowMultiSelect?: boolean;
    /**
     * Whether the search should be displayed inside the dialog.
     */
    shouldShowSearch?: boolean;
};

const SelectButton: FC<SelectButtonProps> = ({
    onSelect,
    selectedItemIds,
    shouldAllowMultiSelect,
    buttonText,
    shouldShowSearch,
    list,
    isDisabled,
}) => {
    const itemList = useMemo(() => {
        const items: DialogSelectListItemType[] = [];

        list.forEach(({ text, id }) => {
            const isSelected = selectedItemIds ? selectedItemIds.includes(id) : false;

            items.push({
                name: text,
                id,
                isSelected,
            });
        });

        return items;
    }, [list, selectedItemIds]);

    const selectedItemText = useMemo(() => {
        if (!selectedItemIds || selectedItemIds.length === 0) {
            return null;
        }

        let newText = '';

        list.forEach(({ text, id }) => {
            if (selectedItemIds?.includes(id)) {
                newText += newText.length === 0 ? `${text}` : `, ${text}`;
            }
        });

        return newText;
    }, [list, selectedItemIds]);

    const handleClick = () => {
        void createDialog({
            type: DialogType.SELECT,
            list: itemList,
            multiselect: shouldAllowMultiSelect,
            quickfind: shouldShowSearch,
        })
            .open()
            .then((result) => {
                // Ignore because there is no type
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                if (result && result.buttonType === 1 && typeof onSelect === 'function') {
                    // Ignore because there is no type
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    onSelect((result.result as string[]).map(Number));
                }
            });
    };

    return (
        <StyledSelectButton>
            <Button
                onClick={handleClick}
                isDisabled={isDisabled}
                isSecondary
                shouldShowTextAsRobotoMedium={false}
            >
                {selectedItemText ?? buttonText}
            </Button>
        </StyledSelectButton>
    );
};

SelectButton.displayName = 'SelectButton';

export default SelectButton;
