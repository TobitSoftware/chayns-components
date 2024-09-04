import { isHex } from '@chayns/colors';
import React, { useContext, useMemo, type ReactElement } from 'react';

import { PRESETCOLORS } from '../../../constants/color';
import type { IPresetColor } from '../../../types/colorPicker';
import { hexToRgb } from '../../../utils/color';
import { ColorPickerContext } from '../../ColorPickerProvider';
import PresetButton from './preset-button/PresetButton';
import PresetColor from './preset-color/PresetColor';
import { StyledPresetColors } from './PresetColors.styles';

interface PresetColorsProps {
    presetColors?: IPresetColor[];
    onPresetColorAdd?: (presetColor: IPresetColor) => void;
    onPresetColorRemove?: (presetColorId: IPresetColor['id']) => void;
}

const PresetColors = ({
    presetColors,
    onPresetColorRemove,
    onPresetColorAdd,
}: PresetColorsProps) => {
    const { selectedColor } = useContext(ColorPickerContext);

    const combinedColors = useMemo(() => {
        const tmp = (presetColors ?? []).map(({ color, isCustom, id }) => {
            let newColor = color;

            if (isHex(color)) {
                const { r, g, b, a } = hexToRgb(color);

                newColor = `rgba(${r},${g},${b},${a})`;
            }

            return {
                id,
                isCustom,
                color: newColor,
            };
        });

        return [...PRESETCOLORS, ...tmp];
    }, [presetColors]);

    const content = useMemo(() => {
        const items: ReactElement[] = [];

        combinedColors.forEach(({ color, id }) => {
            items.push(<PresetColor key={`preset-color__${id}`} color={color} />);
        });

        return items;
    }, [combinedColors]);

    const currentPresetColor = useMemo(
        () => combinedColors.find(({ color }) => color === selectedColor),
        [combinedColors, selectedColor],
    );

    return (
        <StyledPresetColors>
            {content}
            <PresetButton
                id={currentPresetColor?.id}
                isCustom={currentPresetColor?.isCustom}
                onAdd={onPresetColorAdd}
                onRemove={onPresetColorRemove}
            />
        </StyledPresetColors>
    );
};

PresetColors.displayName = 'PresetColors';

export default PresetColors;
