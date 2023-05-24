import React, { CSSProperties, FC, useEffect, useMemo, useState } from 'react';
import type { ContextMenuAlignment } from '../context-menu/constants/alignment';
import ColorArea from './color-area/ColorArea';
import {
    StyledColorPicker,
    StyledColorPickerContent,
    StyledColorPickerDot,
    StyledColorPickerLabel,
    StyledColorPickerLabelWrapper,
} from './ColorPicker.styles';

export type ColorPickerProps = {
    /**
     * The alignment of the popup.
     */
    alignment?: ContextMenuAlignment;
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
    color,
    shouldShowColorPrefix,
    shouldShowHexCode,
    alignment,
}) => {
    const [selectedColor, setSelectedColor] = useState<CSSProperties['color']>();

    useEffect(() => {
        if (color) {
            setSelectedColor(color);
        }
    }, [color]);

    const handleColorChange = (colorToSelect: CSSProperties['color']) => {
        setSelectedColor(colorToSelect);
    };

    const label = useMemo(() => {
        let h;
        return 'hallo';
    }, []);

    return useMemo(
        () => (
            <StyledColorPicker>
                <StyledColorPickerLabelWrapper>
                    <StyledColorPickerDot color={selectedColor} />
                    <StyledColorPickerLabel>{label}</StyledColorPickerLabel>
                </StyledColorPickerLabelWrapper>
                <StyledColorPickerContent>
                    <ColorArea onChange={handleColorChange} />
                </StyledColorPickerContent>
            </StyledColorPicker>
        ),
        [label, selectedColor]
    );
};

ColorPicker.displayName = 'ColorPicker';

export default ColorPicker;
