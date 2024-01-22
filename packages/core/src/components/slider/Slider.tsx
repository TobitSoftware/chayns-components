import React, { ChangeEvent, FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyledSlider, StyledSliderInput, StyledSliderThumb } from './Slider.styles';
import { fillSlider } from '../../utils/slider';
import { useTheme } from 'styled-components';

export interface SliderInterval {
    maxValue: number;
    minValue: number;
}

export type SliderProps = {
    /**
     * The range that can be selected with two thumbs..
     */
    interval?: SliderInterval;
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
    onChange?: (value?: number, interval?: SliderInterval) => void;
    /**
     * the Value that the slider should have.
     */
    value?: number;
};

const Slider: FC<SliderProps> = ({ maxValue, minValue, value, onChange, interval }) => {
    const [editedValue, setEditedValue] = useState(0);
    const [fromValue, setFromValue] = useState(minValue);
    const [toValue, setToValue] = useState(maxValue);

    const fromSliderRef = useRef<HTMLInputElement>(null);
    const toSliderRef = useRef<HTMLInputElement>(null);

    const theme = useTheme();

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

    useEffect(() => {
        if (fromValue > toValue) {
            setFromValue(toValue);
        }

        if (toValue < fromValue) {
            setToValue(fromValue);
        }
    }, [fromValue, toValue]);

    const toggleAccessible = useCallback(() => {
        if (toSliderRef.current) {
            if (Number(toSliderRef.current) <= 0) {
                toSliderRef.current.style.zIndex = '2';
            } else {
                toSliderRef.current.style.zIndex = '0';
            }
        }
    }, []);

    const handleControlFromSlider = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            if (!fromSliderRef.current || !toSliderRef.current) {
                return;
            }

            setFromValue(Number(event.target.value));

            const from = Number(fromSliderRef.current.value);
            const to = Number(toSliderRef.current.value);

            if (typeof onChange === 'function') {
                onChange(undefined, { maxValue: to, minValue: from });
            }

            fillSlider({
                toSlider: toSliderRef.current,
                fromSlider: fromSliderRef.current,
                theme,
            });

            if (from > to) {
                fromSliderRef.current.value = String(to);
            } else {
                fromSliderRef.current.value = String(from);
            }
        },
        [onChange, theme]
    );

    const handleControlToSlider = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            if (!fromSliderRef.current || !toSliderRef.current) {
                return;
            }

            setToValue(Number(event.target.value));

            const from = Number(fromSliderRef.current.value);
            const to = Number(toSliderRef.current.value);

            if (typeof onChange === 'function') {
                onChange(undefined, { maxValue: to, minValue: from });
            }

            fillSlider({
                toSlider: toSliderRef.current,
                fromSlider: fromSliderRef.current,
                theme,
            });

            toggleAccessible();
            if (from <= to) {
                toSliderRef.current.value = String(to);
            } else {
                toSliderRef.current.value = String(from);
            }
        },
        [onChange, theme, toggleAccessible]
    );

    useEffect(() => {
        if (!fromSliderRef.current || !toSliderRef.current || !interval) {
            return;
        }

        setFromValue(interval.minValue);
        setToValue(interval.maxValue);

        fromSliderRef.current.value = String(interval.minValue);
        toSliderRef.current.value = String(interval.maxValue);

        fillSlider({
            fromSlider: fromSliderRef.current,
            toSlider: toSliderRef.current,
            theme,
        });

        toggleAccessible();
        // Note: interval can´t be in the deps because of rerender
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toggleAccessible, theme]);

    /**
     * This function updates the value
     */
    const handleInputChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const newValue = Number(event.target.value);

            if (interval) {
                handleControlFromSlider(event);

                return;
            }

            setEditedValue(newValue);

            if (onChange) {
                onChange(newValue);
            }
        },
        [handleControlFromSlider, interval, onChange]
    );

    const fromSliderThumbPosition = useMemo(() => {
        if (fromSliderRef.current) {
            return (
                ((fromValue - minValue) / (maxValue - minValue)) *
                (fromSliderRef.current.offsetWidth - 20)
            );
        }
        return 0;
    }, [fromValue, maxValue, minValue]);

    const toSliderThumbPosition = useMemo(() => {
        if (toSliderRef.current) {
            return (
                ((toValue - minValue) / (maxValue - minValue)) *
                (toSliderRef.current.offsetWidth - 20)
            );
        }
        return 0;
    }, [toValue, maxValue, minValue]);

    return useMemo(
        () => (
            <StyledSlider>
                <StyledSliderInput
                    ref={fromSliderRef}
                    isInterval={!!interval}
                    type="range"
                    value={interval ? fromValue : editedValue}
                    max={maxValue}
                    min={minValue}
                    onChange={handleInputChange}
                />
                <StyledSliderThumb position={fromSliderThumbPosition} />
                <StyledSliderThumb position={toSliderThumbPosition} />
                {interval && (
                    <>
                        <StyledSliderInput
                            ref={toSliderRef}
                            isInterval={!!interval}
                            type="range"
                            value={toValue}
                            max={maxValue}
                            min={minValue}
                            onChange={handleControlToSlider}
                        />
                        <StyledSliderThumb position={toSliderThumbPosition} />
                    </>
                )}
            </StyledSlider>
        ),
        [
            editedValue,
            fromSliderThumbPosition,
            fromValue,
            handleControlToSlider,
            handleInputChange,
            interval,
            maxValue,
            minValue,
            toSliderThumbPosition,
            toValue,
        ]
    );
};

Slider.displayName = 'Slider';

export default Slider;
