import React, {
    ChangeEvent,
    CSSProperties,
    FC,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { splitRgb } from '../../utils/color';
import {
    StyledOpacitySlider,
    StyledOpacitySliderBackground,
    StyledOpacitySliderInput,
} from './OpacitySlider.styles';

export type HueSliderProps = {
    /**
     * The color from which the opacity should be changed.
     */
    color: CSSProperties['color'];
    /**
     * Function that will be executed when the color is changed.
     */
    onChange?: (color: CSSProperties['color']) => void;
};

const OpacitySlider: FC<HueSliderProps> = ({ onChange, color }) => {
    const [value, setValue] = useState(100);
    const [hueColor, setHueColor] = useState<CSSProperties['color']>('rgba(255, 255, 255, 1)');

    useEffect(() => {
        if (color) {
            const rgba = splitRgb(color);

            if (rgba && rgba.a) {
                setValue(rgba.a);
            }
            setHueColor(color);
        }
    }, [color]);

    const handleInputChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setValue(Number(event.target.value));

            const rgba = color?.match(/[\d.]+/g);

            if (!rgba) {
                return;
            }

            const newColor = `rgba(${Math.ceil(Number(rgba[0]))}, ${Math.ceil(
                Number(rgba[1])
            )}, ${Math.ceil(Number(rgba[2]))}, ${Number(event.target.value)})`;

            setHueColor(newColor);

            if (typeof onChange === 'function') {
                onChange(newColor);
            }
        },
        [color, onChange]
    );

    return useMemo(
        () => (
            <StyledOpacitySlider>
                <StyledOpacitySliderBackground>
                    <StyledOpacitySliderInput
                        opacity={value}
                        color={hueColor}
                        type="range"
                        min={0}
                        max={1}
                        step={0.1}
                        value={value}
                        onChange={handleInputChange}
                    />
                </StyledOpacitySliderBackground>
            </StyledOpacitySlider>
        ),
        [value, handleInputChange, hueColor]
    );
};

OpacitySlider.displayName = 'OpacitySlider';

export default OpacitySlider;
