import React, { CSSProperties, FC, ReactElement, useMemo } from 'react';
import { colorPresents } from '../../../../constants/color';
import ColorPresent from './color-present/ColorPresent';
import { StyledColorPresents } from './ColorPresents.styles';

export type ColorPresentsProps = {
    onClick: (color: CSSProperties['color']) => void;
};

const ColorPresents: FC<ColorPresentsProps> = ({ onClick }) => {
    const content = useMemo(() => {
        const items: ReactElement[] = colorPresents.map(({ color: presentColor, id }) => (
            <ColorPresent id={id} color={presentColor} onClick={onClick} />
        ));

        return items;
    }, [onClick]);

    return useMemo(() => <StyledColorPresents>{content}</StyledColorPresents>, [content]);
};

ColorPresents.displayName = 'ColorPresents';

export default ColorPresents;
