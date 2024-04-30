import React, { useContext, useMemo } from 'react';
import type { IPresetColor } from '../../../../../../types/colorPicker';
import { ColorPickerContext } from '../../../../../ColorPickerProvider';
import {
    StyledPresetColor,
    StyledPresetColorBackground,
    StyledPresetColorColor,
} from './PresetColor.styles';

interface PresetColorProps {
    color: IPresetColor['color'];
}

const PresetColor = ({ color }: PresetColorProps) => {
    const {
        selectedColor,
        updateSelectedColor,
        updateHueColor,
        updateShouldCallOnSelect,
        updateShouldGetCoordinates,
        updateIsPresetColor,
    } = useContext(ColorPickerContext);

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

        if (typeof updateShouldCallOnSelect === 'function') {
            updateShouldCallOnSelect(true);
        }

        if (typeof updateShouldGetCoordinates === 'function') {
            updateShouldGetCoordinates(true);
        }
    };

    return (
        <StyledPresetColor onClick={handleClick} $isSelected={isSelected}>
            <StyledPresetColorBackground />
            <StyledPresetColorColor $color={color} />
        </StyledPresetColor>
    );
};

PresetColor.displayName = 'PresetColor';

export default PresetColor;