import styled, { css } from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

type StyledActionMenuButtonProps = WithTheme<{
    $shouldUseFullWidth?: boolean;
}>;

export const StyledActionMenuButton = styled.div<StyledActionMenuButtonProps>`
    display: inline-flex;
    gap: 1px;
    height: 42px;
    width: ${({ $shouldUseFullWidth }) => ($shouldUseFullWidth ? '100%' : 'auto')};
`;

type StyledActionMenuButtonActionProps = WithTheme<{
    $hasIcon: boolean;
    $isDisabled?: boolean;
    $isSplit?: boolean;
}>;

export const StyledActionMenuButtonAction = styled.button<StyledActionMenuButtonActionProps>`
    align-items: center;
    background-color: rgba(30, 30, 30, 0.25);
    border-bottom-left-radius: 21px;
    border-top-left-radius: 21px;
    color: ${({ theme }) => theme.buttonColor ?? 'white'};
    cursor: ${({ $isDisabled }) => ($isDisabled ? 'default' : 'pointer')};
    display: flex;
    flex: 1 1 0;
    gap: 5px;
    opacity: ${({ $isDisabled }) => ($isDisabled ? 0.5 : 1)};
    padding: ${({ $hasIcon }) => ($hasIcon ? '0 16px 0 0' : '0 16px')};
    transition: background-color 0.2s ease;

    &:hover {
        background-color: ${({ $isDisabled }) =>
            $isDisabled ? 'rgba(30, 30, 30, 0.25)' : 'rgba(30, 30, 30, 0.35)'};
    }

    ${({ $isSplit }) =>
        !$isSplit &&
        css`
            border-bottom-right-radius: 21px;
            border-top-right-radius: 21px;
        `}
`;

export const StyledActionMenuButtonActionIcon = styled.div`
    display: flex;
    justify-content: center;
    width: 42px;
`;

export const StyledActionMenuButtonActionLabel = styled.span`
    flex: 1 1 auto;
`;

type StyledActionMenuButtonMenuProps = WithTheme<{
    $isDisabled?: boolean;
    $isSplit?: boolean;
}>;

export const StyledActionMenuButtonMenu = styled.button<StyledActionMenuButtonMenuProps>`
    align-items: center;
    background-color: rgba(30, 30, 30, 0.25);
    border-bottom-right-radius: 21px;
    border-top-right-radius: 21px;
    color: ${({ theme }) => theme.buttonColor ?? 'white'};
    cursor: ${({ $isDisabled }) => ($isDisabled ? 'default' : 'pointer')};
    display: flex;
    flex: 0 0 auto;
    opacity: ${({ $isDisabled }) => ($isDisabled ? 0.5 : 1)};
    padding: 0 1px 0 0;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: ${({ $isDisabled }) =>
            $isDisabled ? 'rgba(30, 30, 30, 0.25)' : 'rgba(30, 30, 30, 0.35)'};
    }
`;
