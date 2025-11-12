import React, { CSSProperties, FC, MouseEvent, useCallback, useMemo } from 'react';
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
    isDisabled?: boolean;
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
    isDisabled,
    onSelect,
}) => {
    const handleClick = useCallback(
        (event: MouseEvent) => {
            if (isDisabled) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();

            onSelect(id);
        },
        [id, isDisabled, onSelect],
    );

    return useMemo(
        () => (
            <StyledFilterButtonItem
                $isSelected={isSelected}
                $isDisabled={isDisabled}
                $size={size}
                onClick={handleClick}
            >
                <StyledFilterButtonItemLabel>
                    {icons && <Icon icons={icons} size={15} />}
                    <StyledFilterButtonItemLabelText>{text}</StyledFilterButtonItemLabelText>
                    {typeof count === 'number' && (
                        <StyledFilterButtonItemLabelCount>
                            {count.toLocaleString()}
                        </StyledFilterButtonItemLabelCount>
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
        [color, count, handleClick, icons, isDisabled, isSelected, shape, size, text],
    );
};

FilterButton.displayName = 'FilterButton';

export default FilterButton;
