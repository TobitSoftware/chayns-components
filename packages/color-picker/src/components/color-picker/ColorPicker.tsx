import React from 'react';
import type { IPresetColor } from '../../types/colorPicker';
import ColorPickerProvider from '../ColorPickerProvider';
import ColorPickerWrapper from './color-picker-wrapper/ColorPickerWrapper';
import { StyledColorPicker } from './ColorPicker.styles';

interface ColorPickerProps {
    /**
     * Colors the user can select from.
     */
    presetColors?: IPresetColor[];
    /**
     * Function to be executed when a preset color is added.
     */
    onPresetColorAdd?: (presetColor: IPresetColor) => void;
    /**
     * Function to be executed when a preset color is removed.
     */
    onPresetColorRemove?: (presetColorId: IPresetColor['id']) => void;
    /**
     * Function to be executed when a color is selected.
     */
    onSelect?: (color: string) => void;
    /**
     * The color that should be preselected.
     */
    selectedColor?: string;
    /**
     * Whether presetColors should be get and uploaded to the site storage.
     */
    shouldUseSiteColors?: boolean;
    /**
     * Whether the ColorPicker should be displayed inside a popup.
     */
    shouldShowAsPopup?: boolean;
    /**
     * Whether the more options accordion should be displayed.
     */
    shouldShowMoreOptions?: boolean;
    /**
     * Whether the preset colors should be displayed.
     */
    shouldShowPresetColors?: boolean;
    /**
     * Whether the preview color should be displayed as text.
     */
    shouldShowPreviewColorString?: boolean;
    /**
     * Whether the preview color should be displayed round.
     */
    shouldShowRoundPreviewColor?: boolean;
    /**
     * Whether the transparency slider should be displayed.
     */
    shouldShowTransparencySlider?: boolean;
}

const ColorPicker = ({
    selectedColor = 'rgba(255, 0, 0, 1)',
    presetColors,
    onPresetColorRemove,
    onPresetColorAdd,
    shouldShowPresetColors = false,
    shouldShowAsPopup = true,
    shouldUseSiteColors = false,
    shouldShowTransparencySlider = false,
    shouldShowMoreOptions = false,
    shouldShowRoundPreviewColor = true,
    shouldShowPreviewColorString = true,
    onSelect,
}: ColorPickerProps) => (
    <ColorPickerProvider selectedColor={selectedColor} onSelect={onSelect}>
        <StyledColorPicker>
            <ColorPickerWrapper
                shouldShowPreviewColorString={shouldShowPreviewColorString}
                shouldShowRoundPreviewColor={shouldShowRoundPreviewColor}
                shouldShowTransparencySlider={shouldShowTransparencySlider}
                shouldUseSiteColors={shouldUseSiteColors}
                presetColors={presetColors}
                onPresetColorAdd={onPresetColorAdd}
                onPresetColorRemove={onPresetColorRemove}
                shouldShowAsPopup={shouldShowAsPopup}
                shouldShowMoreOptions={shouldShowMoreOptions}
                shouldShowPresetColors={shouldShowPresetColors}
            />
        </StyledColorPicker>
    </ColorPickerProvider>
);

ColorPicker.displayName = 'ColorPicker';

export default ColorPicker;
