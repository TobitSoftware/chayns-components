import React, { CSSProperties, FC, useMemo, useState } from 'react';
import { StyledColorArea } from './ColorArea.styles';

export type ColorAreaProps = {
    onChange: (colorToSelect: CSSProperties['color']) => void;
};

const ColorArea: FC<ColorAreaProps> = ({ onChange }) => {
    const [selectedColor, setSelectedColor] = useState<CSSProperties['color']>();

    return useMemo(() => <StyledColorArea>test</StyledColorArea>, []);
};

ColorArea.displayName = 'ColorArea';

export default ColorArea;
