import React, { type FC, useMemo } from 'react';
import { StyledSelectButton } from './SelectButton.styles';
import Button from '../button/Button';
import type { SelectDialogItem } from '../../types/chayns';
import type { SelectButtonItem } from './types';

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
    selectedItemId?: string;
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
        const items: SelectDialogItem[] = [];

        list.forEach(({ text, id }) => {
            items.push({
                name: text,
                value: id,
                isSelected: id === selectedItemId,
            });
        });

        return items;
    }, [list, selectedItemId]);

    const handleClick = () => {
        chayns.dialog
            .select({
                title,
                // selectAllButton,
                message: description,
                quickfind: shouldShowSearch,
                multiselect: shouldAllowMultiSelect,
                list: itemList,
                buttons: shouldAllowMultiSelect || [],
            })
            .then((result) => {
                if (result.buttonType > 0) {
                    console.log('result', result);
                    // onSelect(this.getReturnList(result));
                }
            })
            .catch((err) => {
                // eslint-disable-next-line no-console
                console.error(err);
            });
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
