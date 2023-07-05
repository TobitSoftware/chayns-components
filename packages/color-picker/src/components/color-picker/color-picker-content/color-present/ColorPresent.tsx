import React, { CSSProperties, FC, useMemo } from 'react';
import { StyledColorPresent } from './ColorPresent.styles';

export type ColorPresentProps = {
    id: number;
    color: CSSProperties['color'];
    onClick: (color: CSSProperties['color']) => void;
};

const ColorPresent: FC<ColorPresentProps> = ({ color, id, onClick }) => {
    const handleClick = () => {
        onClick(color);
    };

    return useMemo(
        () => <StyledColorPresent key={id} color={color} onClick={handleClick} />,
        [color, id, onClick]
    );
};

ColorPresent.displayName = 'ColorPresent';

export default ColorPresent;
