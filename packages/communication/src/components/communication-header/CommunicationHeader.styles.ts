import styled from 'styled-components';
import { WithTheme } from '@chayns-components/core';

export const StyledCommunicationHeader = styled.div<WithTheme<unknown>>`
    width: 100%;
    padding: 8px 16px;

    display: flex;
    flex-direction: column;
    gap: 2px;

    border-bottom: ${({ theme }) => `1px solid rgba(${theme['text-rgb'] ?? ''}, 0.1)`};
`;
