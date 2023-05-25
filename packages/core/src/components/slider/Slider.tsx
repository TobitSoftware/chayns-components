import React, { ChangeEvent, FC, useCallback, useEffect, useMemo, useState } from 'react';
import { StyledSlider, StyledSliderInput } from './Slider.styles';

export type SliderProps = {
    /**
     * The maximum value of the slider.
     */
    maxValue: number;
    /**
     * The minimum value of the slider.
     */
    minValue: number;
    /**
     * Function that will be executed when the value is changed.
     */
    onChange?: (value: number) => void;
    /**
     * the Value that the slider should have.
     */
    value?: number;
};

const Slider: FC<SliderProps> = ({ maxValue, minValue, value, onChange }) => {
    const [editedValue, setEditedValue] = useState(0);

    /**
     * This function sets the value
     */
    useEffect(() => {
        if (typeof value !== 'number') {
            return;
        }

        if (value >= minValue && value <= maxValue) {
            setEditedValue(value);
        }
    }, [maxValue, minValue, value]);

    /**
     * This function updates the value
     */
    const handleInputChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setEditedValue(Number(event.target.value));

            if (onChange) {
                onChange(Number(event.target.value));
            }
        },
        [onChange]
    );

    return useMemo(
        () => (
            <StyledSlider>
                <StyledSliderInput
                    type="range"
                    value={editedValue}
                    max={maxValue}
                    min={minValue}
                    onChange={handleInputChange}
                />
            </StyledSlider>
        ),
        [editedValue, handleInputChange, maxValue, minValue]
    );
};

Slider.displayName = 'Slider';

export default Slider;
