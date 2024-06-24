import React, { FC, ReactNode, useCallback, useMemo } from 'react';
import { Icon } from '../../../index';
import { getIsTouch } from '../../../utils/environment';
import type { ComboBoxProps, IComboBoxItem } from '../ComboBox';
import { StyledComboBoxItem, StyledComboBoxItemImage } from './ComboBoxItem.styles';

export type ComboBoxItemProps = {
    imageUrl: IComboBoxItem['imageUrl'];
    isSelected: boolean;
    onSelect: (itemToSelect: IComboBoxItem) => void;
    shouldShowRoundImage: ComboBoxProps['shouldShowRoundImage'];
    icons?: IComboBoxItem['icons'];
    suffixElement?: ReactNode;
    text: IComboBoxItem['text'];
    value: IComboBoxItem['value'];
    id: IComboBoxItem['value'];
};

const ComboBoxItem: FC<ComboBoxItemProps> = ({
    imageUrl,
    isSelected,
    icons,
    onSelect,
    shouldShowRoundImage,
    suffixElement,
    text,
    id,
    value,
}) => {
    const handleItemClick = useCallback(() => {
        onSelect({ text, value, suffixElement, imageUrl });
    }, [imageUrl, onSelect, suffixElement, text, value]);

    const isTouch = getIsTouch();

    return useMemo(
        () => (
            <StyledComboBoxItem
                id={`combobox-item__${typeof id === 'number' ? String(id) : id}`}
                onClick={handleItemClick}
                $isTouch={isTouch}
                $isSelected={isSelected}
            >
                {imageUrl && (
                    <StyledComboBoxItemImage
                        src={imageUrl}
                        $shouldShowRoundImage={shouldShowRoundImage}
                    />
                )}
                {icons && <Icon icons={icons} />}
                {text}
                {suffixElement}
            </StyledComboBoxItem>
        ),
        [
            handleItemClick,
            icons,
            id,
            imageUrl,
            isSelected,
            isTouch,
            shouldShowRoundImage,
            suffixElement,
            text,
        ],
    );
};

ComboBoxItem.displayName = 'ComboBoxItem';

export default ComboBoxItem;
