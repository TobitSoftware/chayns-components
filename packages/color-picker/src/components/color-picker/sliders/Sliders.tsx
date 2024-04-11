import React, { useContext, type CSSProperties } from 'react';
import HueSlider from '../../hue-slider/HueSlider';
import TransparencySlider from '../../transparency-slider/TransparencySlider';
import { ColorPickerContext } from '../ColorPicker';
import ColorPreview from './color-preview/ColorPreview';
import { StyledSliders, StyledSlidersWrapper } from './Sliders.styles';

const Sliders = () => {
    const { selectedColor, updateSelectedColor } = useContext(ColorPickerContext);

    const handleColorChange = (color: CSSProperties['color']) => {
        if (typeof updateSelectedColor === 'function' && color) {
            updateSelectedColor(color);
        }
    };

    return (
        <StyledSliders>
            <StyledSlidersWrapper>
                <HueSlider color={selectedColor} onChange={handleColorChange} />
                <TransparencySlider color={selectedColor} onChange={handleColorChange} />
            </StyledSlidersWrapper>
            <ColorPreview />
        </StyledSliders>
    );
};

Sliders.displayName = 'Sliders';

export default Sliders;
