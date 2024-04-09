import { Accordion, AccordionGroup } from '@chayns-components/core';
import React, { useContext, useMemo, type ChangeEvent } from 'react';
import { hexToRgb } from '../../../utils/color';
import { ColorPickerContext } from '../ColorPicker';
import {
    StyledMoreOptions,
    StyledMoreOptionsInput,
    StyledMoreOptionsInputWrapper,
} from './MoreOptions.styles';

const MoreOptions = () => {
    const { selectedColor, updateSelectedColor } = useContext(ColorPickerContext);

    const handleHexChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (typeof updateSelectedColor === 'function') {
            updateSelectedColor(event.target.value);
        }
    };

    const handleRgbChange = (event: ChangeEvent<HTMLInputElement>) => {};

    const rgbColor = useMemo(() => {
        const { r, b, g, a } = hexToRgb(selectedColor ?? '');

        return `rgba(${r},${g},${b},${a})`;
    }, [selectedColor]);

    return (
        <StyledMoreOptions>
            <AccordionGroup isWrapped>
                <Accordion title="Erweitert" isDefaultOpen>
                    <StyledMoreOptionsInputWrapper>
                        <StyledMoreOptionsInput value={selectedColor} onChange={handleHexChange} />
                        <StyledMoreOptionsInput value={rgbColor} onChange={handleRgbChange} />
                    </StyledMoreOptionsInputWrapper>
                </Accordion>
            </AccordionGroup>
        </StyledMoreOptions>
    );
};

MoreOptions.displayName = 'MoreOptions';

export default MoreOptions;
