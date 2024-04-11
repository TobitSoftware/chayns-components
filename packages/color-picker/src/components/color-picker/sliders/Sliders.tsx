import React, { useContext, type CSSProperties } from 'react';
import { extractRgbValues } from '../../../utils/color';
import HueSlider from '../../hue-slider/HueSlider';
import TransparencySlider from '../../transparency-slider/TransparencySlider';
import { ColorPickerContext } from '../ColorPicker';
import ColorPreview from './color-preview/ColorPreview';
import { StyledSliders, StyledSlidersWrapper } from './Sliders.styles';

const Sliders = () => {
    const { selectedColor, updateSelectedColor, updateHueColor } = useContext(ColorPickerContext);

    const handleColorChange = (color: CSSProperties['color']) => {
        if (typeof updateSelectedColor === 'function' && color) {
            updateSelectedColor(color);
        }
    };

    const handleHueColorChange = (color: CSSProperties['color']) => {
        handleColorChange(color);

        if (typeof updateHueColor === 'function' && color) {
            const { r, g, b } = extractRgbValues(color);

            updateHueColor(`rgba(${r},${g},${b}, 1)`);
        }
    };

    return (
        <StyledSliders>
            <StyledSlidersWrapper>
                <HueSlider color={selectedColor} onChange={handleHueColorChange} />
                <TransparencySlider color={selectedColor} onChange={handleColorChange} />
            </StyledSlidersWrapper>
            <ColorPreview />
        </StyledSliders>
    );
};

Sliders.displayName = 'Sliders';

export default Sliders;
