import React, { useContext } from 'react';
import { ColorPickerContext } from '../../../ColorPickerProvider';
import { StyledColorPreview, StyledColorPreviewColor } from './ColorPreview.styles';

const ColorPreview = () => {
    const { selectedColor } = useContext(ColorPickerContext);

    return (
        <StyledColorPreview>
            <StyledColorPreviewColor $color={selectedColor} />
        </StyledColorPreview>
    );
};

ColorPreview.displayName = 'ColorPreview';

export default ColorPreview;
