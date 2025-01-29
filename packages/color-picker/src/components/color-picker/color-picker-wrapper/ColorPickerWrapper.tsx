import { Popup } from '@chayns-components/core';
import React, { ReactNode, useContext, useMemo } from 'react';
import type { IPresetColor } from '../../../types/colorPicker';
import ColorPickerPopup from '../../color-picker-popup/ColorPickerPopup';
import { ColorPickerContext } from '../../ColorPickerProvider';
import {
    StyledColorPickerWrapper,
    StyledColorPickerWrapperInfo,
    StyledColorPickerWrapperInfoColor,
    StyledColorPickerWrapperInfoColorWrapper,
    StyledColorPickerWrapperInfoText,
} from './ColorPickerWrapper.styles';

interface ColorPickerWrapperProps {
    children?: ReactNode;
    onPresetColorAdd?: (presetColor: IPresetColor) => void;
    onPresetColorRemove?: (presetColorId: IPresetColor['id']) => void;
    presetColors?: IPresetColor[];
    shouldShowAsPopup: boolean;
    shouldShowMoreOptions: boolean;
    shouldShowPresetColors: boolean;
    shouldShowPreviewColorString: boolean;
    shouldShowRoundPreviewColor: boolean;
    shouldShowTransparencySlider: boolean;
    shouldUseSiteColors: boolean;
}

const ColorPickerWrapper = ({
    children,
    onPresetColorAdd,
    onPresetColorRemove,
    presetColors,
    shouldShowAsPopup,
    shouldShowMoreOptions,
    shouldShowPresetColors,
    shouldShowPreviewColorString,
    shouldShowRoundPreviewColor,
    shouldShowTransparencySlider,
    shouldUseSiteColors,
}: ColorPickerWrapperProps) => {
    const { selectedColor } = useContext(ColorPickerContext);

    const content = useMemo(
        () => (
            <ColorPickerPopup
                shouldShowPresetColors={shouldShowPresetColors}
                onPresetColorRemove={onPresetColorRemove}
                onPresetColorAdd={onPresetColorAdd}
                presetColors={presetColors}
                shouldUseSiteColors={shouldUseSiteColors}
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
            shouldUseSiteColors,
        ],
    );

    return (
        <StyledColorPickerWrapper>
            {shouldShowAsPopup ? (
                <Popup content={content}>
                    {children ?? (
                        <StyledColorPickerWrapperInfo>
                            <StyledColorPickerWrapperInfoColorWrapper
                                $shouldShowRoundPreviewColor={shouldShowRoundPreviewColor}
                            >
                                <StyledColorPickerWrapperInfoColor $color={selectedColor} />
                            </StyledColorPickerWrapperInfoColorWrapper>

                            {shouldShowPreviewColorString && (
                                <StyledColorPickerWrapperInfoText>
                                    {selectedColor}
                                </StyledColorPickerWrapperInfoText>
                            )}
                        </StyledColorPickerWrapperInfo>
                    )}
                </Popup>
            ) : (
                content
            )}
        </StyledColorPickerWrapper>
    );
};

ColorPickerWrapper.displayName = 'ColorPickerWrapper';

export default ColorPickerWrapper;
