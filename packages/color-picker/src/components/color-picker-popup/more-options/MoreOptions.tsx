import { Accordion, AccordionGroup, AreaContext } from '@chayns-components/core';
import { isHex } from '@chayns/colors';
import React, { type ChangeEvent, useContext, useMemo, useState } from 'react';

import { extractRgbValues, hexToRgb, isValidRGBA, rgbToHex } from '../../../utils/color';
import { ColorPickerContext } from '../../ColorPickerProvider';
import {
    StyledMoreOptions,
    StyledMoreOptionsInput,
    StyledMoreOptionsInputWrapper,
} from './MoreOptions.styles';
import { ttsToITextString, useTextstringValue } from '@chayns-components/textstring';
import textStrings from '../../../constants/textStrings';

const MoreOptions = () => {
    const { selectedColor, updateSelectedColor, updateShouldCallOnSelect } =
        useContext(ColorPickerContext);
    const areaProvider = useContext(AreaContext);

    const [inputHexValue, setInputHexValue] = useState<string>();
    const [inputRgbValue, setInputRgbValue] = useState<string>();
    const [isHexInvalid, setIsHexInvalid] = useState(false);
    const [isRgbInvalid, setIsRgbInvalid] = useState(false);

    const shouldChangeColor = useMemo(
        () => areaProvider.shouldChangeColor ?? false,
        [areaProvider.shouldChangeColor],
    );

    const handleHexChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputHexValue(event.target.value);

        const isValid = isHex(event.target.value);

        setIsHexInvalid(!isValid);

        if (typeof updateSelectedColor === 'function' && isValid) {
            const { r, g, b, a } = hexToRgb(event.target.value);

            updateSelectedColor(`rgba(${r},${g},${b},${a})`);
        }

        if (typeof updateShouldCallOnSelect === 'function' && isValid) {
            updateShouldCallOnSelect(true);
        }
    };

    const handleRgbChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputRgbValue(event.target.value);

        const isValid = isValidRGBA(event.target.value);

        setIsRgbInvalid(!isValid);

        if (typeof updateSelectedColor === 'function' && isValid) {
            updateSelectedColor(event.target.value);
        }

        if (typeof updateShouldCallOnSelect === 'function' && isValid) {
            updateShouldCallOnSelect(true);
        }
    };

    const derivedRgbValue = () => {
        if (selectedColor) {
            if (isValidRGBA(selectedColor)) {
                return selectedColor;
            }
            const { r, g, b, a } = hexToRgb(selectedColor);
            return `rgba(${r},${g},${b},${a})`;
        }
        return undefined;
    };

    const derivedHexValue = () => {
        if (selectedColor) {
            if (isValidRGBA(selectedColor)) {
                return rgbToHex(extractRgbValues(selectedColor));
            }
            return selectedColor;
        }
        return undefined;
    };

    const title = useTextstringValue({
        textstring: ttsToITextString(
            textStrings.components.colorPickerPopup.moreOptions.accordionTitle,
        ),
    });

    return (
        <StyledMoreOptions>
            <AccordionGroup isWrapped>
                <Accordion title={title}>
                    <StyledMoreOptionsInputWrapper>
                        <StyledMoreOptionsInput
                            $shouldChangeColor={shouldChangeColor}
                            value={inputHexValue ?? derivedHexValue()}
                            onChange={handleHexChange}
                            $isInvalid={isHexInvalid}
                        />
                        <StyledMoreOptionsInput
                            $shouldChangeColor={shouldChangeColor}
                            value={inputRgbValue ?? derivedRgbValue()}
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
