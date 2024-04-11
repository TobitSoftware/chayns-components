import { Accordion, AccordionGroup } from '@chayns-components/core';
import { isHex, isRgb1 } from '@chayns/colors';
import React, { useContext, useEffect, useState, type ChangeEvent } from 'react';
import { extractRgbValues, hexToRgb, rgbToHex } from '../../../utils/color';
import { ColorPickerContext } from '../ColorPicker';
import {
    StyledMoreOptions,
    StyledMoreOptionsInput,
    StyledMoreOptionsInputWrapper,
} from './MoreOptions.styles';

const MoreOptions = () => {
    const { selectedColor, updateSelectedColor } = useContext(ColorPickerContext);

    const [tmpHexValue, setTmpHexValue] = useState('');
    const [tmpRgbValue, setTmpRgbValue] = useState('');

    const handleHexChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTmpHexValue(event.target.value);

        if (typeof updateSelectedColor === 'function' && isHex(event.target.value)) {
            const { r, g, b, a } = hexToRgb(event.target.value);

            updateSelectedColor(`rgba(${r},${g},${b},${a})`);
        }
    };

    const handleRgbChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTmpRgbValue(event.target.value);

        if (typeof updateSelectedColor === 'function' && isRgb1(event.target.value)) {
            updateSelectedColor(event.target.value);
        }
    };

    useEffect(() => {
        if (selectedColor) {
            setTmpRgbValue(selectedColor);
            setTmpHexValue(rgbToHex(extractRgbValues(selectedColor ?? '')));
        }
    }, [selectedColor]);

    return (
        <StyledMoreOptions>
            <AccordionGroup isWrapped>
                <Accordion title="Erweitert">
                    <StyledMoreOptionsInputWrapper>
                        <StyledMoreOptionsInput value={tmpHexValue} onChange={handleHexChange} />
                        <StyledMoreOptionsInput value={tmpRgbValue} onChange={handleRgbChange} />
                    </StyledMoreOptionsInputWrapper>
                </Accordion>
            </AccordionGroup>
        </StyledMoreOptions>
    );
};

MoreOptions.displayName = 'MoreOptions';

export default MoreOptions;
