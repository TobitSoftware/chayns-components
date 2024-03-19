import React, { useMemo } from 'react';
import type { IPresetColor } from '../../../../types';
import { StyledPresetColor } from './PresetColor.styles';

interface PresetColorProps {
    id: IPresetColor['id'];
    color: IPresetColor['color'];
    isCustom: IPresetColor['isCustom'];
}

const PresetColor = ({ id, color, isCustom }: PresetColorProps) => {
    const isSelected = useMemo(() => false, []);

    return <StyledPresetColor $color={color} $isSelected={isSelected} />;
};

PresetColor.displayName = 'PresetColor';

export default PresetColor;
