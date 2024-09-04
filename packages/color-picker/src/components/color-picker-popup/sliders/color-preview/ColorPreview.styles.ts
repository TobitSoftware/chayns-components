import type { WithTheme } from '@chayns-components/core';
import type { Theme } from '@chayns-components/core/lib/types/components/color-scheme-provider/ColorSchemeProvider';
import styled from 'styled-components';

export const StyledColorPreview = styled.div`
    width: 40px;
    aspect-ratio: 1;
    position: relative;

    border-radius: 2px;
    overflow: hidden;
`;

export const StyledColorPreviewBackground = styled.div`
    position: absolute;
    background-color: #fff;
    background-image: linear-gradient(45deg, #a0a0a0 25%, #0000 0),
        linear-gradient(-45deg, #a0a0a0 25%, #0000 0), linear-gradient(45deg, #0000 75%, #a0a0a0 0),
        linear-gradient(-45deg, #0000 75%, #a0a0a0 0);
    background-position:
        0 0,
        0 4px,
        4px -4px,
        -4px 0;
    background-repeat: repeat;
    background-size: 8px 8px;
    height: 100%;
    width: 100%;
`;

type StyledColorPreviewColorProps = WithTheme<{ $color?: string }>;

export const StyledColorPreviewColor = styled.div.attrs<StyledColorPreviewColorProps>(
    ({ $color, theme }) => ({
        style: {
            backgroundColor: $color,
            border: `1px ${(theme as Theme).text} solid`,
        },
    }),
)`
    height: 100%;
    width: 100%;
    position: absolute;
`;
