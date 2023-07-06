import { Accordion, AccordionContent, Input } from '@chayns-components/core';
import React, { CSSProperties, FC, useCallback, useMemo, useState } from 'react';
import { StyledColorInput, StyledColorInputWrapper } from './ColorInput.styles';

export type ColorInputProps = {
    onChange: (color: CSSProperties['color']) => void;
    color: CSSProperties['color'];
};

const ColorInput: FC<ColorInputProps> = ({ color, onChange }) => {
    const [rgba, setRgba] = useState<CSSProperties['color']>();
    const [hex, setHex] = useState<CSSProperties['color']>();

    const handleBlur = useCallback(() => {}, []);

    return useMemo(
        () => (
            <StyledColorInput>
                <Accordion title="Erweitert">
                    <AccordionContent>
                        <StyledColorInputWrapper>
                            <Input onBlur={handleBlur} value={hex} />
                            <Input onBlur={handleBlur} value={rgba} />
                        </StyledColorInputWrapper>
                    </AccordionContent>
                </Accordion>
            </StyledColorInput>
        ),
        [handleBlur, hex, rgba]
    );
};

ColorInput.displayName = 'ColorInput';

export default ColorInput;
