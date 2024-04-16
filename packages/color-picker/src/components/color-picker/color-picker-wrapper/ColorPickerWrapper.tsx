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
    presetColors?: IPresetColor[];
    shouldShowPresetColors: boolean;
    onPresetColorAdd?: (presetColor: IPresetColor) => void;
    onPresetColorRemove?: (presetColorId: IPresetColor['id']) => void;
    shouldShowTransparencySlider: boolean;
    shouldShowMoreOptions: boolean;
    shouldShowAsPopup: boolean;
}

const ColorPickerWrapper = ({
    presetColors,
    onPresetColorRemove,
    onPresetColorAdd,
    shouldShowPresetColors,
    shouldShowAsPopup,
    shouldShowTransparencySlider,
    shouldShowMoreOptions,
}: ColorPickerWrapperProps) => {
    const { selectedColor } = useContext(ColorPickerContext);

    const content = useMemo(
        () => (
            <ColorPickerPopup
                shouldShowPresetColors={shouldShowPresetColors}
                onPresetColorRemove={onPresetColorRemove}
                onPresetColorAdd={onPresetColorAdd}
                presetColors={presetColors}
                shouldShowMoreOptions={shouldShowMoreOptions}
                shouldShowTransparencySlider={shouldShowTransparencySlider}
            />
        ),
        [
            onPresetColorAdd,
            onPresetColorRemove,
            presetColors,
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
                        <StyledColorPickerWrapperInfoColor $color={selectedColor} />
                        <StyledColorPickerWrapperInfoText>
                            {selectedColor}
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
