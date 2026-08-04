import React from 'react';
import type { IPresetColor } from '../../types/colorPicker';
import ColorArea from './color-area/ColorArea';
import { StyledColorPickerPopup } from './ColorPickerPopup.styles';
import MoreOptions from './more-options/MoreOptions';
import PresetColors from './preset-colors/PresetColors';
import Sliders from './sliders/Sliders';
import { TextstringProvider } from '@chayns-components/textstring';

interface ColorPickerPopupProps {
    presetColors?: IPresetColor[];
    shouldShowPresetColors: boolean;
    onPresetColorAdd?: (presetColor: IPresetColor) => void;
    onPresetColorRemove?: (presetColorId: IPresetColor['id']) => void;
    shouldShowTransparencySlider: boolean;
    shouldShowMoreOptions: boolean;
    shouldUseSiteColors: boolean;
    shouldHideColorArea: boolean;
    shouldHideDefaultPresetColors: boolean;
    shouldEnableKeyboardHighlighting?: boolean;
}

const ColorPickerPopup = ({
    presetColors,
    onPresetColorRemove,
    onPresetColorAdd,
    shouldShowPresetColors,
    shouldShowTransparencySlider,
    shouldHideDefaultPresetColors,
    shouldUseSiteColors,
    shouldShowMoreOptions,
    shouldHideColorArea,
    shouldEnableKeyboardHighlighting,
}: ColorPickerPopupProps) => (
    <StyledColorPickerPopup>
        {!shouldHideColorArea && (
            <ColorArea shouldEnableKeyboardHighlighting={shouldEnableKeyboardHighlighting} />
        )}
        {!shouldHideColorArea && (
            <Sliders
                shouldEnableKeyboardHighlighting={shouldEnableKeyboardHighlighting}
                shouldShowTransparencySlider={shouldShowTransparencySlider}
            />
        )}
        {shouldShowPresetColors && (
            <PresetColors
                shouldHideDefaultPresetColors={shouldHideDefaultPresetColors}
                presetColors={presetColors}
                shouldUseSiteColors={shouldUseSiteColors}
                onPresetColorAdd={onPresetColorAdd}
                onPresetColorRemove={onPresetColorRemove}
                shouldEnableKeyboardHighlighting={shouldEnableKeyboardHighlighting}
            />
        )}
        {shouldShowMoreOptions && (
            <TextstringProvider libraryName="@chayns-components-color-picker">
                <MoreOptions shouldEnableKeyboardHighlighting={shouldEnableKeyboardHighlighting} />
            </TextstringProvider>
        )}
    </StyledColorPickerPopup>
);

ColorPickerPopup.displayName = 'ColorPickerPopup';

export default ColorPickerPopup;
