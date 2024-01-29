import React, { CSSProperties, FC, useCallback, useMemo } from 'react';
import { FilterButtonItemShape, FilterButtonSize } from '../../../types/filterButtons';
import {
    StyledFilterButtonItem,
    StyledFilterButtonItemBorder,
    StyledFilterButtonItemLabel,
    StyledFilterButtonItemLabelText,
    StyledMotionFilterButtonItemBackground,
} from './FilterButton.styles';
import Icon from '../../icon/Icon';

export type FilterButtonProps = {
    color?: CSSProperties['color'];
    icons?: string[];
    isSelected: boolean;
    shape: FilterButtonItemShape;
    size: FilterButtonSize;
    text: string;
    id: string;
    onSelect: (key: string) => void;
};

const FilterButton: FC<FilterButtonProps> = ({
    icons,
    size,
    shape,
    text,
    color,
    isSelected,
    id,
    onSelect,
}) => {
    const handleClick = useCallback(() => {
        onSelect(id);
    }, [id, onSelect]);

    return useMemo(
        () => (
            <StyledFilterButtonItem isSelected={isSelected} size={size} onClick={handleClick}>
                <StyledFilterButtonItemLabel>
                    {icons && (
                        <Icon icons={icons} size={size === FilterButtonSize.Normal ? 15 : 10} />
                    )}
                    <StyledFilterButtonItemLabelText>{text}</StyledFilterButtonItemLabelText>
                </StyledFilterButtonItemLabel>
                <StyledFilterButtonItemBorder isSelected={isSelected} shape={shape} color={color} />
                <StyledMotionFilterButtonItemBackground
                    isSelected={isSelected}
                    shape={shape}
                    color={color}
                />
            </StyledFilterButtonItem>
        ),
        [color, handleClick, icons, isSelected, shape, size, text],
    );
};

FilterButton.displayName = 'FilterButton';

export default FilterButton;
