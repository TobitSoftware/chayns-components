import { setRefreshScrollEnabled } from 'chayns-api';
import React, { ChangeEvent, useCallback, useMemo, useRef, useState, useLayoutEffect } from 'react';
import { hexToRgb, isValidRGBA, splitRgb } from '../../utils/color';
import {
    StyledTransparencySlider,
    StyledTransparencySliderBackground,
    StyledTransparencySliderInput,
    StyledTransparencySliderThumb,
    StyledTransparencySliderThumbBackground,
    StyledTransparencySliderThumbWrapper,
} from './TransparencySlider.styles';

interface TransparencySliderProps {
    /**
     * The color that should be selected.
     */
    color?: string;
    /**
     * Function that will be executed when the opacity is changed.
     */
    onChange?: (color: string) => void;
    /**
     * Function that will be executed when the opacity is ending to change.
     */
    onEnd?: (color: string) => void;
    /**
     * Function that will be executed when the opacity is starting to change.
     */
    onStart?: (color: string) => void;
}

const TransparencySlider = ({
    onChange,
    onStart,
    onEnd,
    color = 'rgba(255, 0, 0, 1)',
}: TransparencySliderProps) => {
    const rgb = useMemo(() => {
        if (!color) return undefined;
        return isValidRGBA(color) ? splitRgb(color) : hexToRgb(color);
    }, [color]);

    const derivedPreviewColor = useMemo(() => {
        if (!rgb) return undefined;
        const { r, g, b, a } = rgb;
        return `rgba(${r}, ${g}, ${b}, ${a})`;
    }, [rgb]);

    const derivedPureColor = useMemo(() => {
        if (!rgb) return undefined;
        const { r, g, b } = rgb;
        return `rgba(${r}, ${g}, ${b}, 1)`;
    }, [rgb]);

    const derivedEditedValue = useMemo(() => {
        if (!rgb) return 0;
        return 100 - rgb.a * 100;
    }, [rgb]);

    const [editedValue, setEditedValue] = useState<number>(() => derivedEditedValue ?? 0);

    const sliderRef = useRef<HTMLInputElement | null>(null);
    const sliderThumbRef = useRef<HTMLDivElement | null>(null);

    const handleInputChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const a = Number(event.target.value);

            setEditedValue(a);

            const rgbVal = splitRgb(derivedPureColor);

            if (!rgbVal) {
                return;
            }

            const { r, g, b } = rgbVal;

            const newColor = `rgba(${r}, ${g}, ${b}, ${(100 - a) / 100})`;

            if (typeof onChange === 'function') {
                onChange(newColor);
            }
        },
        [derivedPureColor, onChange],
    );

    const [sliderThumbPosition, setSliderThumbPosition] = useState(0);

    useLayoutEffect(() => {
        if (sliderRef.current && sliderThumbRef.current) {
            setSliderThumbPosition(
                (editedValue / 100) *
                    (sliderRef.current.offsetWidth - sliderThumbRef.current.offsetWidth / 2),
            );
        } else {
            setSliderThumbPosition(0);
        }
    }, [editedValue]);

    const handleStart = useCallback(() => {
        void setRefreshScrollEnabled(false);

        if (typeof onStart === 'function') {
            const rgbVal = splitRgb(derivedPureColor);

            if (!rgbVal) {
                return;
            }

            const { r, g, b } = rgbVal;

            const newColor = `rgba(${r}, ${g}, ${b}, ${(100 - editedValue) / 100})`;

            onStart(newColor);
        }
    }, [editedValue, onStart, derivedPureColor]);

    const handleEnd = useCallback(() => {
        void setRefreshScrollEnabled(true);

        if (typeof onEnd === 'function') {
            const rgbVal = splitRgb(derivedPureColor);

            if (!rgbVal) {
                return;
            }

            const { r, g, b } = rgbVal;

            const newColor = `rgba(${r}, ${g}, ${b}, ${(100 - editedValue) / 100})`;

            onEnd(newColor);
        }
    }, [editedValue, onEnd, derivedPureColor]);

    return (
        <StyledTransparencySlider>
            <StyledTransparencySliderInput
                ref={sliderRef}
                $color={derivedPureColor}
                type="range"
                min={0}
                max={100}
                value={editedValue}
                onPointerDown={handleStart}
                onPointerUp={handleEnd}
                onChange={handleInputChange}
            />
            <StyledTransparencySliderBackground />
            <StyledTransparencySliderThumbWrapper
                ref={sliderThumbRef}
                $position={sliderThumbPosition}
            >
                <StyledTransparencySliderThumbBackground />
                <StyledTransparencySliderThumb $color={derivedPreviewColor} />
            </StyledTransparencySliderThumbWrapper>
        </StyledTransparencySlider>
    );
};

TransparencySlider.displayName = 'TransparencySlider';

export default TransparencySlider;
