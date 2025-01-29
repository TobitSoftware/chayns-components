import React, { ReactNode } from 'react';
import type { IPresetColor } from '../../types/colorPicker';
import ColorPickerProvider from '../ColorPickerProvider';
import ColorPickerWrapper from './color-picker-wrapper/ColorPickerWrapper';
import { StyledColorPicker } from './ColorPicker.styles';

interface ColorPickerProps {
    /**
     * The element that should be rendered to trigger the ColorPicker popup on click.
     */
    children?: ReactNode;
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
     * Colors the user can select from.
     */
    presetColors?: IPresetColor[];
    /**
     * The color that should be preselected.
     */
    selectedColor?: string;
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
    /**
     * Whether presetColors should be got and uploaded to the site storage.
     */
    shouldUseSiteColors?: boolean;
}

const ColorPicker = ({
    children,
    onPresetColorAdd,
    onPresetColorRemove,
    onSelect,
    presetColors,
    selectedColor = 'rgba(0, 94, 184, 1)',
    shouldShowAsPopup = true,
    shouldShowMoreOptions = false,
    shouldShowPresetColors = false,
    shouldShowPreviewColorString = true,
    shouldShowRoundPreviewColor = true,
    shouldShowTransparencySlider = false,
    shouldUseSiteColors = false,
}: ColorPickerProps) => (
    <ColorPickerProvider selectedColor={selectedColor} onSelect={onSelect}>
        <StyledColorPicker>
            <ColorPickerWrapper
                onPresetColorAdd={onPresetColorAdd}
                onPresetColorRemove={onPresetColorRemove}
                presetColors={presetColors}
                shouldShowAsPopup={shouldShowAsPopup}
                shouldShowMoreOptions={shouldShowMoreOptions}
                shouldShowPresetColors={shouldShowPresetColors}
                shouldShowPreviewColorString={shouldShowPreviewColorString}
                shouldShowRoundPreviewColor={shouldShowRoundPreviewColor}
                shouldShowTransparencySlider={shouldShowTransparencySlider}
                shouldUseSiteColors={shouldUseSiteColors}
            >
                {children}
            </ColorPickerWrapper>
        </StyledColorPicker>
    </ColorPickerProvider>
);

ColorPicker.displayName = 'ColorPicker';

export default ColorPicker;
