import React, { FC, ReactNode, useCallback, useMemo } from 'react';
import { getIsTouch } from '../../../utils/environment';
import Icon from '../../icon/Icon';
import type { ComboBoxProps, IComboBoxItem } from '../ComboBox';
import {
    StyledComboBoxItem,
    StyledComboBoxItemContent,
    StyledComboBoxItemContentHeader,
    StyledComboBoxItemContentHeaderRightElement,
    StyledComboBoxItemContentHeaderWrapper,
    StyledComboBoxItemContentHeaderWrapperText,
    StyledComboBoxItemContentSubtext,
    StyledComboBoxItemImage,
} from './ComboBoxItem.styles';

export type ComboBoxItemProps = {
    icons?: IComboBoxItem['icons'];
    id: IComboBoxItem['value'];
    imageBackgroundColor?: IComboBoxItem['imageBackgroundColor'];
    imageUrl: IComboBoxItem['imageUrl'];
    isDisabled?: IComboBoxItem['isDisabled'];
    isSelected: boolean;
    onSelect: (itemToSelect: IComboBoxItem) => void;
    rightElement: IComboBoxItem['rightElement'];
    shouldShowBigImage: ComboBoxProps['shouldShowBigImage'];
    shouldShowRoundImage: ComboBoxProps['shouldShowRoundImage'];
    subtext: IComboBoxItem['subtext'];
    suffixElement?: ReactNode;
    text: IComboBoxItem['text'];
    value: IComboBoxItem['value'];
    textStyles?: IComboBoxItem['textStyles'];
};

const ComboBoxItem: FC<ComboBoxItemProps> = ({
    icons,
    id,
    imageBackgroundColor,
    imageUrl,
    isDisabled,
    isSelected,
    onSelect,
    rightElement,
    shouldShowBigImage,
    shouldShowRoundImage,
    subtext,
    suffixElement,
    textStyles,
    text,
    value,
}) => {
    const handleItemClick = useCallback(() => {
        if (!isDisabled) {
            onSelect({ text, value, suffixElement, imageUrl, icons });
        }
    }, [icons, imageUrl, isDisabled, onSelect, suffixElement, text, value]);

    const isTouch = getIsTouch();

    return useMemo(
        () => (
            <StyledComboBoxItem
                id={`combobox-item__${typeof id === 'number' ? String(id) : id}`}
                onClick={handleItemClick}
                $isDisabled={isDisabled}
                $isSelected={isSelected}
                $isTouch={isTouch}
            >
                {imageUrl && (
                    <StyledComboBoxItemImage
                        src={imageUrl}
                        $backgroundColor={imageBackgroundColor}
                        $shouldShowBigImage={
                            shouldShowBigImage ||
                            (typeof subtext === 'string' && subtext.trim() !== '')
                        }
                        $shouldShowRoundImage={shouldShowRoundImage}
                    />
                )}
                {icons && <Icon icons={icons} />}
                <StyledComboBoxItemContent>
                    <StyledComboBoxItemContentHeader $text={text} $subtext={subtext}>
                        <StyledComboBoxItemContentHeaderWrapper
                            as={textStyles?.tagName}
                            style={textStyles?.styles}
                        >
                            <StyledComboBoxItemContentHeaderWrapperText>
                                {text}
                            </StyledComboBoxItemContentHeaderWrapperText>
                            {suffixElement}
                        </StyledComboBoxItemContentHeaderWrapper>
                        {rightElement && (
                            <StyledComboBoxItemContentHeaderRightElement>
                                {rightElement}
                            </StyledComboBoxItemContentHeaderRightElement>
                        )}
                    </StyledComboBoxItemContentHeader>
                    {subtext && (
                        <StyledComboBoxItemContentSubtext>
                            {subtext}
                        </StyledComboBoxItemContentSubtext>
                    )}
                </StyledComboBoxItemContent>
            </StyledComboBoxItem>
        ),
        [
            handleItemClick,
            icons,
            id,
            imageBackgroundColor,
            imageUrl,
            isDisabled,
            isSelected,
            isTouch,
            rightElement,
            shouldShowBigImage,
            shouldShowRoundImage,
            subtext,
            suffixElement,
            text,
            textStyles?.styles,
            textStyles?.tagName,
        ],
    );
};

ComboBoxItem.displayName = 'ComboBoxItem';

export default ComboBoxItem;
