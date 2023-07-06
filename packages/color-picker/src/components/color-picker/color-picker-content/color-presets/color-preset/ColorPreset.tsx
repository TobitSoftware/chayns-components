import React, { CSSProperties, FC, useMemo } from 'react';
import { StyledColorPreset } from './ColorPresent.styles';

export type ColorPresentProps = {
    id: number;
    color: CSSProperties['color'];
    onClick: (color: CSSProperties['color']) => void;
};

const ColorPreset: FC<ColorPresentProps> = ({ color, id, onClick }) => {
    const handleClick = () => {
        onClick(color);
    };

    return useMemo(
        () => <StyledColorPreset key={id} color={color} onClick={handleClick} />,
        [color, handleClick, id]
    );
};

ColorPreset.displayName = 'ColorPresent';

export default ColorPreset;
