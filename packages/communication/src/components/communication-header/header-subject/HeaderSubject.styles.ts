import styled from 'styled-components';
import { WithTheme } from '@chayns-components/core';

export const StyledHeaderSubject = styled.div`
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;

    h2 {
        margin: 0;
    }
`;

export const StyledHeaderSubjectTitle = styled.h2<WithTheme<unknown>>`
    overflow: hidden;

    color: ${({ theme }) => theme.text};

    min-width: 0;
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const StyledHeaderSubjectFullScreenWrapper = styled.div<WithTheme<unknown>>`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    aspect-ratio: 1;
    padding: 6px;

    border-radius: 4px;

    &:hover {
        background-color: ${({ theme }) => theme['201']};
    }
`;
