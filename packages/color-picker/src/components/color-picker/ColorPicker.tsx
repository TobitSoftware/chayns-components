import Popup from '@chayns-components/core/lib/components/popup/Popup';
import { rgb255ToHex } from '@chayns/colors';
import React, { CSSProperties, FC, useEffect, useMemo, useState } from 'react';
import { splitRgb } from '../../utils/color';
import ColorPickerContent from './color-picker-content/ColorPickerContent';
import {
    StyledColorPicker,
    StyledColorPickerDot,
    StyledColorPickerLabel,
    StyledColorPickerLabelWrapper,
} from './ColorPicker.styles';

export type ColorPickerProps = {
    /**
     * A selected color to be displayed.
     */
    color?: CSSProperties['color'];
    /**
     * Whether standard colors can be selected.
     */
    shouldShowColorPrefix?: boolean;
    /**
     * Whether the color should be displayed as hex code or rgb.
     */
    shouldShowHexCode?: boolean;
};

const ColorPicker: FC<ColorPickerProps> = ({
    color = 'rgba(162, 29, 29, 1)',
    shouldShowColorPrefix,
    shouldShowHexCode,
}) => {
    const [internalColor, setInternalColor] =
        useState<CSSProperties['color']>('rgba(255, 255, 255, 1)');

    useEffect(() => {
        if (color) {
            setInternalColor(color);
        }
    }, [color]);

    const handleColorChange = (colorToSelect: CSSProperties['color']) => {
        setInternalColor(colorToSelect);
    };

    const label = useMemo(() => {
        if (shouldShowHexCode) {
            const rgba = splitRgb(internalColor);

            if (rgba) {
                return rgb255ToHex({ r: rgba.r, g: rgba.g, b: rgba.b, a: rgba.a });
            }
        }

        return internalColor;
    }, [internalColor, shouldShowHexCode]);

    return useMemo(
        () => (
            <StyledColorPicker>
                <Popup
                    content={
                        <ColorPickerContent
                            color={color}
                            internalColor={internalColor}
                            onChange={handleColorChange}
                            shouldShowColorPrefix={shouldShowColorPrefix}
                        />
                    }
                >
                    <StyledColorPickerLabelWrapper>
                        <StyledColorPickerDot color={internalColor} />
                        <StyledColorPickerLabel>{label}</StyledColorPickerLabel>
                    </StyledColorPickerLabelWrapper>
                </Popup>
            </StyledColorPicker>
        ),
        [color, internalColor, label, shouldShowColorPrefix]
    );
};

ColorPicker.displayName = 'ColorPicker';

export default ColorPicker;
