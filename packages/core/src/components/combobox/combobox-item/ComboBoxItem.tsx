import React, { FC, useCallback, useMemo } from 'react';
import type { ComboBoxProps, IComboBoxItem } from '../ComboBox';
import { StyledComboBoxItem, StyledComboBoxItemImage } from './ComboBoxItem.styles';

export type ComboBoxItemProps = {
    imageUrl: IComboBoxItem['imageUrl'];
    isSelected: boolean;
    onSelect: (itemToSelect: IComboBoxItem) => void;
    shouldShowRoundImage: ComboBoxProps['shouldShowRoundImage'];
    text: IComboBoxItem['text'];
    value: IComboBoxItem['value'];
};

const ComboBoxItem: FC<ComboBoxItemProps> = ({
    imageUrl,
    isSelected,
    onSelect,
    shouldShowRoundImage,
    text,
    value,
}) => {
    const handleItemClick = useCallback(() => {
        onSelect({ text, value });
    }, [onSelect, text, value]);

    const { isMobile } = chayns.env;

    return useMemo(
        () => (
            <StyledComboBoxItem
                onClick={handleItemClick}
                $isMobile={isMobile}
                $isSelected={isSelected}
            >
                {imageUrl && (
                    <StyledComboBoxItemImage
                        src={imageUrl}
                        $shouldShowRoundImage={shouldShowRoundImage}
                    />
                )}
                {text}
            </StyledComboBoxItem>
        ),
        [handleItemClick, imageUrl, isMobile, isSelected, shouldShowRoundImage, text],
    );
};

ComboBoxItem.displayName = 'ComboBoxItem';

export default ComboBoxItem;
