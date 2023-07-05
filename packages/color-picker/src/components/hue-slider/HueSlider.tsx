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
import { convertColorToHsl } from '../../utils/color';
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

const HueSlider: FC<HueSliderProps> = ({ onChange, color }) => {
    const [editedValue, setEditedValue] = useState(0);
    const [hslColor, setHslColor] = useState<CSSProperties['color']>('hsl(0, 0, 100)');
    const [opacity, setOpacity] = useState<number>();

    useEffect(() => {
        if (color) {
            const rgba = color.match(/[\d.]+/g);

            if (!rgba) {
                return;
            }

            setOpacity(Number(rgba[3]));

            const hsl = convertColorToHsl(color);
            const match = hsl?.toString().match(/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/);

            if (!match || !match[1]) {
                return;
            }

            setHslColor(hsl);
            setEditedValue(parseInt(match[1], 10));
        }
    }, [color]);

    /**
     * This function updates the value
     */
    const handleInputChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setEditedValue(Number(event.target.value));

            const percentage = (Number(event.target.value) / 360) * 100;
            const hue = (percentage / 100) * 360;
            const saturation = 1;
            const lightness = 0.5;

            const hsl = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
            setHslColor(hsl);

            if (typeof onChange === 'function') {
                const rgb = hslToRgb255({ h: hue, s: saturation, l: lightness });

                if (!rgb) {
                    return;
                }

                onChange(`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity ?? 1})`);
            }
        },
        [onChange, opacity]
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
