import React, { ChangeEvent, CSSProperties, FC, useCallback, useMemo, useState } from 'react';
import { StyledHueSlider, StyledHueSliderInput } from './HueSlider.styles';

export type HueSliderProps = {
    /**
     * Function that will be executed when the color is changed.
     */
    onChange?: (color: CSSProperties['color']) => void;
};

const HueSlider: FC<HueSliderProps> = ({ onChange }) => {
    const [editedValue, setEditedValue] = useState(0);
    const [hueColor, setHueColor] = useState<CSSProperties['color']>('red');

    /**
     * This function updates the value
     */
    const handleInputChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setEditedValue(Number(event.target.value));

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
            <StyledHueSlider>
                <StyledHueSliderInput
                    color={hueColor}
                    type="range"
                    min={0}
                    max={360}
                    value={editedValue}
                    onChange={handleInputChange}
                />
            </StyledHueSlider>
        ),
        [editedValue, handleInputChange, hueColor]
    );
};

HueSlider.displayName = 'HueSlider';

export default HueSlider;
