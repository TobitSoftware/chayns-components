import React, { CSSProperties, FC, useMemo } from 'react';
import HueSlider from '../../../hue-slider/HueSlider';
import OpacitySlider from '../../../opacity-slider/OpacitySlider';
import {
    StyledColorSettings,
    StyledColorSettingsPreview,
    StyledColorSettingsSliders,
} from './ColorSettings.styles';

export type ColorSettingsProps = {
    onHueColorChange: (color: CSSProperties['color']) => void;
    onOpacityChange: (color: CSSProperties['color']) => void;
    externalColor: CSSProperties['color'];
    selectedColor: CSSProperties['color'];
    internalColor: CSSProperties['color'];
};

const ColorSettings: FC<ColorSettingsProps> = ({
    externalColor,
    selectedColor,
    internalColor,
    onHueColorChange,
    onOpacityChange,
}) =>
    useMemo(
        () => (
            <StyledColorSettings>
                <StyledColorSettingsSliders>
                    <HueSlider onChange={onHueColorChange} color={externalColor} />
                    <OpacitySlider color={selectedColor} onChange={onOpacityChange} />
                </StyledColorSettingsSliders>
                <StyledColorSettingsPreview color={internalColor} />
            </StyledColorSettings>
        ),
        [externalColor, internalColor, onHueColorChange, onOpacityChange, selectedColor]
    );

ColorSettings.displayName = 'ColorSettings';

export default ColorSettings;
