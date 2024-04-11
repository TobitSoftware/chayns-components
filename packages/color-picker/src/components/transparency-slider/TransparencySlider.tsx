import React, { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { splitRgb } from '../../utils/color';
import {
    StyledTransparencySlider,
    StyledTransparencySliderBackground,
    StyledTransparencySliderInput,
    StyledTransparencySliderThumb,
    StyledTransparencySliderThumbBackground,
    StyledTransparencySliderThumbWrapper,
} from './TransparencySlider.styles';

interface TransparencySliderProps {
    color?: string;
    onChange?: (color: string) => void;
}

const TransparencySlider = ({
    onChange,
    color = 'rgba(255, 0, 0, 1)',
}: TransparencySliderProps) => {
    const [editedValue, setEditedValue] = useState(0);
    const [pureColor, setPureColor] = useState<string>();
    const [previewColor, setPreviewColor] = useState<string>();

    const sliderThumbRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (color) {
            const rgb = splitRgb(color);

            if (!rgb) {
                return;
            }

            const { r, g, b, a } = rgb;

            const newColor = `rgba(${r}, ${g}, ${b}, ${a})`;

            setPreviewColor(newColor);
            setPureColor(`rgb(${r},${g},${b},1)`);
            setEditedValue(100 - a * 100);
        }
    }, [color]);

    const handleInputChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const a = Number(event.target.value);

            setEditedValue(a);

            const rgb = splitRgb(pureColor);

            if (!rgb) {
                return;
            }

            const { r, g, b } = rgb;

            const newColor = `rgba(${r}, ${g}, ${b}, ${(100 - a) / 100})`;

            setPreviewColor(newColor);

            if (typeof onChange === 'function') {
                onChange(newColor);
            }
        },
        [onChange, pureColor],
    );

    const sliderThumbPosition = useMemo(() => {
        if (sliderRef.current && sliderThumbRef.current) {
            return (
                (editedValue / 100) *
                (sliderRef.current.offsetWidth - sliderThumbRef.current.offsetWidth / 2)
            );
        }
        return 0;
    }, [editedValue]);

    return (
        <StyledTransparencySlider>
            <StyledTransparencySliderInput
                ref={sliderRef}
                $color={pureColor}
                type="range"
                min={0}
                max={100}
                value={editedValue}
                onChange={handleInputChange}
            />
            <StyledTransparencySliderBackground />
            <StyledTransparencySliderThumbWrapper
                ref={sliderThumbRef}
                $position={sliderThumbPosition}
            >
                <StyledTransparencySliderThumbBackground />
                <StyledTransparencySliderThumb $color={previewColor} />
            </StyledTransparencySliderThumbWrapper>
        </StyledTransparencySlider>
    );
};

TransparencySlider.displayName = 'TransparencySlider';

export default TransparencySlider;
