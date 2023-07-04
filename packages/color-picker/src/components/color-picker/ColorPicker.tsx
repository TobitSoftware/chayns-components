import React, { CSSProperties, FC, useEffect, useMemo, useState } from 'react';
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

const ColorPicker: FC<ColorPickerProps> = ({ color = 'rgba(116, 116, 20, 1)' }) => {
    const [internalColor, setInternalColor] =
        useState<CSSProperties['color']>('rgba(255, 255, 255, 1)');

    useEffect(() => {
        console.log('hallo');
        if (color) {
            setInternalColor(color);
        }
    }, [color]);

    const handleColorChange = (colorToSelect: CSSProperties['color']) => {
        setInternalColor(colorToSelect);
    };

    const label = useMemo(() => internalColor, [internalColor]);

    return useMemo(
        () => (
            <StyledColorPicker>
                {/* <Popup */}
                {/*    content={ */}
                {/*        <ColorPickerContent */}
                {/*            onColorChange={handleColorChange} */}
                {/*            color={selectedColor} */}
                {/*        /> */}
                {/*    } */}
                {/* > */}
                <StyledColorPickerLabelWrapper>
                    <StyledColorPickerDot color={internalColor} />
                    <StyledColorPickerLabel>{label}</StyledColorPickerLabel>
                </StyledColorPickerLabelWrapper>
                <ColorPickerContent color={internalColor} onChange={handleColorChange} />
                {/* </Popup> */}
            </StyledColorPicker>
        ),
        [internalColor, label]
    );
};

ColorPicker.displayName = 'ColorPicker';

export default ColorPicker;
