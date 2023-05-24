import styled from 'styled-components';
import type { WithTheme } from '../../color-scheme-provider/ColorSchemeProvider';

export const StyledColorArea = styled.div`
    height: 150px;
    width: 300px;
    position: relative;
    user-select: none;
    overflow: hidden;
    cursor: crosshair;
    margin: 11px 11px 5px 11px;
`;

export const StyledColorAreaCanvas = styled.canvas`
    user-select: none;
`;

type StyledColorAreaPointerProps = WithTheme<{ top: number; left: number }>;

export const StyledColorAreaPointer = styled.canvas<StyledColorAreaPointerProps>`
    position: absolute;
    border-radius: 100%;
    border: 2px solid white;
    width: 20px;
    height: 20px;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5), 0 0 3px 0 rgba(0, 0, 0, 0.5) inset;
    pointer-events: none;
    will-change: ${({ top, left }) => `${top}, ${left}`};
    user-select: none;
`;
