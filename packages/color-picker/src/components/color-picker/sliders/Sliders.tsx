import React, { useContext, useMemo, type CSSProperties } from 'react';
import { extractRgbValues } from '../../../utils/color';
import { ColorPickerContext } from '../../ColorPickerProvider';
import HueSlider from '../../hue-slider/HueSlider';
import TransparencySlider from '../../transparency-slider/TransparencySlider';
import ColorPreview from './color-preview/ColorPreview';
import { StyledSliders, StyledSlidersWrapper } from './Sliders.styles';

const Sliders = () => {
    const {
        selectedColor,
        updateHueColor,
        updateSelectedColor,
        updateShouldGetCoordinates,
        updateTmpColor,
        hueColor,
    } = useContext(ColorPickerContext);

    const handleColorChange = (color: CSSProperties['color']) => {
        if (typeof updateTmpColor === 'function' && color) {
            updateTmpColor(color);
        }
    };

    const handleHueColorChange = (color: CSSProperties['color']) => {
        if (typeof updateHueColor === 'function' && color) {
            updateHueColor(color);
        }
    };

    const handleStart = () => {
        if (typeof updateShouldGetCoordinates === 'function') {
            updateShouldGetCoordinates(false);
        }
    };

    const handleEnd = (color: CSSProperties['color']) => {
        if (
            typeof updateShouldGetCoordinates === 'function' &&
            typeof updateSelectedColor === 'function'
        ) {
            updateShouldGetCoordinates(true);
            // updateSelectedColor(color);
        }
    };

    const opacity = useMemo(() => extractRgbValues(selectedColor ?? '').a, [selectedColor]);

    return (
        <StyledSliders>
            <StyledSlidersWrapper>
                <HueSlider
                    color={hueColor}
                    opacity={opacity}
                    onEnd={handleEnd}
                    onStart={handleStart}
                    onChange={handleHueColorChange}
                />
                <TransparencySlider
                    color={selectedColor}
                    onEnd={handleEnd}
                    onStart={handleStart}
                    onChange={handleColorChange}
                />
            </StyledSlidersWrapper>
            <ColorPreview />
        </StyledSliders>
    );
};

Sliders.displayName = 'Sliders';

export default Sliders;
