import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { IPresetColor } from '../../types';
import ColorArea from './color-area/ColorArea';
import { StyledColorPicker } from './ColorPicker.styles';
import MoreOptions from './more-options/MoreOptions';
import PresetColors from './preset-colors/PresetColors';
import Sliders from './sliders/Sliders';

interface IColorPickerContext {
    selectedColor?: string;
    updateSelectedColor?: (color: string | undefined) => void;
    hueColor?: string;
    updateHueColor?: (color: string | undefined) => void;
}

export const ColorPickerContext = React.createContext<IColorPickerContext>({
    selectedColor: undefined,
    updateSelectedColor: undefined,
    hueColor: undefined,
    updateHueColor: undefined,
});

ColorPickerContext.displayName = 'ColorPickerContext';

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
}: ColorPickerProps) => {
    const [internalSelectedColor, setInternalSelectedColor] = useState<string>();
    const [internalHueColor, setInternalHueColor] = useState<string>();

    const updateSelectedColor = useCallback(
        (color: string | undefined) => {
            setInternalSelectedColor(color);

            if (typeof onSelect === 'function' && color) {
                onSelect(color);
            }
        },
        [onSelect],
    );

    const updateHueColor = useCallback((color: string | undefined) => {
        setInternalHueColor(color);
    }, []);

    useEffect(() => {
        setInternalSelectedColor(selectedColor);
    }, [selectedColor]);

    const providerValue = useMemo<IColorPickerContext>(
        () => ({
            selectedColor: internalSelectedColor,
            updateSelectedColor,
            hueColor: internalHueColor,
            updateHueColor,
        }),
        [internalHueColor, internalSelectedColor, updateHueColor, updateSelectedColor],
    );

    return (
        <StyledColorPicker>
            <ColorPickerContext.Provider value={providerValue}>
                <ColorArea />
                <Sliders />
                <PresetColors
                    presetColors={presetColors}
                    onPresetColorAdd={onPresetColorAdd}
                    onPresetColorRemove={onPresetColorRemove}
                />
                <MoreOptions />
            </ColorPickerContext.Provider>
        </StyledColorPicker>
    );
};

ColorPicker.displayName = 'ColorPicker';

export default ColorPicker;
