import { hslToRgb255 } from '@chayns/colors';
import React, {
    ChangeEvent,
    CSSProperties,
    FC,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { convertColorToHsl, extractHsl, splitRgb } from '../../utils/color';
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
    const [editedValue, setEditedValue] = useState(0);
    const [hslColor, setHslColor] = useState<CSSProperties['color']>('hsl(0, 0, 100)');
    const [internalOpacity, setInternalOpacity] = useState(1);

    const sliderThumbRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (color) {
            const rgb = splitRgb(color);

            if (!rgb) {
                return;
            }

            const { r, g, b, a } = rgb;

            setInternalOpacity(a);

            const hsl = convertColorToHsl(`rgba(${r}, ${g}, ${b}, 1)`);
            const match = hsl?.toString().match(/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/);

            if (!match || !match[1]) {
                return;
            }

            setHslColor(`hsl(${match[1]}, 100%, 50%)`);
            setEditedValue(parseInt(match[1], 10));
        }
    }, [color]);

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

    const sliderThumbPosition = useMemo(() => {
        if (sliderRef.current && sliderThumbRef.current) {
            return (
                (editedValue / 360) *
                (sliderRef.current.offsetWidth - sliderThumbRef.current.offsetWidth / 2)
            );
        }
        return 0;
    }, [editedValue]);

    const handleStart = useCallback(() => {
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
            <StyledHueSlider>
                <StyledHueSliderInput
                    ref={sliderRef}
                    $color={hslColor}
                    type="range"
                    min={0}
                    max={360}
                    value={editedValue}
                    onChange={handleInputChange}
                    onPointerDown={handleStart}
                    onPointerUp={handleEnd}
                />
                <StyledHueSliderThumb
                    ref={sliderThumbRef}
                    $position={sliderThumbPosition}
                    $color={hslColor}
                />
            </StyledHueSlider>
        ),
        [editedValue, handleEnd, handleInputChange, handleStart, hslColor, sliderThumbPosition],
    );
};

HueSlider.displayName = 'HueSlider';

export default HueSlider;
