import {
    Accordion,
    AccordionGroup,
    AreaContext,
    useFocusRingPortal,
    useKeyboardFocusHighlighting,
} from '@chayns-components/core';
import { isHex } from '@chayns/colors';
import React, {
    type ChangeEvent,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

import { extractRgbValues, hexToRgb, isValidRGBA, rgbToHex } from '../../../utils/color';
import { ColorPickerContext } from '../../ColorPickerProvider';
import {
    StyledMoreOptions,
    StyledMoreOptionsInput,
    StyledMoreOptionsInputWrapper,
} from './MoreOptions.styles';
import { ttsToITextString, useTextstringValue } from '@chayns-components/textstring';
import textStrings from '../../../constants/textStrings';

type MoreOptionsProps = {
    shouldEnableKeyboardHighlighting?: boolean;
};

const MoreOptions = ({ shouldEnableKeyboardHighlighting }: MoreOptionsProps) => {
    const { selectedColor, updateSelectedColor, updateShouldCallOnSelect } =
        useContext(ColorPickerContext);
    const areaProvider = useContext(AreaContext);

    const [tmpHexValue, setTmpHexValue] = useState('');
    const [tmpRgbValue, setTmpRgbValue] = useState('');
    const [isHexInvalid, setIsHexInvalid] = useState(false);
    const [isRgbInvalid, setIsRgbInvalid] = useState(false);
    const [areInputsMounted, setAreInputsMounted] = useState(false);
    const hexInputRef = useRef<HTMLInputElement | null>(null);
    const rgbInputRef = useRef<HTMLInputElement | null>(null);
    const shouldShowKeyboardHighlighting = useKeyboardFocusHighlighting(
        shouldEnableKeyboardHighlighting,
    );

    useFocusRingPortal(hexInputRef, {
        isEnabled: shouldShowKeyboardHighlighting,
        updateKey: areInputsMounted,
    });
    useFocusRingPortal(rgbInputRef, {
        isEnabled: shouldShowKeyboardHighlighting,
        updateKey: areInputsMounted,
    });

    const setHexInputRef = useCallback((element: HTMLInputElement | null) => {
        hexInputRef.current = element;

        if (element) {
            setAreInputsMounted(true);
        }
    }, []);

    const setRgbInputRef = useCallback((element: HTMLInputElement | null) => {
        rgbInputRef.current = element;

        if (element) {
            setAreInputsMounted(true);
        }
    }, []);

    const shouldChangeColor = useMemo(
        () => areaProvider.shouldChangeColor ?? false,
        [areaProvider.shouldChangeColor],
    );

    const handleHexChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTmpHexValue(event.target.value);

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
        setTmpRgbValue(event.target.value);

        const isValid = isValidRGBA(event.target.value);

        setIsRgbInvalid(!isValid);

        if (typeof updateSelectedColor === 'function' && isValid) {
            updateSelectedColor(event.target.value);
        }

        if (typeof updateShouldCallOnSelect === 'function' && isValid) {
            updateShouldCallOnSelect(true);
        }
    };

    useEffect(() => {
        if (selectedColor) {
            if (isValidRGBA(selectedColor)) {
                setTmpRgbValue(selectedColor);
                setTmpHexValue(rgbToHex(extractRgbValues(selectedColor ?? '')));
            } else {
                const { r, g, b, a } = hexToRgb(selectedColor);

                setTmpRgbValue(`rgba(${r},${g},${b},${a})`);
                setTmpHexValue(selectedColor);
            }
        }
    }, [selectedColor]);

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
                            ref={setHexInputRef}
                            $shouldChangeColor={shouldChangeColor}
                            value={tmpHexValue}
                            onChange={handleHexChange}
                            $isInvalid={isHexInvalid}
                        />
                        <StyledMoreOptionsInput
                            ref={setRgbInputRef}
                            $shouldChangeColor={shouldChangeColor}
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
