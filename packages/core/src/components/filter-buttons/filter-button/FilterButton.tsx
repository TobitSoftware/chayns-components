import React, { CSSProperties, FC, useCallback, useMemo } from 'react';
import type { FilterButtonItemShape, FilterButtonSize } from '../../../types/filterButtons';
import Icon from '../../icon/Icon';
import {
    StyledFilterButtonItem,
    StyledFilterButtonItemBorder,
    StyledFilterButtonItemLabel,
    StyledFilterButtonItemLabelCount,
    StyledFilterButtonItemLabelText,
    StyledMotionFilterButtonItemBackground,
} from './FilterButton.styles';

export type FilterButtonProps = {
    color?: CSSProperties['color'];
    icons?: string[];
    isSelected: boolean;
    shape: FilterButtonItemShape;
    size: FilterButtonSize;
    count?: number;
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
    count,
    isSelected,
    id,
    onSelect,
}) => {
    const handleClick = useCallback(() => {
        onSelect(id);
    }, [id, onSelect]);

    return useMemo(
        () => (
            <StyledFilterButtonItem $isSelected={isSelected} $size={size} onClick={handleClick}>
                <StyledFilterButtonItemLabel>
                    {icons && <Icon icons={icons} size={15} />}
                    <StyledFilterButtonItemLabelText>{text}</StyledFilterButtonItemLabelText>
                    {count && (
                        <StyledFilterButtonItemLabelCount>{count}</StyledFilterButtonItemLabelCount>
                    )}
                </StyledFilterButtonItemLabel>
                <StyledFilterButtonItemBorder
                    $isSelected={isSelected}
                    $shape={shape}
                    $color={color}
                />
                <StyledMotionFilterButtonItemBackground
                    $isSelected={isSelected}
                    $shape={shape}
                    $color={color}
                />
            </StyledFilterButtonItem>
        ),
        [color, count, handleClick, icons, isSelected, shape, size, text],
    );
};

FilterButton.displayName = 'FilterButton';

export default FilterButton;
