import React from 'react';
import type { IPresetColor } from '../../types';
import ColorPickerProvider from '../ColorPickerProvider';
import ColorPickerWrapper from './color-picker-wrapper/ColorPickerWrapper';
import { StyledColorPicker } from './ColorPicker.styles';

interface ColorPickerProps {
    /**
     * Function to be executed when a color is selected.
     */
    onSelect?: (color: string) => void;
    /**
     * The color that should be preselected.
     */
    selectedColor?: string;
    /**
     * Colors the user can select from.
     */
    presetColors?: IPresetColor[];
    /**
     * Whether the preset colors should be displayed.
     */
    shouldShowPresetColors?: boolean;
    /**
     * Function to be executed when a preset color is added.
     */
    onPresetColorAdd?: (presetColor: IPresetColor) => void;
    /**
     * Function to be executed when a preset color is removed.
     */
    onPresetColorRemove?: (presetColorId: IPresetColor['id']) => void;
    /**
     * Whether the transparency slider should be displayed.
     */
    shouldShowTransparencySlider?: boolean;
    /**
     * Whether the more options accordion should be displayed.
     */
    shouldShowMoreOptions?: boolean;
    /**
     * Whether the ColorPicker should be displayed inside a popup.
     */
    shouldShowAsPopup?: boolean;
}

const ColorPicker = ({
    selectedColor = 'rgba(255, 0, 0, 1)',
    presetColors,
    onPresetColorRemove,
    onPresetColorAdd,
    shouldShowPresetColors = false,
    shouldShowAsPopup = true,
    shouldShowTransparencySlider = false,
    shouldShowMoreOptions = false,
    onSelect,
}: ColorPickerProps) => (
    <ColorPickerProvider selectedColor={selectedColor} onSelect={onSelect}>
        <StyledColorPicker>
            <ColorPickerWrapper
                shouldShowTransparencySlider={shouldShowTransparencySlider}
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
