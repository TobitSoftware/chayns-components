import { Icon } from '@chayns-components/core';
import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { IPresetColor } from '../../../../../../types';
import { ColorPickerContext } from '../../../../../ColorPickerProvider';
import { StyledPresetButton } from './PresetButton.styles';

interface PresetButtonProps {
    id?: IPresetColor['id'];
    isCustom?: IPresetColor['isCustom'];
    onAdd?: (color: IPresetColor) => void;
    onRemove?: (id: IPresetColor['id']) => void;
}

const PresetButton = ({ id, isCustom, onRemove, onAdd }: PresetButtonProps) => {
    const { selectedColor } = useContext(ColorPickerContext);

    const icon = isCustom ? ['fa-solid fa-trash'] : ['fa-solid fa-plus'];

    const handleClick = () => {
        if (id) {
            if (typeof onRemove === 'function') {
                onRemove(id);
            }
        } else if (typeof onAdd === 'function' && selectedColor) {
            onAdd({ color: selectedColor, isCustom: true, id: uuidv4() });
        }
    };

    return (
        <StyledPresetButton onClick={handleClick} $isDisabled={!!id && !isCustom}>
            <Icon icons={icon} size={isCustom ? 10 : 15} />
        </StyledPresetButton>
    );
};

PresetButton.displayName = 'PresetButton';

export default PresetButton;
