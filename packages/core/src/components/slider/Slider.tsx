import { setRefreshScrollEnabled } from 'chayns-api';
import React, { ChangeEvent, FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTheme } from 'styled-components';
import { useElementSize } from '../../hooks/useElementSize';
import {
    calculateGradientOffset,
    calculatePopupPosition,
    fillSlider,
    getThumbMaxWidth,
} from '../../utils/slider';
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
     * Function that will be executed when the value is selected.
     */
    onSelect?: (value?: number, interval?: SliderInterval) => void;
    /**
     * Function that will be executed when the value is changed.
     */
    onChange?: (value?: number, interval?: SliderInterval) => void;
    /**
     * Whether the current value should be displayed inside the slider thumb.
     */
    shouldShowThumbLabel?: boolean;
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
    shouldShowThumbLabel = false,
    steps = 1,
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

    const theme = useTheme();

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
        void setRefreshScrollEnabled(true);

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

            let newValue = Number(event.target.value);

            if (newValue > maxValue || newValue > maxValue - (maxValue % steps)) {
                newValue = maxValue;
            } else if (newValue < minValue) {
                newValue = minValue;
            } else {
                newValue = Math.round(newValue / steps) * steps;
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
        [maxValue, minValue, onChange, steps, theme],
    );

    const handleControlToSlider = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            void setRefreshScrollEnabled(false);

            if (!fromSliderRef.current || !toSliderRef.current) {
                return;
            }

            let newValue = Number(event.target.value);

            if (newValue > maxValue || newValue > maxValue - (maxValue % steps)) {
                newValue = maxValue;
            } else if (newValue < minValue) {
                newValue = minValue;
            } else {
                newValue = Math.round(newValue / steps) * steps;
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
        [maxValue, minValue, onChange, steps, theme],
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
            void setRefreshScrollEnabled(false);

            let newValue = Number(event.target.value);

            if (newValue > maxValue || newValue > maxValue - (maxValue % steps)) {
                newValue = maxValue;
            } else if (newValue < minValue) {
                newValue = minValue;
            } else {
                newValue = Math.round(newValue / steps) * steps;
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
        [handleControlFromSlider, interval, maxValue, minValue, onChange, steps],
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
        if (shouldShowThumbLabel) {
            setIsBigSlider(true);
        }
    }, [shouldShowThumbLabel]);

    const handleTouchEnd = useCallback(() => {
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
    }, [interval, onSelect, shouldShowThumbLabel]);

    return useMemo(
        () => (
            <StyledSlider ref={sliderWrapperRef}>
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
