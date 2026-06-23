import styled from 'styled-components';
import { WithTheme } from '@chayns-components/core';

export const StyledSystemMessage = styled.div<WithTheme<unknown>>`
    background-color: ${({ theme }) => theme['101']};

    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    position: relative;

    padding: 2px 12px;
    text-align: center;

    margin: 0 auto;
    width: fit-content;

    color: ${({ theme }) => `rgba(${theme['text-rgb'] ?? ''}, .75)`};
    font-size: 75%;
`;
