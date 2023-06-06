import React, { CSSProperties, FC, useMemo, useState } from 'react';
import ColorArea from './color-area/ColorArea';
import { StyledColorPickerContent } from './ColorPickerContent.styles';

export type ColorPickerContentProps = {
    onColorChange: (color: CSSProperties['color']) => void;
};

const ColorPickerContent: FC<ColorPickerContentProps> = ({ onColorChange }) => {
    const [selectedColor, setSelectedColor] = useState<CSSProperties['color']>();

    return useMemo(
        () => (
            <StyledColorPickerContent>
                <ColorArea />
                {/* <Slider /> */}
            </StyledColorPickerContent>
        ),
        []
    );
};

ColorPickerContent.displayName = 'ColorPickerContent';

export default ColorPickerContent;
