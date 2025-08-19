import { setRefreshScrollEnabled } from 'chayns-api';
import React, { ChangeEvent, FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTheme } from 'styled-components';
import { useElementSize } from '../../hooks/element';
import {
    calculateGradientOffset,
    calculatePopupPosition,
    fillSlider,
    getThumbMaxWidth,
} from '../../utils/slider';
import type { Theme } from '../color-scheme-provider/ColorSchemeProvider';
import {
    StyledSlider,
    StyledSliderInput,
    StyledSliderThumb,
    StyledSliderThumbLabel,
} from './Slider.styles';

export interface SliderInterval {
    maxValue: number;
    minValue: number;
}

export type SliderProps = {
    /**
     * The current interval of the slider.
     * @description
     * The `interval` prop is used to define a range for the slider, allowing users to select a minimum and maximum value.
     * This is particularly useful for scenarios where you want to allow users to select a range of values, such as price ranges or date ranges.
     * When provided, the slider will display two thumbs, one for the minimum value and one for the maximum value.
     * @example
     * <Slider interval={{ minValue: 10, maxValue: 50 }} />
     */
    interval?: SliderInterval;
    /**
     * Disables the slider, preventing user interaction.
     * @description
     * The `isDisabled` prop is used to disable the slider, making it unresponsive to user input.
     * When set to `true`, the slider cannot be moved, and its appearance may change to indicate that it is disabled.
     * This is useful for scenarios where the slider should not be interacted with, such as when the data it controls is not available or when the user does not have permission to change the value.
     * @default false
     * @example
     * <Slider isDisabled={true} />
     * @optional
     */
    isDisabled?: boolean;
    /**
     * The maximum value of the slider.
     * @description
     * The `maxValue` prop defines the upper limit of the slider's range. It is used to set the maximum value that can be selected by the user.
     * This value should be greater than or equal to `minValue`.
     * @example
     * <Slider maxValue={200} />
     */
    maxValue: number;
    /**
     * The minimum value of the slider.
     * @description
     * The `minValue` prop defines the lower limit of the slider's range. It is used to set the minimum value that can be selected by the user.
     * This value should be less than or equal to `maxValue`.
     * @example
     * <Slider minValue={0} />
     */
    minValue: number;
    /**
     * Callback function that is called when the slider value changes.
     * @description
     * The `onChange` prop is a callback function that is triggered whenever the slider value changes.
     * It receives the new value or interval of the slider as an argument, allowing you to update your application state or perform other actions based on the new value.
     * If the slider is configured as an interval, it will receive an object with `minValue` and `maxValue`.
     * @example
     * <Slider onChange={(value, interval) => console.log('Slider changed', { value, interval })} />
     */
    onChange?: (value?: number, interval?: SliderInterval) => void;
    /**
     * Callback function that is called when the slider selection is finalized.
     * @description
     * The `onSelect` prop is a callback function that is triggered when the user finishes interacting with the slider, such as releasing the mouse or touch after dragging the thumb.
     * It receives the selected value or interval as arguments, allowing you to perform actions based on the final selection.
     * If the slider is configured as an interval, it will receive an object with `minValue` and `maxValue`.
     * @example
     * <Slider onSelect={(value, interval) => console.log('Slider selected', { value, interval })} />
     */
    onSelect?: (value?: number, interval?: SliderInterval) => void;
    /**
     * Indicates whether the slider should show a label on the thumb.
     * @description
     * The `shouldShowThumbLabel` prop determines whether the slider should display a label on the thumb that shows the current value.
     * When set to `true`, a label will be shown above the thumb, providing users with immediate feedback on the selected value.
     * @default false
     * @example
     * <Slider shouldShowThumbLabel={true} />
     * @optional
     */
    shouldShowThumbLabel?: boolean;
    /**
     * The step size for the slider.
     * @description
     * The `step` prop defines the increment by which the slider value changes when the user interacts with it.
     * It is used to control the granularity of the slider's movement. For example, if `step` is set to 1, the slider will move in increments of 1.
     * @default 1
     * @example
     * <Slider step={5} />
     * @optional
     */
    step?: number;
    /**
     * The step size for the slider.
     * @description
     * The `steps` prop defines the increment by which the slider value changes when the user interacts with it.
     * It is used to control the granularity of the slider's movement. For example, if `step` is set to 1, the slider will move in increments of 1.
     * @default 1
     * @example
     * <Slider steps={5} />
     * @optional
     * @deprecated Use `step` instead. This prop will be removed in future versions.
     */
    steps?: number;
    /**
     * A function to format the thumb label.
     * @description
     * The `thumbLabelFormatter` prop is a function that formats the value displayed on the thumb label.
     * It receives the current value as an argument and should return a string that will be displayed on the thumb label.
     * This is useful for customizing the appearance of the label, such as adding currency symbols or units.
     * @example
     * <Slider thumbLabelFormatter={(value) => `${value} €`} />
     * @optional
     */
    thumbLabelFormatter?: (value: number) => string;
    /**
     * The current value of the slider.
     * @description
     * The `value` prop is used to set the current value of the slider when it is not configured as an interval.
     * It should be a number between `minValue` and `maxValue`. If the slider is configured as an interval, this prop will be ignored.
     * @example
     * <Slider value={50} />
     * @optional
     */
    value?: number;
};

