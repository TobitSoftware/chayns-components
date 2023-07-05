import type { WithTheme } from '@chayns-components/core';
import type { CSSProperties } from 'react';
import styled from 'styled-components';

type StyledColorPresentProps = WithTheme<{ color: CSSProperties['color'] }>;

export const StyledColorPresent = styled.div<StyledColorPresentProps>`
    background-color: ${({ color }) => color};
    border-radius: 50%;
    border-color: black;
    border-style: solid;
    border-width: 1px;
    height: 20px;
    width: 20px;
    cursor: pointer;
`;
