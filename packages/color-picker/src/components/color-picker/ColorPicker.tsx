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

const ColorPicker: FC<ColorPickerProps> = ({
    color = 'rgba(222, 225, 24, 255)',
    shouldShowColorPrefix,
    shouldShowHexCode,
}) => {
    const [selectedColor, setSelectedColor] = useState<CSSProperties['color']>(
        'rgba(255, 255, 255, 255)'
    );

    useEffect(() => {
        if (color) {
            setSelectedColor(color);
        }
    }, [color]);

    const handleColorChange = (colorToSelect: CSSProperties['color']) => {
        setSelectedColor(colorToSelect);
    };

    console.log('selectedColor', selectedColor);

    const label = useMemo(() => {
        if (shouldShowHexCode) {
            return `#${color ?? ''}`;
        }

        return selectedColor;
    }, [color, selectedColor, shouldShowHexCode]);

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
                    <StyledColorPickerDot color={selectedColor} />
                    <StyledColorPickerLabel>{label}</StyledColorPickerLabel>
                </StyledColorPickerLabelWrapper>
                <ColorPickerContent onColorChange={handleColorChange} color={selectedColor} />
                {/* </Popup> */}
            </StyledColorPicker>
        ),
        [label, selectedColor]
    );
};

ColorPicker.displayName = 'ColorPicker';

export default ColorPicker;
