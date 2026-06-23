import styled from 'styled-components';
import { WithTheme } from '@chayns-components/core';

export const StyledDateMessage = styled.div<WithTheme<unknown>>`
    background-color: ${({ theme }) => theme['201']};
    border: 1px solid ${({ theme }) => theme['203']};
    border-radius: 3px;
    color: ${({ theme }) => theme['305']};
    font-size: 80%;
    padding: 0 16px;

    width: fit-content;

    margin: 0 auto;
`;
