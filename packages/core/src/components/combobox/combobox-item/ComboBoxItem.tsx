import React, { FC, ReactNode, useCallback, useMemo } from 'react';
import type { ComboBoxProps, IComboBoxItem } from '../ComboBox';
import { StyledComboBoxItem, StyledComboBoxItemImage } from './ComboBoxItem.styles';

export type ComboBoxItemProps = {
    imageUrl: IComboBoxItem['imageUrl'];
    isSelected: boolean;
    onSelect: (itemToSelect: IComboBoxItem) => void;
    shouldShowRoundImage: ComboBoxProps['shouldShowRoundImage'];
    suffixElement?: ReactNode;
    text: IComboBoxItem['text'];
    value: IComboBoxItem['value'];
};

const ComboBoxItem: FC<ComboBoxItemProps> = ({
    imageUrl,
    isSelected,
    onSelect,
    shouldShowRoundImage,
    suffixElement,
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
                {suffixElement}
            </StyledComboBoxItem>
        ),
        [
            handleItemClick,
            imageUrl,
            isMobile,
            isSelected,
            shouldShowRoundImage,
            suffixElement,
            text,
        ],
    );
};

ComboBoxItem.displayName = 'ComboBoxItem';

export default ComboBoxItem;
