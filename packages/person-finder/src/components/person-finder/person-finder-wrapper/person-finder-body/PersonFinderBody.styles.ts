import styled from 'styled-components';
import { WithTheme } from '@chayns-components/core';

export const StyledPersonFinderBody = styled.div<{ $shouldRenderInline?: boolean }>`
    display: flex;
    flex-direction: column;
    height: ${({ $shouldRenderInline }) => ($shouldRenderInline ? 'auto' : '300px')};
`;

type StyledPersonFinderBodyContentProps = WithTheme<unknown>;

export const StyledPersonFinderBodyContent = styled.div<StyledPersonFinderBodyContentProps>`
    height: 100%;
    overflow-y: auto;
    padding-bottom: 10px;
`;
