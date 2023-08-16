import { hslToRgb255 } from '@chayns/colors';
import React, {
    ChangeEvent,
    CSSProperties,
    FC,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { convertColorToHsl, splitRgb } from '../../utils/color';
import { StyledHueSlider, StyledHueSliderInput } from './HueSlider.styles';

export type HueSliderProps = {
    /**
     * The color that should be selected.
     */
    color?: CSSProperties['color'];
    /**
     * Function that will be executed when the color is changed.
     */
    onChange?: (color: CSSProperties['color']) => void;
};

const HueSlider: FC<HueSliderProps> = ({ onChange, color = 'rgba(255, 0, 0, 1)' }) => {
    const [editedValue, setEditedValue] = useState(0);
    const [hslColor, setHslColor] = useState<CSSProperties['color']>('hsl(0, 0, 100)');

    useEffect(() => {
        if (color) {
            const rgb = splitRgb(color);

            if (!rgb) {
                return;
            }

            const hsl = convertColorToHsl(`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`);
            const match = hsl?.toString().match(/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/);

            if (!match || !match[1]) {
                return;
            }

            setHslColor(`hsl(${match[1]}, 100%, 50%)`);
            setEditedValue(parseInt(match[1], 10));

            if (typeof onChange === 'function') {
                onChange(hsl);
            }
        }
    }, [color, onChange]);

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

                onChange(`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${1})`);
            }
        },
        [onChange]
    );

    return useMemo(
        () => (
            <StyledHueSlider>
                <StyledHueSliderInput
                    color={hslColor}
                    type="range"
                    min={0}
                    max={360}
                    value={editedValue}
                    onChange={handleInputChange}
                />
            </StyledHueSlider>
        ),
        [editedValue, handleInputChange, hslColor]
    );
};

HueSlider.displayName = 'HueSlider';

export default HueSlider;