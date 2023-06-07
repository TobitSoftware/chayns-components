import React, { CSSProperties, FC, useMemo, useState } from 'react';
import ColorArea from './color-area/ColorArea';
import { StyledColorPickerContent } from './ColorPickerContent.styles';

export type ColorPickerContentProps = {
    onColorChange: (color: CSSProperties['color']) => void;
    color: CSSProperties['color'];
};

const ColorPickerContent: FC<ColorPickerContentProps> = ({ onColorChange, color }) => {
    const [selectedColor, setSelectedColor] = useState<CSSProperties['color']>();

    return useMemo(
        () => (
            <StyledColorPickerContent>
                <ColorArea onChange={onColorChange} color={color} />
                {/* <Slider /> */}
            </StyledColorPickerContent>
        ),
        [color, onColorChange]
    );
};

ColorPickerContent.displayName = 'ColorPickerContent';

export default ColorPickerContent;
