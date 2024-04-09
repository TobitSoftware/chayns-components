import React, { useContext, useMemo, type CSSProperties } from 'react';
import { extractRgbValues, hexToRgb, rgbToHex } from '../../../utils/color';
import HueSlider from '../../hue-slider/HueSlider';
import { ColorPickerContext } from '../ColorPicker';
import ColorPreview from './color-preview/ColorPreview';
import { StyledSliders, StyledSlidersWrapper } from './Sliders.styles';

const Sliders = () => {
    const { selectedColor, updateSelectedColor } = useContext(ColorPickerContext);

    const rgbColor = useMemo(() => {
        const { r, b, g, a } = hexToRgb(selectedColor ?? '');

        return `rgba(${r},${g},${b},${a})`;
    }, [selectedColor]);

    const handleColorChange = (color: CSSProperties['color']) => {
        if (typeof updateSelectedColor === 'function' && color) {
            const rgb = extractRgbValues(color);

            const hex = rgbToHex(rgb);

            if (!hex) {
                return;
            }

            updateSelectedColor(hex);
        }
    };

    return (
        <StyledSliders>
            <StyledSlidersWrapper>
                <HueSlider color={rgbColor} onChange={handleColorChange} />
                SLider
            </StyledSlidersWrapper>
            <ColorPreview />
        </StyledSliders>
    );
};

Sliders.displayName = 'Sliders';

export default Sliders;
