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
    // const [rgbColor, setRgbColor] = useState<CSSProperties['color']>('rgba(255, 0, 0,1)');
    const [hslColor, setHslColor] = useState<CSSProperties['color']>('hsl(0, 0, 100)');

    useEffect(() => {
        if (color) {
            const rgba = color.match(/[\d.]+/g);

            if (!rgba) {
                return;
            }

            // setRgbColor(
            //     `rgba(${Math.ceil(Number(rgba[0]))}, ${Math.ceil(Number(rgba[1]))}, ${Math.ceil(
            //         Number(rgba[2])
            //     )}, 1)`
            // );

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
            const saturation = 100;
            const lightness = 50;

            const hsl = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
            setHslColor(hsl);

            if (typeof onChange === 'function') {
                console.log({ hue, saturation, lightness });

                const rgb = hslToRgb255({ h: hue, s: saturation, l: lightness });

                if (!rgb) {
                    return;
                }

                console.log('H', rgb);
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
