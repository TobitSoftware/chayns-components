import React, { useContext } from 'react';
import { ColorPickerContext } from '../../../ColorPickerProvider';
import {
    StyledColorPreview,
    StyledColorPreviewBackground,
    StyledColorPreviewColor,
} from './ColorPreview.styles';

const ColorPreview = () => {
    const { tmpColor } = useContext(ColorPickerContext);

    return (
        <StyledColorPreview>
            <StyledColorPreviewBackground />
            <StyledColorPreviewColor $color={tmpColor} />
        </StyledColorPreview>
    );
};

ColorPreview.displayName = 'ColorPreview';

export default ColorPreview;
