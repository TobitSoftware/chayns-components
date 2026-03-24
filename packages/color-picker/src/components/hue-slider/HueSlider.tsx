import { hslToRgb255 } from '@chayns/colors';
import { setRefreshScrollEnabled } from 'chayns-api';
import React, {
    ChangeEvent,
    CSSProperties,
    FC,
    useCallback,
    useMemo,
    useRef,
    useState,
} from 'react';
import { useElementSize } from '@chayns-components/core';
import { convertColorToHsl, extractHsl, hexToRgb, isValidRGBA, splitRgb } from '../../utils/color';
import { StyledHueSlider, StyledHueSliderInput, StyledHueSliderThumb } from './HueSlider.styles';

export type HueSliderProps = {
    /**
     * The color that should be selected.
     */
    color?: CSSProperties['color'];
    /**
     * Function that will be executed when the color is changed.
     */
    onChange?: (rgb: CSSProperties['color'], hsl: CSSProperties['color']) => void;
    /**
     * Function that will be executed when the color is ending to change.
     */
    onEnd?: (rgb: CSSProperties['color'], hsl: CSSProperties['color']) => void;
    /**
     * Function that will be executed when the color is starting to change.
     */
    onStart?: (rgb: CSSProperties['color'], hsl: CSSProperties['color']) => void;
    /**
     * The opacity of the Color. Is used if the color has no opacity value.
     */
    opacity?: number;
};

const HueSlider: FC<HueSliderProps> = ({
    onChange,
    onStart,
    onEnd,
    opacity,
    color = 'rgba(255, 0, 0, 1)',
}) => {
    const sliderRef = useRef<HTMLDivElement>(null);

    const parsedColor = useMemo(() => {
        let rgb;

        if (isValidRGBA(color)) {
            rgb = splitRgb(color);
        } else {
            rgb = hexToRgb(color);
        }

        if (!rgb) {
            return {
                editedValue: 0,
                hslColor: 'hsl(0, 0, 100)',
                opacity: 1,
            };
        }

        const { r, g, b, a } = rgb;

        const hsl = convertColorToHsl(`rgba(${r}, ${g}, ${b}, 1)`);
        const match = hsl?.toString().match(/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/);

        if (!match || !match[1]) {
            return {
                editedValue: 0,
                hslColor: 'hsl(0, 0, 100)',
                opacity: a,
            };
        }

        return {
            editedValue: parseInt(match[1], 10),
            hslColor: `hsl(${match[1]}, 100%, 50%)`,
            opacity: a,
        };
    }, [color]);

    const [editedValue, setEditedValue] = useState(parsedColor.editedValue);
    const [hslColor, setHslColor] = useState<CSSProperties['color']>(parsedColor.hslColor);
    const [internalOpacity] = useState(parsedColor.opacity);

    const handleInputChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setEditedValue(Number(event.target.value));

            const percentage = (Number(event.target.value) / 360) * 100;
            const hue = (percentage / 100) * 360;
            const saturation = 100;
            const lightness = 50;

            const hsl = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
            setHslColor(hsl);

            if (typeof onChange === 'function') {
                const rgb = hslToRgb255({ h: hue, s: 1, l: 0.5 });

                if (!rgb) {
                    return;
                }

                onChange(`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity ?? internalOpacity})`, hsl);
            }
        },
        [internalOpacity, onChange, opacity],
    );

    const sliderSize = useElementSize(sliderRef);
    const sliderThumbWidth = 36;
    const sliderThumbPosition = sliderSize?.width
        ? (editedValue / 360) * Math.max(sliderSize.width - sliderThumbWidth / 2, 0)
        : 0;

    const handleStart = useCallback(() => {
        void setRefreshScrollEnabled(false);

        if (typeof onStart === 'function' && hslColor) {
            const hsl = extractHsl(hslColor);

            if (!hsl) {
                return;
            }

            const rgb = hslToRgb255(hsl);

            if (!rgb) {
                return;
            }

            const { r, g, b } = rgb;

            onStart(`rgba(${r}, ${g}, ${b}, ${opacity ?? internalOpacity})`, hslColor);
        }
    }, [hslColor, internalOpacity, onStart, opacity]);

    const handleEnd = useCallback(() => {
        void setRefreshScrollEnabled(true);

        if (typeof onEnd === 'function' && hslColor) {
            const hsl = extractHsl(hslColor);

            if (!hsl) {
                return;
            }

            const rgb = hslToRgb255(hsl);

            if (!rgb) {
                return;
            }

            const { r, g, b } = rgb;

            onEnd(`rgba(${r}, ${g}, ${b}, ${opacity ?? internalOpacity})`, hslColor);
        }
    }, [hslColor, internalOpacity, onEnd, opacity]);

    return useMemo(
        () => (
            <StyledHueSlider ref={sliderRef}>
                <StyledHueSliderInput
                    $color={hslColor}
                    type="range"
                    min={0}
                    max={360}
                    value={editedValue}
                    onChange={handleInputChange}
                    onPointerDown={handleStart}
                    onPointerUp={handleEnd}
                />
                <StyledHueSliderThumb $position={sliderThumbPosition} $color={hslColor} />
            </StyledHueSlider>
        ),
        [editedValue, handleEnd, handleInputChange, handleStart, hslColor, sliderThumbPosition],
    );
};

HueSlider.displayName = 'HueSlider';

export default HueSlider;
