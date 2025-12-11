import React, { FC, useCallback, useMemo } from 'react';
import { useIsTouch } from '../../../utils/environment';
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
    item: IComboBoxItem;
    isSelected: boolean;
    onSelect: (itemToSelect: IComboBoxItem) => void;
    shouldShowBigImage: ComboBoxProps['shouldShowBigImage'];
    shouldShowRoundImage: ComboBoxProps['shouldShowRoundImage'];
};

const ComboBoxItem: FC<ComboBoxItemProps> = ({
    item,
    isSelected,
    onSelect,
    shouldShowBigImage,
    shouldShowRoundImage,
}) => {
    const {
        icons,
        imageUrl,
        isDisabled,
        imageBackground,
        suffixElement,
        textStyles,
        rightElement,
        text,
        value,
        subtext,
    } = item;
    const id = value;

    const handleItemClick = useCallback(() => {
        if (!isDisabled) {
            onSelect({ text, value, suffixElement, imageUrl, icons });
        }
    }, [icons, imageUrl, isDisabled, onSelect, suffixElement, text, value]);

    const isTouch = useIsTouch();

    return useMemo(
        () => (
            <StyledComboBoxItem
                id={`combobox-item__${typeof id === 'number' ? String(id) : id}${isDisabled ? '--disabled-item' : ''}`}
                onClick={handleItemClick}
                $isDisabled={isDisabled}
                $isSelected={isSelected}
                $isTouch={isTouch}
            >
                {imageUrl && (
                    <StyledComboBoxItemImage
                        src={imageUrl}
                        $background={imageBackground}
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
            imageBackground,
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
