import React, { CSSProperties, FC, useMemo, useState } from 'react';
import HueSlider from '../../hue-slider/HueSlider';
import ColorArea from './color-area/ColorArea';
import { StyledColorPickerContent } from './ColorPickerContent.styles';

export type ColorPickerContentProps = {
    onColorChange: (color: CSSProperties['color']) => void;
    color: CSSProperties['color'];
};

const ColorPickerContent: FC<ColorPickerContentProps> = ({ onColorChange, color }) => {
    const [hueColor, setHueColor] = useState<CSSProperties['color']>('red');

    const handleHueColorChange = (selectedHueColor: CSSProperties['color']) => {
        setHueColor(selectedHueColor);
    };

    return useMemo(
        () => (
            <StyledColorPickerContent>
                <ColorArea onChange={onColorChange} color={color} hueColor={hueColor} />
                <HueSlider onChange={handleHueColorChange} />
            </StyledColorPickerContent>
        ),
        [color, hueColor, onColorChange]
    );
};

ColorPickerContent.displayName = 'ColorPickerContent';

export default ColorPickerContent;
