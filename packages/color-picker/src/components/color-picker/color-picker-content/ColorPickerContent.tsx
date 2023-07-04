import React, { CSSProperties, FC, useMemo } from 'react';
import { HueSlider } from '../../index';
import OpacitySlider from '../../opacity-slider/OpacitySlider';
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
    const test = '';

    return useMemo(
        () => (
            <StyledColorPickerContent>
                {/* <ColorArea */}
                {/*    */}
                {/* /> */}
                <StyledColorPickerContentSliderSelect>
                    <StyledColorPickerContentSliders>
                        <HueSlider onChange={onChange} color={color} />
                        <OpacitySlider color={color} onChange={onChange} />
                    </StyledColorPickerContentSliders>
                    <StyledColorPickerColorPreview color={color} />
                </StyledColorPickerContentSliderSelect>
            </StyledColorPickerContent>
        ),
        [color, onChange]
    );
};

ColorPickerContent.displayName = 'ColorPickerContent';

export default ColorPickerContent;
