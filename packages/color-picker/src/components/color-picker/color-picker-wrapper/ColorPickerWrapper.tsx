import { Popup } from '@chayns-components/core';
import React, { useContext, useMemo } from 'react';
import type { IPresetColor } from '../../../types';
import { ColorPickerContext } from '../../ColorPickerProvider';
import ColorPickerPopup from './color-picker-popup/ColorPickerPopup';
import {
    StyledColorPickerWrapper,
    StyledColorPickerWrapperInfo,
    StyledColorPickerWrapperInfoColor,
    StyledColorPickerWrapperInfoText,
} from './ColorPickerWrapper.styles';

interface ColorPickerWrapperProps {
    onSelect?: (color: string) => void;
    selectedColor?: string;
    presetColors?: IPresetColor[];
    shouldShowPresetColors: boolean;
    onPresetColorAdd?: (presetColor: IPresetColor) => void;
    onPresetColorRemove?: (presetColorId: IPresetColor['id']) => void;
    shouldShowTransparencySlider: boolean;
    shouldShowMoreOptions: boolean;
    shouldShowAsPopup: boolean;
}

const ColorPickerWrapper = ({
    selectedColor,
    onSelect,
    presetColors,
    onPresetColorRemove,
    onPresetColorAdd,
    shouldShowPresetColors,
    shouldShowAsPopup,
    shouldShowTransparencySlider,
    shouldShowMoreOptions,
}: ColorPickerWrapperProps) => {
    const { selectedColor: internalSelectedColor } = useContext(ColorPickerContext);

    const content = useMemo(
        () => (
            <ColorPickerPopup
                shouldShowPresetColors={shouldShowPresetColors}
                onPresetColorRemove={onPresetColorRemove}
                onPresetColorAdd={onPresetColorAdd}
                presetColors={presetColors}
                shouldShowMoreOptions={shouldShowMoreOptions}
                selectedColor={selectedColor}
                shouldShowTransparencySlider={shouldShowTransparencySlider}
                onSelect={onSelect}
            />
        ),
        [
            onPresetColorAdd,
            onPresetColorRemove,
            onSelect,
            presetColors,
            selectedColor,
            shouldShowMoreOptions,
            shouldShowPresetColors,
            shouldShowTransparencySlider,
        ],
    );

    return (
        <StyledColorPickerWrapper>
            {shouldShowAsPopup ? (
                <Popup content={content}>
                    <StyledColorPickerWrapperInfo>
                        <StyledColorPickerWrapperInfoColor $color={internalSelectedColor} />
                        <StyledColorPickerWrapperInfoText>
                            {internalSelectedColor}
                        </StyledColorPickerWrapperInfoText>
                    </StyledColorPickerWrapperInfo>
                </Popup>
            ) : (
                content
            )}
        </StyledColorPickerWrapper>
    );
};

ColorPickerWrapper.displayName = 'ColorPickerWrapper';

export default ColorPickerWrapper;