const Slider: FC<SliderProps> = ({
    interval,
    isDisabled,
    maxValue,
    minValue,
    onChange,
    onSelect,
    shouldShowThumbLabel = false,
    step = 1,
    steps = 1,
    thumbLabelFormatter,
    value,
}) => {
    const [fromValue, setFromValue] = useState(0);
    const [toValue, setToValue] = useState(maxValue);
    const [thumbWidth, setThumbWidth] = useState(20);
    const [isBigSlider, setIsBigSlider] = useState(false);

    const fromSliderRef = useRef<HTMLInputElement>(null);
    const toSliderRef = useRef<HTMLInputElement>(null);
    const fromSliderThumbRef = useRef<HTMLDivElement>(null);
    const toSliderThumbRef = useRef<HTMLDivElement>(null);
    const fromSliderThumbContentRef = useRef<HTMLDivElement>(null);
    const toSliderThumbContentRef = useRef<HTMLDivElement>(null);
    const sliderWrapperRef = useRef<HTMLDivElement>(null);

    const sliderWrapperSize = useElementSize(sliderWrapperRef);

    const theme = useTheme() as Theme;

    useEffect(() => {
        if (shouldShowThumbLabel) {
            setThumbWidth(getThumbMaxWidth({ maxNumber: maxValue, thumbLabelFormatter }));
        }
    }, [maxValue, shouldShowThumbLabel, thumbLabelFormatter]);

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
        if (isDisabled) {
            return;
        }

        const from = Number(fromSliderRef.current?.value);
        const to = Number(toSliderRef.current?.value);

        if (typeof onSelect === 'function') {
            onSelect(
                interval ? undefined : from,
                interval ? { maxValue: to, minValue: from } : undefined,
            );
        }
    }, [interval, isDisabled, onSelect]);

    const handleControlFromSlider = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            if (!fromSliderRef.current || !toSliderRef.current) {
                return;
            }

            let newValue = Number(event.target.value);

            if (newValue > maxValue || newValue > maxValue - (maxValue % (step ?? steps))) {
                newValue = maxValue;
            } else if (newValue < minValue) {
                newValue = minValue;
            } else {
                newValue = Math.round(newValue / (step ?? steps)) * (step ?? steps);
            }

            setFromValue(newValue);

            const to = Number(toSliderRef.current.value);

            if (typeof onChange === 'function') {
                onChange(undefined, { maxValue: to, minValue: newValue });
            }

            fillSlider({
                toSlider: toSliderRef.current,
                fromSlider: fromSliderRef.current,
                fromValue: newValue,
                theme,
            });

            if (newValue > to) {
                fromSliderRef.current.value = String(to);
            } else {
                fromSliderRef.current.value = String(newValue);
            }
        },
        [maxValue, minValue, onChange, step, steps, theme],
    );

    const handleControlToSlider = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            if (isDisabled) {
                return;
            }

            if (!fromSliderRef.current || !toSliderRef.current) {
                return;
            }

            let newValue = Number(event.target.value);

            if (newValue > maxValue || newValue > maxValue - (maxValue % (step ?? steps))) {
                newValue = maxValue;
            } else if (newValue < minValue) {
                newValue = minValue;
            } else {
                newValue = Math.round(newValue / (step ?? steps)) * (step ?? steps);
            }

            setToValue(newValue);

            const from = Number(fromSliderRef.current.value);

            if (typeof onChange === 'function') {
                onChange(undefined, { maxValue: newValue, minValue: from });
            }

            fillSlider({
                toSlider: toSliderRef.current,
                fromSlider: fromSliderRef.current,
                toValue: newValue,
                theme,
            });

            if (from <= newValue) {
                toSliderRef.current.value = String(newValue);
            } else {
                toSliderRef.current.value = String(from);
            }
        },
        [isDisabled, maxValue, minValue, onChange, step, steps, theme],
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
            if (isDisabled) {
                return;
            }

            let newValue = Number(event.target.value);

            if (newValue > maxValue || newValue > maxValue - (maxValue % (step ?? steps))) {
                newValue = maxValue;
            } else if (newValue < minValue) {
                newValue = minValue;
            } else {
                newValue = Math.round(newValue / (step ?? steps)) * (step ?? steps);
            }

            if (interval) {
                handleControlFromSlider(event);

                return;
            }

            setFromValue(newValue);

            if (onChange) {
                onChange(newValue);
            }
        },
        [handleControlFromSlider, interval, isDisabled, maxValue, minValue, onChange, step, steps],
    );

    const fromSliderThumbPosition = useMemo(() => {
        if (fromSliderRef.current && fromSliderThumbRef.current && sliderWrapperSize) {
            return calculateGradientOffset({
                max: maxValue,
                min: minValue,
                value: fromValue,
                thumbWidth: 20,
                containerWidth: fromSliderRef.current.offsetWidth,
            });
        }

        return 0;
    }, [fromValue, maxValue, minValue, sliderWrapperSize]);

    const toSliderThumbPosition = useMemo(() => {
        if (toSliderRef.current && toSliderThumbRef.current && sliderWrapperSize) {
            return calculateGradientOffset({
                max: maxValue,
                min: minValue,
                value: toValue,
                thumbWidth: 20,
                containerWidth: toSliderRef.current.offsetWidth,
            });
        }
        return 0;
    }, [toValue, minValue, maxValue, sliderWrapperSize]);

    const toSliderThumbContentPosition = useMemo(
        () =>
            calculatePopupPosition({
                min: minValue,
                max: maxValue,
                sliderValue: toValue,
                popupWidth: thumbWidth,
            }),
        [maxValue, minValue, thumbWidth, toValue],
    );

    const fromSliderThumbContentPosition = useMemo(
        () =>
            calculatePopupPosition({
                min: minValue,
                max: maxValue,
                sliderValue: fromValue,
                popupWidth: thumbWidth,
            }),
        [fromValue, maxValue, minValue, thumbWidth],
    );

    const handleTouchStart = useCallback(() => {
        if (isDisabled) {
            return;
        }

        void setRefreshScrollEnabled(false);

        if (shouldShowThumbLabel) {
            setIsBigSlider(true);
        }
    }, [isDisabled, shouldShowThumbLabel]);

    const handleTouchEnd = useCallback(() => {
        if (isDisabled) {
            return;
        }

        void setRefreshScrollEnabled(true);

        const from = Number(fromSliderRef.current?.value);
        const to = Number(toSliderRef.current?.value);

        if (typeof onSelect === 'function') {
            onSelect(
                interval ? undefined : from,
                interval ? { maxValue: to, minValue: from } : undefined,
            );
        }

        if (shouldShowThumbLabel) {
            setIsBigSlider(false);
        }
    }, [interval, isDisabled, onSelect, shouldShowThumbLabel]);

    return useMemo(
        () => (
            <StyledSlider ref={sliderWrapperRef} $isDisabled={isDisabled}>
                <StyledSliderInput
                    animate={{ height: isBigSlider ? 30 : 10 }}
                    initial={{ height: 10 }}
                    exit={{ height: 10 }}
                    $thumbWidth={40}
                    ref={fromSliderRef}
                    $isInterval={!!interval}
                    type="range"
                    value={fromValue}
                    step={0.01}
                    max={maxValue}
                    min={minValue}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    onChange={handleInputChange}
                    onMouseUp={handleMouseUp}
                    $max={maxValue}
                    $min={minValue}
                    $value={fromValue}
                />
                <StyledSliderThumb
                    ref={fromSliderThumbRef}
                    $position={fromSliderThumbPosition}
                    $isBigSlider={isBigSlider}
                >
                    {shouldShowThumbLabel && (
                        <StyledSliderThumbLabel
                            $width={thumbWidth}
                            $isBigSlider={isBigSlider}
                            $position={fromSliderThumbContentPosition}
                            ref={fromSliderThumbContentRef}
                        >
                            {typeof thumbLabelFormatter === 'function'
                                ? thumbLabelFormatter(fromValue)
                                : fromValue}
                        </StyledSliderThumbLabel>
                    )}
                </StyledSliderThumb>
                {interval && (
                    <StyledSliderThumb
                        ref={toSliderThumbRef}
                        $position={toSliderThumbPosition}
                        $isBigSlider={isBigSlider}
                    >
                        {shouldShowThumbLabel && (
                            <StyledSliderThumbLabel
                                $width={thumbWidth}
                                $isBigSlider={isBigSlider}
                                $position={toSliderThumbContentPosition}
                                ref={toSliderThumbContentRef}
                            >
                                {typeof thumbLabelFormatter === 'function'
                                    ? thumbLabelFormatter(toValue)
                                    : toValue}
                            </StyledSliderThumbLabel>
                        )}
                    </StyledSliderThumb>
                )}
                {interval && (
                    <StyledSliderInput
                        animate={{ height: isBigSlider ? 30 : 10 }}
                        initial={{ height: 10 }}
                        exit={{ height: 10 }}
                        $thumbWidth={40}
                        $max={maxValue}
                        $min={minValue}
                        $value={toValue}
                        ref={toSliderRef}
                        $isInterval={!!interval}
                        type="range"
                        value={toValue}
                        step={0.01}
                        max={maxValue}
                        min={minValue}
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                        onChange={handleControlToSlider}
                        onMouseUp={handleMouseUp}
                    />
                )}
            </StyledSlider>
        ),
        [
            isDisabled,
            isBigSlider,
            interval,
            fromValue,
            maxValue,
            minValue,
            handleTouchStart,
            handleTouchEnd,
            handleInputChange,
            handleMouseUp,
            fromSliderThumbPosition,
            shouldShowThumbLabel,
            thumbWidth,
            fromSliderThumbContentPosition,
            thumbLabelFormatter,
            toSliderThumbPosition,
            toSliderThumbContentPosition,
            toValue,
            handleControlToSlider,
        ],
    );
};

Slider.displayName = 'Slider';

export default Slider;
