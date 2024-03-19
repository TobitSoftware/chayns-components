import React, { useMemo, type ReactElement } from 'react';
import { PRESETCOLORS } from '../../../constants/color';
import type { IPresetColor } from '../../../types';
import PresetColor from './preset-color/PresetColor';
import { StyledPresetColors } from './PresetColors.styles';

interface PresetColorsProps {
    presetColors?: IPresetColor[];
}

const PresetColors = ({ presetColors }: PresetColorsProps) => {
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

    return <StyledPresetColors>{content}</StyledPresetColors>;
};

PresetColors.displayName = 'PresetColors';

export default PresetColors;
