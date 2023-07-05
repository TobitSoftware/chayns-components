import React, { CSSProperties, FC, useMemo, useState } from 'react';
import { HueSlider } from '../../index';
import OpacitySlider from '../../opacity-slider/OpacitySlider';
import ColorArea from './color-area/ColorArea';
import {
    StyledColorPickerColorPreview,
    StyledColorPickerContent,
    StyledColorPickerContentSliders,
    StyledColorPickerContentSliderSelect,
} from './ColorPickerContent.styles';

export type ColorPickerContentProps = {
    onChange: (color: CSSProperties['color']) => void;
    color: CSSProperties['color'];
};

const ColorPickerContent: FC<ColorPickerContentProps> = ({ color, onChange }) => {
    const [hueColor, setHueColor] = useState<CSSProperties['color']>();
    const [selectedColor, setSelectedColor] = useState<CSSProperties['color']>();

    const handleHueColorChange = (selectedHueColor: CSSProperties['color']) => {
        setHueColor(selectedHueColor);
    };

    const handleColorChange = (newColor: CSSProperties['color']) => {
        setSelectedColor(newColor);
    };

    return useMemo(
        () => (
            <StyledColorPickerContent>
                <ColorArea onChange={handleColorChange} color={color} hueColor={hueColor} />
                <StyledColorPickerContentSliderSelect>
                    <StyledColorPickerContentSliders>
                        <HueSlider onChange={handleHueColorChange} color={color} />
                        <OpacitySlider color={selectedColor} onChange={onChange} />
                    </StyledColorPickerContentSliders>
                    <StyledColorPickerColorPreview color={color} />
                </StyledColorPickerContentSliderSelect>
            </StyledColorPickerContent>
        ),
        [color, hueColor, onChange, selectedColor]
    );
};

ColorPickerContent.displayName = 'ColorPickerContent';

export default ColorPickerContent;
