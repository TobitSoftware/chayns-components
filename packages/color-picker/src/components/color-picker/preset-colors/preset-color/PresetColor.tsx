import React, { useContext, useMemo } from 'react';
import type { IPresetColor } from '../../../../types';
import { ColorPickerContext } from '../../ColorPicker';
import { StyledPresetColor } from './PresetColor.styles';

interface PresetColorProps {
    id: IPresetColor['id'];
    color: IPresetColor['color'];
    isCustom: IPresetColor['isCustom'];
}

const PresetColor = ({ id, color, isCustom }: PresetColorProps) => {
    const { selectedColor, updateSelectedColor } = useContext(ColorPickerContext);

    const isSelected = useMemo(() => selectedColor === color, [color, selectedColor]);

    const handleClick = () => {
        if (typeof updateSelectedColor === 'function') {
            updateSelectedColor(color);
        }
    };

    return <StyledPresetColor onClick={handleClick} $color={color} $isSelected={isSelected} />;
};

PresetColor.displayName = 'PresetColor';

export default PresetColor;
