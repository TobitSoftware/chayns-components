import { WithTheme } from '@chayns-components/core';
import styled, { css } from 'styled-components';

type StyledDynamicToolbarItemButtonProps = WithTheme<{
    $isActive: boolean;
    $isDisabled: boolean;
}>;

export const StyledDynamicToolbarItemButton = styled.button<StyledDynamicToolbarItemButtonProps>`
    align-items: center;
    background: transparent;
    border: none;
    border-radius: 4px;
    cursor: ${({ $isDisabled }) => ($isDisabled ? 'default' : 'pointer')};
    display: flex;
    flex: 1 1 auto;
    justify-content: center;
    min-height: 40px;
    min-width: 0;
    opacity: ${({ $isDisabled }) => ($isDisabled ? 0.5 : 1)};
    padding: 8px;
    position: relative;
    transition:
        background 0.2s ease,
        opacity 0.2s ease;

    ${({ $isActive }) =>
        $isActive &&
        css`
            background: rgba(0, 0, 0, 0.15);
        `}
`;
