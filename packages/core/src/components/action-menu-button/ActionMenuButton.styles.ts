import styled, { css } from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

type StyledActionMenuButtonProps = WithTheme<{
    $shouldUseFullWidth?: boolean;
}>;

export const StyledActionMenuButton = styled.div<StyledActionMenuButtonProps>`
    display: inline-flex;
    gap: 2px;
    height: 42px;
    width: ${({ $shouldUseFullWidth }) => ($shouldUseFullWidth ? '100%' : 'auto')};
`;

type StyledActionMenuButtonActionProps = WithTheme<{
    $isDisabled?: boolean;
    $isSplit?: boolean;
}>;

export const StyledActionMenuButtonAction = styled.button<StyledActionMenuButtonActionProps>`
    align-items: center;
    background-color: rgba(30, 30, 30, 0.2);
    border-bottom-left-radius: 21px;
    border-top-left-radius: 21px;
    color: ${({ theme }) => theme.buttonColor ?? 'white'};
    cursor: ${({ $isDisabled }) => ($isDisabled ? 'default' : 'pointer')};
    display: flex;
    flex: 1 1 0;
    gap: 10px;
    opacity: ${({ $isDisabled }) => ($isDisabled ? 0.5 : 1)};
    padding: 0 12px;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: ${({ $isDisabled }) =>
            $isDisabled ? 'rgba(30, 30, 30, 0.2)' : 'rgba(30, 30, 30, 0.25)'};
    }

    ${({ $isSplit }) =>
        !$isSplit &&
        css`
            border-bottom-right-radius: 21px;
            border-top-right-radius: 21px;
        `}
`;

type StyledActionMenuButtonMenuProps = WithTheme<{
    $isDisabled?: boolean;
    $isSplit?: boolean;
}>;

export const StyledActionMenuButtonMenu = styled.button<StyledActionMenuButtonMenuProps>`
    align-items: center;
    background-color: rgba(30, 30, 30, 0.2);
    border-bottom-right-radius: 21px;
    border-top-right-radius: 21px;
    color: ${({ theme }) => theme.buttonColor ?? 'white'};
    cursor: ${({ $isDisabled }) => ($isDisabled ? 'default' : 'pointer')};
    display: flex;
    flex: 0 0 auto;
    opacity: ${({ $isDisabled }) => ($isDisabled ? 0.5 : 1)};
    padding: 0 2px 0 0;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: ${({ $isDisabled }) =>
            $isDisabled ? 'rgba(30, 30, 30, 0.2)' : 'rgba(30, 30, 30, 0.25)'};
    }
`;
