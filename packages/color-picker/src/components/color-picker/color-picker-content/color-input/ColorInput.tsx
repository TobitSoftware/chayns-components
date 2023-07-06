import { Accordion, Input } from '@chayns-components/core';
import { rgb255ToHex } from '@chayns/colors';
import React, { CSSProperties, FC, useCallback, useEffect, useMemo, useState } from 'react';
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

    const handleHexBlur = useCallback(() => {}, []);
    const handleRgbBlur = useCallback(() => {}, []);

    return useMemo(
        () => (
            <StyledColorInput>
                <Accordion isWrapped shouldHideBackground title="Erweitert">
                    <StyledColorInputWrapper>
                        <Input onBlur={handleHexBlur} value={hex} />
                        <Input onBlur={handleRgbBlur} value={rgba} />
                    </StyledColorInputWrapper>
                </Accordion>
            </StyledColorInput>
        ),
        [handleHexBlur, handleRgbBlur, hex, rgba]
    );
};

ColorInput.displayName = 'ColorInput';

export default ColorInput;
