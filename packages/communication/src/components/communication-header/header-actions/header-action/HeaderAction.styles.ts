import styled, { css } from 'styled-components';
import { WithTheme } from '@chayns-components/core';

type StyledHeaderActionProps = WithTheme<{
    $shouldForceHover: boolean;
}>;

export const StyledHeaderAction = styled.div<StyledHeaderActionProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    cursor: pointer;

    position: relative;

    height: 24px;
    min-width: 24px;
    padding: 4px;

    white-space: nowrap;
    border-radius: 4px;

    ${({ $shouldForceHover, theme }) =>
        $shouldForceHover &&
        css`
            background-color: ${theme['201']};
        `}

    span:first-of-type {
        padding: 0;
    }

    .fa-slash {
        font-size: 12px !important;
    }

    &:hover {
        background-color: ${({ theme }) => theme['201']};
    }
`;

export const StyledHeaderActionLabel = styled.div``;
