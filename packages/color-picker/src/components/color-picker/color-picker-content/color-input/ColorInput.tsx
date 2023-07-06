import { Accordion, Input } from '@chayns-components/core';
import { hexToRgb255, rgb255ToHex } from '@chayns/colors';
import React, {
    ChangeEvent,
    CSSProperties,
    FC,
    FocusEvent,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { splitRgb } from '../../../../utils/color';
import { StyledColorInput, StyledColorInputWrapper } from './ColorInput.styles';

export type ColorInputProps = {
    onChange: (color: CSSProperties['color']) => void;
    color: CSSProperties['color'];
};

const ColorInput: FC<ColorInputProps> = ({ color, onChange }) => {
    const [rgba, setRgba] = useState<CSSProperties['color']>();
    const [hex, setHex] = useState<CSSProperties['color']>();

    useEffect(() => {
        if (color) {
            setRgba(color);

            const rgb = splitRgb(color);

            if (rgb) {
                const hexColor = rgb255ToHex({ r: rgb.r, g: rgb.g, b: rgb.b, a: rgb.a });

                if (hexColor) {
                    setHex(hexColor);
                }
            }
        }
    }, [color]);

    const handleHexBlur = useCallback(
        (event: FocusEvent<HTMLInputElement>) => {
            const { value } = event.target;

            setHex(value);

            const rgb = hexToRgb255(value);

            if (rgb && 'a' in rgb) {
                setRgba(`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`);
                onChange(`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`);
            }
        },
        [onChange]
    );

    const handleRgbBlur = useCallback(
        (event: FocusEvent<HTMLInputElement>) => {
            const { value } = event.target;

            setRgba(value);

            const rgb = splitRgb(value);

            if (rgb) {
                const hexColor = rgb255ToHex({ r: rgb.r, g: rgb.g, b: rgb.b, a: rgb.a });

                if (hexColor) {
                    setHex(hexColor);
                }
            }

            onChange(value);
        },
        [onChange]
    );

    const handleHexChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setHex(event.target.value);
    }, []);

    const handleRgbChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setRgba(event.target.value);
    }, []);

    return useMemo(
        () => (
            <StyledColorInput>
                <Accordion isWrapped shouldHideBackground title="Erweitert">
                    <StyledColorInputWrapper>
                        <Input onBlur={handleHexBlur} value={hex} onChange={handleHexChange} />
                        <Input onBlur={handleRgbBlur} value={rgba} onChange={handleRgbChange} />
                    </StyledColorInputWrapper>
                </Accordion>
            </StyledColorInput>
        ),
        [handleHexBlur, handleHexChange, handleRgbBlur, handleRgbChange, hex, rgba]
    );
};

ColorInput.displayName = 'ColorInput';

export default ColorInput;
