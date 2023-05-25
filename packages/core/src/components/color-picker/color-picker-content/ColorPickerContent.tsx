import React, { CSSProperties, FC, useMemo, useState } from 'react';
import { StyledColorPickerContent } from './ColorPickerContent.styles';

export type ColorPickerContentProps = {
    onColorChange: (color: CSSProperties['color']) => void;
};

const ColorPickerContent: FC<ColorPickerContentProps> = ({ onColorChange }) => {
    const [selectedColor, setSelectedColor] = useState<CSSProperties['color']>();

    return useMemo(() => <StyledColorPickerContent>test</StyledColorPickerContent>, []);
};

ColorPickerContent.displayName = 'ColorPickerContent';

export default ColorPickerContent;
