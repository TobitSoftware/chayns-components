import React, { CSSProperties, FC, ReactElement, useMemo } from 'react';
import { colorPresents } from '../../../../constants/color';
import ColorPreset from './color-preset/ColorPreset';
import { StyledColorPresets } from './ColorPresents.styles';

export type ColorPresentsProps = {
    onClick: (color: CSSProperties['color']) => void;
};

const ColorPresets: FC<ColorPresentsProps> = ({ onClick }) => {
    const content = useMemo(() => {
        const items: ReactElement[] = colorPresents.map(({ color: presentColor, id }) => (
            <ColorPreset id={id} color={presentColor} onClick={onClick} />
        ));

        return items;
    }, [onClick]);

    return useMemo(() => <StyledColorPresets>{content}</StyledColorPresets>, [content]);
};

ColorPresets.displayName = 'ColorPresents';

export default ColorPresets;
