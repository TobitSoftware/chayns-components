import { Icon, useFocusRingPortal, useKeyboardFocusHighlighting } from '@chayns-components/core';
import React, { FocusEventHandler, useContext, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { IPresetColor } from '../../../../types/colorPicker';
import { ColorPickerContext } from '../../../ColorPickerProvider';
import { StyledPresetButton } from './PresetButton.styles';

interface PresetButtonProps {
    id?: IPresetColor['id'];
    isCustom?: IPresetColor['isCustom'];
    onAdd?: (color: IPresetColor) => void;
    onRemove?: (id: IPresetColor['id']) => void;
    shouldEnableKeyboardHighlighting?: boolean;
    isKeyboardFocusable?: boolean;
    onFocus?: FocusEventHandler<HTMLButtonElement>;
    presetIndex?: number;
}

const PresetButton = ({
    id,
    isCustom,
    onRemove,
    onAdd,
    shouldEnableKeyboardHighlighting,
    isKeyboardFocusable = false,
    onFocus,
    presetIndex,
}: PresetButtonProps) => {
    const { selectedColor } = useContext(ColorPickerContext);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const canRemove = Boolean(id && isCustom);
    const shouldShowKeyboardHighlighting = useKeyboardFocusHighlighting(
        shouldEnableKeyboardHighlighting,
    );

    useFocusRingPortal(buttonRef, {
        isEnabled: shouldShowKeyboardHighlighting,
        shape: 'circle',
        padding: 3,
    });

    const icon = canRemove ? ['fa-solid fa-trash'] : ['fa-solid fa-plus'];

    const handleClick = () => {
        if (canRemove) {
            if (id && typeof onRemove === 'function') {
                onRemove(id);
            }
        } else if (typeof onAdd === 'function' && selectedColor) {
            onAdd({ color: selectedColor, isCustom: true, id: uuidv4() });
        }
    };

    return (
        <StyledPresetButton
            onClick={handleClick}
            onFocus={onFocus}
            ref={buttonRef}
            data-preset-color-index={presetIndex}
            tabIndex={isKeyboardFocusable ? 0 : -1}
            type="button"
            $isDisabled={false}
        >
            <Icon icons={icon} size={canRemove ? 10 : 15} />
        </StyledPresetButton>
    );
};

PresetButton.displayName = 'PresetButton';

export default PresetButton;
