import React, { useContext, useMemo, type ReactElement } from 'react';
import { PRESETCOLORS } from '../../../constants/color';
import type { IPresetColor } from '../../../types';
import { ColorPickerContext } from '../ColorPicker';
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

    const combinedColors = useMemo(
        () => [...PRESETCOLORS, ...(presetColors ?? [])],
        [presetColors],
    );

    const content = useMemo(() => {
        const items: ReactElement[] = [];

        combinedColors.forEach(({ color, id, isCustom }) => {
            items.push(
                <PresetColor
                    key={`preset-color__${id}`}
                    id={id}
                    color={color}
                    isCustom={isCustom}
                />,
            );
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
