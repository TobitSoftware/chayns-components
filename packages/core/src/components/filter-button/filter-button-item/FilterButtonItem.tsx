import React, { CSSProperties, FC, useCallback, useMemo } from 'react';
import Icon from '../../icon/Icon';
import { FilterButtonItemShape, FilterButtonSize } from '../interface';
import {
    StyledFilterButtonItem,
    StyledFilterButtonItemBackground,
    StyledFilterButtonItemText,
    StyledFilterButtonItemTextWrapper,
} from './FilterButtonItem.styles';

export type FilterButtonItemProps = {
    color?: CSSProperties['color'];
    icons?: string[];
    selected: boolean;
    shape: FilterButtonItemShape;
    size: FilterButtonSize;
    text: string;
    id: string;
    onSelect: (key: string) => void;
};

const FilterButtonItem: FC<FilterButtonItemProps> = ({
    icons,
    size,
    shape,
    text,
    color,
    selected,
    id,
    onSelect,
}) => {
    const handleClick = useCallback(() => {
        onSelect(id);
    }, [id, onSelect]);

    return useMemo(
        () => (
            <StyledFilterButtonItem
                onClick={handleClick}
                shape={shape}
                color={color}
                selected={selected}
                size={size}
            >
                <StyledFilterButtonItemTextWrapper size={size}>
                    {icons && (
                        <Icon icons={icons} size={size === FilterButtonSize.Small ? 10 : 15} />
                    )}
                    <StyledFilterButtonItemText size={size}>{text}</StyledFilterButtonItemText>
                </StyledFilterButtonItemTextWrapper>
                <StyledFilterButtonItemBackground color={color} shape={shape} />
            </StyledFilterButtonItem>
        ),
        [color, handleClick, icons, selected, shape, size, text]
    );
};

FilterButtonItem.displayName = 'FilterButtonItem';

export default FilterButtonItem;
