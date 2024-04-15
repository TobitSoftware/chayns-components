import { Accordion, AccordionGroup } from '@chayns-components/core';
import { isHex } from '@chayns/colors';
import React, { useContext, useEffect, useState, type ChangeEvent } from 'react';
import { extractRgbValues, hexToRgb, isValidRGBA, rgbToHex } from '../../../utils/color';
import { ColorPickerContext } from '../../ColorPickerProvider';
import {
    StyledMoreOptions,
    StyledMoreOptionsInput,
    StyledMoreOptionsInputWrapper,
} from './MoreOptions.styles';

const MoreOptions = () => {
    const { selectedColor, updateSelectedColor } = useContext(ColorPickerContext);

    const [tmpHexValue, setTmpHexValue] = useState('');
    const [tmpRgbValue, setTmpRgbValue] = useState('');
    const [isHexInvalid, setIsHexInvalid] = useState(false);
    const [isRgbInvalid, setIsRgbInvalid] = useState(false);

    const handleHexChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTmpHexValue(event.target.value);

        const isValid = isHex(event.target.value);

        setIsHexInvalid(!isValid);

        if (typeof updateSelectedColor === 'function' && isValid) {
            const { r, g, b, a } = hexToRgb(event.target.value);

            updateSelectedColor(`rgba(${r},${g},${b},${a})`);
        }
    };

    const handleRgbChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTmpRgbValue(event.target.value);

        const isValid = isValidRGBA(event.target.value);

        setIsRgbInvalid(!isValid);

        if (typeof updateSelectedColor === 'function' && isValid) {
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
                        <StyledMoreOptionsInput
                            value={tmpHexValue}
                            onChange={handleHexChange}
                            $isInvalid={isHexInvalid}
                        />
                        <StyledMoreOptionsInput
                            value={tmpRgbValue}
                            onChange={handleRgbChange}
                            $isInvalid={isRgbInvalid}
                        />
                    </StyledMoreOptionsInputWrapper>
                </Accordion>
            </AccordionGroup>
        </StyledMoreOptions>
    );
};

MoreOptions.displayName = 'MoreOptions';

export default MoreOptions;
