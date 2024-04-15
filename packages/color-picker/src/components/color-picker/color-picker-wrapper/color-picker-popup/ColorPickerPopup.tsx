import React from 'react';
import type { IPresetColor } from '../../../../types';
import ColorPickerPopupProvider from '../../../ColorPickerProvider';
import ColorArea from './color-area/ColorArea';
import { StyledColorPickerPopup } from './ColorPickerPopup.styles';
import MoreOptions from './more-options/MoreOptions';
import PresetColors from './preset-colors/PresetColors';
import Sliders from './sliders/Sliders';

interface ColorPickerPopupProps {
    onSelect?: (color: string) => void;
    selectedColor?: string;
    presetColors?: IPresetColor[];
    shouldShowPresetColors: boolean;
    onPresetColorAdd?: (presetColor: IPresetColor) => void;
    onPresetColorRemove?: (presetColorId: IPresetColor['id']) => void;
    shouldShowTransparencySlider: boolean;
    shouldShowMoreOptions: boolean;
}

const ColorPickerPopup = ({
    selectedColor,
    presetColors,
    onPresetColorRemove,
    onPresetColorAdd,
    shouldShowPresetColors,
    shouldShowTransparencySlider,
    shouldShowMoreOptions,
    onSelect,
}: ColorPickerPopupProps) => (
    <ColorPickerPopupProvider selectedColor={selectedColor} onSelect={onSelect}>
        <StyledColorPickerPopup>
            <ColorArea />
            <Sliders shouldShowTransparencySlider={shouldShowTransparencySlider} />
            {shouldShowPresetColors && (
                <PresetColors
                    presetColors={presetColors}
                    onPresetColorAdd={onPresetColorAdd}
                    onPresetColorRemove={onPresetColorRemove}
                />
            )}
            {shouldShowMoreOptions && <MoreOptions />}
        </StyledColorPickerPopup>
    </ColorPickerPopupProvider>
);

ColorPickerPopup.displayName = 'ColorPickerPopup';

export default ColorPickerPopup;
