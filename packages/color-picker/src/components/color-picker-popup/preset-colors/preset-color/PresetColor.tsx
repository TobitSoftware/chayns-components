import { useFocusRingPortal, useKeyboardFocusHighlighting } from '@chayns-components/core';
import React, { FocusEventHandler, KeyboardEvent, useContext, useMemo, useRef } from 'react';

import type { IPresetColor } from '../../../../types/colorPicker';
import { ColorPickerContext } from '../../../ColorPickerProvider';
import {
    StyledPresetColor,
    StyledPresetColorBackground,
    StyledPresetColorColor,
} from './PresetColor.styles';

interface PresetColorProps {
    color: IPresetColor['color'];
    shouldEnableKeyboardHighlighting?: boolean;
    isKeyboardFocusable?: boolean;
    presetIndex?: number;
    onFocus?: FocusEventHandler<HTMLDivElement>;
}

const PresetColor = ({
    color,
    shouldEnableKeyboardHighlighting,
    isKeyboardFocusable = false,
    presetIndex,
    onFocus,
}: PresetColorProps) => {
    const {
        selectedColor,
        updateSelectedColor,
        updateHueColor,
        updateShouldCallOnSelect,
        updateShouldGetCoordinates,
        updateIsPresetColor,
    } = useContext(ColorPickerContext);

    const isSelected = useMemo(() => selectedColor === color, [color, selectedColor]);
    const presetColorRef = useRef<HTMLDivElement>(null);
    const shouldShowKeyboardHighlighting = useKeyboardFocusHighlighting(
        shouldEnableKeyboardHighlighting,
    );

    useFocusRingPortal(presetColorRef, {
        isEnabled: shouldShowKeyboardHighlighting,
        shape: 'circle',
        padding: 3,
    });

    const handleClick = () => {
        if (typeof updateSelectedColor === 'function') {
            updateSelectedColor(color);
        }

        if (typeof updateHueColor === 'function') {
            updateHueColor(color);
        }

        if (typeof updateIsPresetColor === 'function') {
            updateIsPresetColor(true);
        }

        if (typeof updateShouldCallOnSelect === 'function') {
            updateShouldCallOnSelect(true);
        }

        if (typeof updateShouldGetCoordinates === 'function') {
            updateShouldGetCoordinates(true);
        }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleClick();
        }
    };

    return (
        <StyledPresetColor
            ref={presetColorRef}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            onFocus={onFocus}
            $isSelected={isSelected}
            data-preset-color-index={presetIndex}
            role="button"
            tabIndex={isKeyboardFocusable ? 0 : -1}
        >
            <StyledPresetColorBackground />
            <StyledPresetColorColor $color={color} />
        </StyledPresetColor>
    );
};

PresetColor.displayName = 'PresetColor';

export default PresetColor;
