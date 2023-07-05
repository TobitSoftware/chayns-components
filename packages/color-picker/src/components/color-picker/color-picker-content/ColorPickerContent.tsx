import React, { CSSProperties, FC, useCallback, useEffect, useMemo, useState } from 'react';
import { splitRgb } from '../../../utils/color';
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
    internalColor: CSSProperties['color'];
};

const ColorPickerContent: FC<ColorPickerContentProps> = ({ color, internalColor, onChange }) => {
    const [hueColor, setHueColor] = useState<CSSProperties['color']>();
    const [selectedColor, setSelectedColor] = useState<CSSProperties['color']>(color);
    const [opacity, setOpacity] = useState<number>(1);

    useEffect(() => {
        if (color) {
            const rgba = splitRgb(color);

            if (rgba && rgba.a) {
                setOpacity(rgba.a);
            }
        }
    }, [color]);

    const handleHueColorChange = useCallback((selectedHueColor: CSSProperties['color']) => {
        setHueColor(selectedHueColor);
    }, []);

    const handleColorChange = useCallback((newColor: CSSProperties['color']) => {
        setSelectedColor(newColor);
    }, []);

    const handleOpacityChange = useCallback((opacityColor: CSSProperties['color']) => {
        const rgba = splitRgb(opacityColor);

        if (rgba && rgba.a) {
            setOpacity(rgba.a);
        }
    }, []);

    useEffect(() => {
        const rgb = splitRgb(selectedColor);

        if (rgb) {
            onChange(`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`);
        }
    }, [onChange, opacity, selectedColor]);

    return useMemo(
        () => (
            <StyledColorPickerContent>
                <ColorArea onChange={handleColorChange} color={internalColor} hueColor={hueColor} />
                <StyledColorPickerContentSliderSelect>
                    <StyledColorPickerContentSliders>
                        <HueSlider onChange={handleHueColorChange} color={color} />
                        <OpacitySlider color={selectedColor} onChange={handleOpacityChange} />
                    </StyledColorPickerContentSliders>
                    <StyledColorPickerColorPreview color={internalColor} />
                </StyledColorPickerContentSliderSelect>
            </StyledColorPickerContent>
        ),
        [
            color,
            handleColorChange,
            handleHueColorChange,
            handleOpacityChange,
            hueColor,
            internalColor,
            selectedColor,
        ]
    );
};

ColorPickerContent.displayName = 'ColorPickerContent';

export default ColorPickerContent;
