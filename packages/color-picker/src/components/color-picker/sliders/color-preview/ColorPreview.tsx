import React, { useContext } from 'react';
import { ColorPickerContext } from '../../../ColorPickerProvider';
import {
    StyledColorPreview,
    StyledColorPreviewBackground,
    StyledColorPreviewColor,
} from './ColorPreview.styles';

const ColorPreview = () => {
    const { selectedColor } = useContext(ColorPickerContext);

    return (
        <StyledColorPreview>
            <StyledColorPreviewBackground />
            <StyledColorPreviewColor $color={selectedColor} />
        </StyledColorPreview>
    );
};

ColorPreview.displayName = 'ColorPreview';

export default ColorPreview;
