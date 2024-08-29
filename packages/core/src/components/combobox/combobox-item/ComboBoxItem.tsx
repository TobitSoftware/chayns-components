import React, { FC, ReactNode, useCallback, useMemo } from 'react';
import { getIsTouch } from '../../../utils/environment';
import Icon from '../../icon/Icon';
import type { ComboBoxProps, IComboBoxItem } from '../ComboBox';
import {
    StyledComboBoxItem,
    StyledComboBoxItemContent,
    StyledComboBoxItemContentHeader,
    StyledComboBoxItemContentHeaderRightElement,
    StyledComboBoxItemContentHeaderText,
    StyledComboBoxItemContentSubtext,
    StyledComboBoxItemImage,
} from './ComboBoxItem.styles';

export type ComboBoxItemProps = {
    icons?: IComboBoxItem['icons'];
    id: IComboBoxItem['value'];
    imageUrl: IComboBoxItem['imageUrl'];
    isSelected: boolean;
    onSelect: (itemToSelect: IComboBoxItem) => void;
    rightElement: IComboBoxItem['rightElement'];
    shouldShowRoundImage: ComboBoxProps['shouldShowRoundImage'];
    subtext: IComboBoxItem['subtext'];
    suffixElement?: ReactNode;
    text: IComboBoxItem['text'];
    value: IComboBoxItem['value'];
};

const ComboBoxItem: FC<ComboBoxItemProps> = ({
    icons,
    id,
    imageUrl,
    isSelected,
    onSelect,
    rightElement,
    shouldShowRoundImage,
    subtext,
    suffixElement,
    text,
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
                        $shouldShowBigImage={typeof subtext === 'string'}
                        $shouldShowRoundImage={shouldShowRoundImage}
                    />
                )}
                {icons && <Icon icons={icons} />}
                <StyledComboBoxItemContent>
                    <StyledComboBoxItemContentHeader>
                        <StyledComboBoxItemContentHeaderText
                            $shouldShowBoldText={typeof subtext === 'string'}
                        >
                            {text}
                            {suffixElement}
                        </StyledComboBoxItemContentHeaderText>
                        <StyledComboBoxItemContentHeaderRightElement>
                            {rightElement}
                        </StyledComboBoxItemContentHeaderRightElement>
                    </StyledComboBoxItemContentHeader>
                    <StyledComboBoxItemContentSubtext>{subtext}</StyledComboBoxItemContentSubtext>
                </StyledComboBoxItemContent>
            </StyledComboBoxItem>
        ),
        [
            handleItemClick,
            icons,
            id,
            imageUrl,
            isSelected,
            isTouch,
            rightElement,
            shouldShowRoundImage,
            subtext,
            suffixElement,
            text,
        ],
    );
};

ComboBoxItem.displayName = 'ComboBoxItem';

export default ComboBoxItem;
