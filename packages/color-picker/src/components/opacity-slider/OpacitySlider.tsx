import React, { ChangeEvent, CSSProperties, FC, useCallback, useMemo, useState } from 'react';
import {
    StyledOpacitySlider,
    StyledOpacitySliderBackground,
    StyledOpacitySliderInput,
} from './OpacitySlider.styles';

export type HueSliderProps = {
    /**
     * The color from which the opacity should be changed.
     */
    color: CSSProperties['color'];
    /**
     * Function that will be executed when the color is changed.
     */
    onChange?: (color: CSSProperties['color']) => void;
};

const OpacitySlider: FC<HueSliderProps> = ({ onChange, color }) => {
    const [value, setValue] = useState(0);
    const [hueColor, setHueColor] = useState<CSSProperties['color']>('red');

    /**
     * This function updates the value
     */
    const handleInputChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setValue(Number(event.target.value));

            const percentage = (Number(event.target.value) / 360) * 100;
            const hue = (percentage / 100) * 360;
            const saturation = 100;
            const lightness = 50;

            const hsl = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
            setHueColor(hsl);

            if (typeof onChange === 'function') {
                onChange(hsl);
            }
        },
        [onChange]
    );

    return useMemo(
        () => (
            <StyledOpacitySlider>
                <StyledOpacitySliderBackground>
                    <StyledOpacitySliderInput
                        opacity={value}
                        color={hueColor}
                        type="range"
                        min={0}
                        max={1}
                        step={0.1}
                        value={value}
                        onChange={handleInputChange}
                    />
                </StyledOpacitySliderBackground>
            </StyledOpacitySlider>
        ),
        [value, handleInputChange, hueColor]
    );
};

OpacitySlider.displayName = 'OpacitySlider';

export default OpacitySlider;
