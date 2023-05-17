import React, { CSSProperties, FC, useMemo, useState } from 'react';
import Icon from '../../icon/Icon';
import type { FilterButtonItemShape, FilterButtonSize } from '../interface';
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
};

const FilterButtonItem: FC<FilterButtonItemProps> = ({
    icons,
    size,
    shape,
    text,
    color,
    selected,
}) => {
    const [selectedItem, setSelectedItem] = useState();

    return useMemo(
        () => (
            <StyledFilterButtonItem selected={selected} color={color} size={size} shape={shape}>
                <StyledFilterButtonItemTextWrapper>
                    {icons && <Icon icons={icons} />}
                    <StyledFilterButtonItemText>{text}</StyledFilterButtonItemText>
                </StyledFilterButtonItemTextWrapper>

                <StyledFilterButtonItemBackground color={color} size={size} shape={shape} />
            </StyledFilterButtonItem>
        ),
        [color, icons, selected, shape, size, text]
    );
};

FilterButtonItem.displayName = 'FilterButtonItem';

export default FilterButtonItem;
