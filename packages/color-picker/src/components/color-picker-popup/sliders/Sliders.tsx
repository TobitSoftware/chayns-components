import React, { useContext, useMemo, type CSSProperties } from 'react';
import { extractRgbValues } from '../../../utils/color';
import { ColorPickerContext } from '../../ColorPickerProvider';
import HueSlider from '../../hue-slider/HueSlider';
import TransparencySlider from '../../transparency-slider/TransparencySlider';
import ColorPreview from './color-preview/ColorPreview';
import { StyledSliders, StyledSlidersWrapper } from './Sliders.styles';

interface SlidersProps {
    shouldShowTransparencySlider: boolean;
}

const Sliders = ({ shouldShowTransparencySlider }: SlidersProps) => {
    const {
        selectedColor,
        updateSelectedColor,
        updateHueColor,
        updateShouldGetCoordinates,
        updateShouldCallOnSelect,
        updateCanGetColorFromArea,
        hueColor,
    } = useContext(ColorPickerContext);

    const handleColorChange = (color: CSSProperties['color']) => {
        if (typeof updateSelectedColor === 'function' && color) {
            updateSelectedColor(color);
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

    const handleHueStart = () => {
        handleStart();

        if (typeof updateCanGetColorFromArea === 'function') {
            updateCanGetColorFromArea(true);
        }
    };

    const handleEnd = () => {
        if (
            typeof updateShouldGetCoordinates === 'function' &&
            typeof updateShouldCallOnSelect === 'function'
        ) {
            updateShouldGetCoordinates(true);
            updateShouldCallOnSelect(true);
        }

        if (typeof updateCanGetColorFromArea === 'function') {
            updateCanGetColorFromArea(false);
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
                    onStart={handleHueStart}
                    onChange={handleHueColorChange}
                />
                {shouldShowTransparencySlider && (
                    <TransparencySlider
                        color={selectedColor}
                        onEnd={handleEnd}
                        onStart={handleStart}
                        onChange={handleColorChange}
                    />
                )}
            </StyledSlidersWrapper>
            <ColorPreview />
        </StyledSliders>
    );
};

Sliders.displayName = 'Sliders';

export default Sliders;
