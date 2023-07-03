import React, { CSSProperties, FC, useCallback, useMemo, useState } from 'react';
import HueSlider from '../../hue-slider/HueSlider';
import OpacitySlider from '../../opacity-slider/OpacitySlider';
import ColorArea from './color-area/ColorArea';
import {
    StyledColorPickerColorPreview,
    StyledColorPickerContent,
    StyledColorPickerContentSliders,
    StyledColorPickerContentSliderSelect,
} from './ColorPickerContent.styles';

export type ColorPickerContentProps = {
    onColorChange: (color: CSSProperties['color']) => void;
    color: CSSProperties['color'];
};

const ColorPickerContent: FC<ColorPickerContentProps> = ({ onColorChange, color }) => {
    const [hueColor, setHueColor] = useState<CSSProperties['color']>('red');

    const handleHueColorChange = (selectedHueColor: CSSProperties['color']) => {
        setHueColor(selectedHueColor);
    };

    const handleColorChange = useCallback(() => {}, []);

    return useMemo(
        () => (
            <StyledColorPickerContent>
                <ColorArea onChange={onColorChange} color={color} hueColor={hueColor} />
                <StyledColorPickerContentSliderSelect>
                    <StyledColorPickerContentSliders>
                        <HueSlider onChange={handleHueColorChange} />
                        <OpacitySlider color={hueColor} />
                    </StyledColorPickerContentSliders>
                    <StyledColorPickerColorPreview color={color} />
                </StyledColorPickerContentSliderSelect>
            </StyledColorPickerContent>
        ),
        [color, handleColorChange, hueColor]
    );
};

ColorPickerContent.displayName = 'ColorPickerContent';

export default ColorPickerContent;
