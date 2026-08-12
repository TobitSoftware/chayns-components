import React, { useEffect, useRef } from 'react';
import type { IPresetColor } from '../../types/colorPicker';
import ColorPickerProvider from '../ColorPickerProvider';
import ColorArea from './color-area/ColorArea';
import { StyledColorPickerPopup } from './ColorPickerPopup.styles';
import MoreOptions from './more-options/MoreOptions';
import PresetColors from './preset-colors/PresetColors';
import Sliders from './sliders/Sliders';
import { TextStringProvider } from '@chayns/textstrings';

export interface ColorPickerPopupProps {
    presetColors?: IPresetColor[];
    shouldShowPresetColors: boolean;
    onPresetColorAdd?: (presetColor: IPresetColor) => void;
    onPresetColorRemove?: (presetColorId: IPresetColor['id']) => void;
    shouldShowTransparencySlider: boolean;
    shouldShowMoreOptions: boolean;
    shouldUseSiteColors: boolean;
    shouldHideColorArea: boolean;
    shouldHideDefaultPresetColors: boolean;
    shouldEnableKeyboardHighlighting?: boolean;
    selectedColor?: string;
    onSelect?: (color: string) => void;
}

type ColorPickerPopupContentProps = Omit<ColorPickerPopupProps, 'onSelect' | 'selectedColor'>;

export const ColorPickerPopupContent = ({
    presetColors,
    onPresetColorRemove,
    onPresetColorAdd,
    shouldShowPresetColors,
    shouldShowTransparencySlider,
    shouldHideDefaultPresetColors,
    shouldUseSiteColors,
    shouldShowMoreOptions,
    shouldHideColorArea,
    shouldEnableKeyboardHighlighting,
}: ColorPickerPopupContentProps) => {
    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const animationFrameId = window.requestAnimationFrame(() => {
            popupRef.current
                ?.querySelector<HTMLElement>(
                    '[tabindex="0"], input:not([disabled]), button:not([disabled])',
                )
                ?.focus();
        });

        return () => window.cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <StyledColorPickerPopup ref={popupRef}>
            {!shouldHideColorArea && (
                <ColorArea shouldEnableKeyboardHighlighting={shouldEnableKeyboardHighlighting} />
            )}
            {!shouldHideColorArea && (
                <Sliders
                    shouldEnableKeyboardHighlighting={shouldEnableKeyboardHighlighting}
                    shouldShowTransparencySlider={shouldShowTransparencySlider}
                />
            )}
            {shouldShowPresetColors && (
                <PresetColors
                    shouldHideDefaultPresetColors={shouldHideDefaultPresetColors}
                    presetColors={presetColors}
                    shouldUseSiteColors={shouldUseSiteColors}
                    onPresetColorAdd={onPresetColorAdd}
                    onPresetColorRemove={onPresetColorRemove}
                    shouldEnableKeyboardHighlighting={shouldEnableKeyboardHighlighting}
                />
            )}
            {shouldShowMoreOptions && (
                <TextStringProvider libraries="@chayns-components-color-picker">
                    <MoreOptions
                        shouldEnableKeyboardHighlighting={shouldEnableKeyboardHighlighting}
                    />
                </TextStringProvider>
            )}
        </StyledColorPickerPopup>
    );
};

ColorPickerPopupContent.displayName = 'ColorPickerPopupContent';

const ColorPickerPopup = ({
    onSelect,
    selectedColor = 'rgba(0, 94, 184, 1)',
    ...props
}: ColorPickerPopupProps) => (
    <ColorPickerProvider onSelect={onSelect} selectedColor={selectedColor}>
        <ColorPickerPopupContent {...props} />
    </ColorPickerProvider>
);

ColorPickerPopup.displayName = 'ColorPickerPopup';

export default ColorPickerPopup;
