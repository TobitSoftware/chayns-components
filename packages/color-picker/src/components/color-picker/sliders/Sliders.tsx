import React, { useContext, useMemo, type CSSProperties } from 'react';
import { extractRgbValues } from '../../../utils/color';
import HueSlider from '../../hue-slider/HueSlider';
import TransparencySlider from '../../transparency-slider/TransparencySlider';
import { ColorPickerContext } from '../ColorPicker';
import ColorPreview from './color-preview/ColorPreview';
import { StyledSliders, StyledSlidersWrapper } from './Sliders.styles';

const Sliders = () => {
    const { selectedColor, updateSelectedColor, updateHueColor, hueColor } =
        useContext(ColorPickerContext);

    const handleColorChange = (color: CSSProperties['color']) => {
        if (typeof updateSelectedColor === 'function' && color) {
            updateSelectedColor(color);
        }
    };

    const handleHueColorChange = (color: CSSProperties['color']) => {
        handleColorChange(color);

        if (typeof updateHueColor === 'function' && color) {
            updateHueColor(color);
        }
    };

    const opacity = useMemo(() => extractRgbValues(selectedColor ?? '').a, [selectedColor]);

    return (
        <StyledSliders>
            <StyledSlidersWrapper>
                <HueSlider color={hueColor} opacity={opacity} onChange={handleHueColorChange} />
                <TransparencySlider color={selectedColor} onChange={handleColorChange} />
            </StyledSlidersWrapper>
            <ColorPreview />
        </StyledSliders>
    );
};

Sliders.displayName = 'Sliders';

export default Sliders;
