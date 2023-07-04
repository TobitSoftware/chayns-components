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

const HueSlider: FC<HueSliderProps> = ({ onChange, color = 'hsl(267, 100%, 50%)' }) => {
    const [editedValue, setEditedValue] = useState(0);
    const [hueColor, setHueColor] = useState<CSSProperties['color']>('red');

    useEffect(() => {
        if (color) {
            const hsl = convertColorToHsl(color);

            if (!hsl) {
                return;
            }

            const match = hsl.toString().match(/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/);

            if (!match || !match[1]) {
                return;
            }

            const hue = parseInt(match[1], 10);

            setEditedValue(hue);
            setHueColor(color);
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
            setHueColor(hsl);

            if (typeof onChange === 'function') {
                onChange(hsl);
            }
        },
        [onChange]
    );

    return useMemo(
        () => (
            <StyledHueSlider>
                <StyledHueSliderInput
                    color={hueColor}
                    type="range"
                    min={0}
                    max={360}
                    value={editedValue}
                    onChange={handleInputChange}
                />
            </StyledHueSlider>
        ),
        [editedValue, handleInputChange, hueColor]
    );
};

HueSlider.displayName = 'HueSlider';

export default HueSlider;
