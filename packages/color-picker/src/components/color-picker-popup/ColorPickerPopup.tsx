import React from 'react';
import type { IPresetColor } from '../../types/colorPicker';
import ColorArea from './color-area/ColorArea';
import { StyledColorPickerPopup } from './ColorPickerPopup.styles';
import MoreOptions from './more-options/MoreOptions';
import PresetColors from './preset-colors/PresetColors';
import Sliders from './sliders/Sliders';

interface ColorPickerPopupProps {
    presetColors?: IPresetColor[];
    shouldShowPresetColors: boolean;
    onPresetColorAdd?: (presetColor: IPresetColor) => void;
    onPresetColorRemove?: (presetColorId: IPresetColor['id']) => void;
    shouldShowTransparencySlider: boolean;
    shouldShowMoreOptions: boolean;
    shouldUseSiteColors: boolean;
}

const ColorPickerPopup = ({
    presetColors,
    onPresetColorRemove,
    onPresetColorAdd,
    shouldShowPresetColors,
    shouldShowTransparencySlider,
    shouldUseSiteColors,
    shouldShowMoreOptions,
}: ColorPickerPopupProps) => (
    <StyledColorPickerPopup>
        <ColorArea />
        <Sliders shouldShowTransparencySlider={shouldShowTransparencySlider} />
        {shouldShowPresetColors && (
            <PresetColors
                presetColors={presetColors}
                shouldUseSiteColors={shouldUseSiteColors}
                onPresetColorAdd={onPresetColorAdd}
                onPresetColorRemove={onPresetColorRemove}
            />
        )}
        {shouldShowMoreOptions && <MoreOptions />}
    </StyledColorPickerPopup>
);

ColorPickerPopup.displayName = 'ColorPickerPopup';

export default ColorPickerPopup;
