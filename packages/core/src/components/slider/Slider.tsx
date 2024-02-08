import React, { ChangeEvent, FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
    StyledSlider,
    StyledSliderInput,
    StyledSliderThumb,
    StyledSliderThumbLable,
} from './Slider.styles';
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
     *
     */
    onSelect?: (value?: number, interval?: SliderInterval) => void;
    /**
     * Function that will be executed when the value is changed.
     */
    onChange?: (value?: number, interval?: SliderInterval) => void;
    /**
     * Whether the current value should be displayed inside the slider thumb.
     */
    shouldShowThumbLable?: boolean;
    /**
     * The steps of the slider.
     */
    steps?: number;
    /**
     * A function to format the thumb label.
     */
    thumbLabelFormatter?: (value: number) => string;
    /**
     * the Value that the slider should have.
     */
    value?: number;
};

const Slider: FC<SliderProps> = ({
    maxValue,
    minValue,
    value,
    onSelect,
    onChange,
    interval,
    thumbLabelFormatter,
    shouldShowThumbLable = false,
    steps = 1,
}) => {
    const [fromValue, setFromValue] = useState(0);
    const [toValue, setToValue] = useState(maxValue);

    const fromSliderRef = useRef<HTMLInputElement>(null);
    const toSliderRef = useRef<HTMLInputElement>(null);
    const fromSliderThumbRef = useRef<HTMLDivElement>(null);
    const toSliderThumbRef = useRef<HTMLDivElement>(null);

    const theme = useTheme();

    /**
     * This function sets the value
     */
    useEffect(() => {
        if (typeof value !== 'number') {
            return;
        }

        if (value >= minValue && value <= maxValue) {
            setFromValue(value);
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

    const handleMouseUp = useCallback(() => {
        const from = Number(fromSliderRef.current?.value);
        const to = Number(toSliderRef.current?.value);

        if (typeof onSelect === 'function') {
            onSelect(
                interval ? undefined : from,
                interval ? { maxValue: to, minValue: from } : undefined,
            );
        }
    }, [interval, onSelect]);

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
        [onChange, theme],
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

            if (from <= to) {
                toSliderRef.current.value = String(to);
            } else {
                toSliderRef.current.value = String(from);
            }
        },
        [onChange, theme],
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
        // Note: interval can´t be in the deps because of rerender
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [theme]);

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

            setFromValue(newValue);

            if (onChange) {
                onChange(newValue);
            }
        },
        [handleControlFromSlider, interval, onChange],
    );

    const fromSliderThumbPosition = useMemo(() => {
        if (fromSliderRef.current && fromSliderThumbRef.current) {
            return (
                ((fromValue - minValue) / (maxValue - minValue)) *
                (fromSliderRef.current.offsetWidth - fromSliderThumbRef.current.offsetWidth / 2)
            );
        }
        return 0;
    }, [fromValue, maxValue, minValue]);

    const toSliderThumbPosition = useMemo(() => {
        if (toSliderRef.current && toSliderThumbRef.current) {
            return (
                ((toValue - minValue) / (maxValue - minValue)) *
                (toSliderRef.current.offsetWidth - toSliderThumbRef.current.offsetWidth / 2)
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
                    value={fromValue}
                    step={steps}
                    max={maxValue}
                    min={minValue}
                    onChange={handleInputChange}
                    onMouseUp={handleMouseUp}
                />
                <StyledSliderThumb ref={fromSliderThumbRef} position={fromSliderThumbPosition}>
                    {shouldShowThumbLable && (
                        <StyledSliderThumbLable>
                            {typeof thumbLabelFormatter === 'function'
                                ? thumbLabelFormatter(fromValue)
                                : fromValue}
                        </StyledSliderThumbLable>
                    )}
                </StyledSliderThumb>
                {interval && (
                    <StyledSliderThumb ref={toSliderThumbRef} position={toSliderThumbPosition}>
                        {shouldShowThumbLable && (
                            <StyledSliderThumbLable>
                                {typeof thumbLabelFormatter === 'function'
                                    ? thumbLabelFormatter(toValue)
                                    : toValue}
                            </StyledSliderThumbLable>
                        )}
                    </StyledSliderThumb>
                )}
                {interval && (
                    <StyledSliderInput
                        ref={toSliderRef}
                        isInterval={!!interval}
                        type="range"
                        value={toValue}
                        step={steps}
                        max={maxValue}
                        min={minValue}
                        onChange={handleControlToSlider}
                        onMouseUp={handleMouseUp}
                    />
                )}
            </StyledSlider>
        ),
        [
            interval,
            fromValue,
            steps,
            maxValue,
            minValue,
            handleInputChange,
            handleMouseUp,
            fromSliderThumbPosition,
            shouldShowThumbLable,
            thumbLabelFormatter,
            toSliderThumbPosition,
            toValue,
            handleControlToSlider,
        ],
    );
};

Slider.displayName = 'Slider';

export default Slider;
