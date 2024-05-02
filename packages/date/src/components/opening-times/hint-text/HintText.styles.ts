import type { WithTheme } from '@chayns-components/core';
import styled from 'styled-components';

type StyledHintTextProp = WithTheme<unknown>;

export const StyledHintText = styled.div<StyledHintTextProp>`
    border-width: 1px;
    border-style: solid;
    border-color: #9f5f00;
    background-color: #fff3e0;
    color: #222;
    padding: 8px 12px;

    border-radius: ${({ theme }: StyledHintTextProp) => theme.cardBorderRadius}px;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, ${({ theme }: StyledHintTextProp) => theme.cardShadow});
`;
