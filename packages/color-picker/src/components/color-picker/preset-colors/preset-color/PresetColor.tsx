import React, { useContext, useMemo } from 'react';
import type { IPresetColor } from '../../../../types';
import { ColorPickerContext } from '../../../ColorPickerProvider';
import { StyledPresetColor } from './PresetColor.styles';

interface PresetColorProps {
    color: IPresetColor['color'];
}

const PresetColor = ({ color }: PresetColorProps) => {
    const { selectedColor, updateSelectedColor, updateHueColor, updateIsPresetColor } =
        useContext(ColorPickerContext);

    const isSelected = useMemo(() => selectedColor === color, [color, selectedColor]);

    const handleClick = () => {
        if (typeof updateSelectedColor === 'function') {
            updateSelectedColor(color);
        }

        if (typeof updateHueColor === 'function') {
            updateHueColor(color);
        }

        if (typeof updateIsPresetColor === 'function') {
            updateIsPresetColor(true);
        }
    };

    return <StyledPresetColor onClick={handleClick} $color={color} $isSelected={isSelected} />;
};

PresetColor.displayName = 'PresetColor';

export default PresetColor;
