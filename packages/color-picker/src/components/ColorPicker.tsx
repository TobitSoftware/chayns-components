import type { PopupRef } from '@chayns-components/core/lib/components/popup/interface';
import Popup from '@chayns-components/core/lib/components/popup/Popup';
import React, { CSSProperties, FC, useEffect, useMemo, useRef, useState } from 'react';
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

const ColorPicker: FC<ColorPickerProps> = ({ color, shouldShowColorPrefix, shouldShowHexCode }) => {
    const [selectedColor, setSelectedColor] = useState<CSSProperties['color']>();

    const popupRef = useRef<PopupRef>(null);

    useEffect(() => {
        if (color) {
            setSelectedColor(color);
        }
    }, [color]);

    const handleColorChange = (colorToSelect: CSSProperties['color']) => {
        setSelectedColor(colorToSelect);
    };

    const label = useMemo(() => {
        if (shouldShowHexCode) {
            return `#${color ?? ''}`;
        }

        return 'hallo';
    }, [color, shouldShowHexCode]);

    popupRef.current?.show();

    return useMemo(
        () => (
            <StyledColorPicker>
                <Popup
                    ref={popupRef}
                    content={<ColorPickerContent onColorChange={handleColorChange} />}
                >
                    <StyledColorPickerLabelWrapper>
                        <StyledColorPickerDot color={selectedColor} />
                        <StyledColorPickerLabel>{label}</StyledColorPickerLabel>
                    </StyledColorPickerLabelWrapper>
                </Popup>
            </StyledColorPicker>
        ),
        [label, selectedColor]
    );
};

ColorPicker.displayName = 'ColorPicker';

export default ColorPicker;
