import React, { CSSProperties, FC, useMemo, useRef, useState } from 'react';
import { StyledColorArea, StyledColorAreaCanvas, StyledColorAreaPointer } from './ColorArea.styles';

export type ColorAreaProps = {
    color: CSSProperties['color'];
    onChange: (colorToSelect: CSSProperties['color']) => void;
};

const ColorArea: FC<ColorAreaProps> = ({ onChange, color }) => {
    const [selectedColor, setSelectedColor] = useState<CSSProperties['color']>();
    const [coordinates, setCoordinates] = useState();

    const areaRef = useRef<HTMLDivElement>();
    const canvasRef = useRef<HTMLCanvasElement>();

    return useMemo(
        () => (
            <StyledColorArea ref={areaRef}>
                <StyledColorAreaCanvas ref={canvasRef} />
                <StyledColorAreaPointer left={} top={} />
            </StyledColorArea>
        ),
        []
    );
};

ColorArea.displayName = 'ColorArea';

export default ColorArea;
