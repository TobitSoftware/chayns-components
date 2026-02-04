import { motion } from 'motion/react';
import styled, { css } from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

type StyledActionMenuButtonProps = WithTheme<{
    $shouldUseFullWidth?: boolean;
}>;

export const StyledMotionActionMenuButton = styled(motion.div)<StyledActionMenuButtonProps>`
    display: inline-flex;
    gap: 1px;
    height: 42px;
    overflow: hidden;
`;

type StyledActionMenuButtonActionProps = WithTheme<{
    $hasIcon: boolean;
    $isCollapsed?: boolean;
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
    transition:
        background-color 0.2s ease,
        border-bottom-right-radius 0.1s ease 0.1s,
        border-top-right-radius 0.1s ease 0.1s;
    width: 100%;

    &:hover {
        background-color: ${({ $isDisabled }) =>
            $isDisabled ? 'rgba(30, 30, 30, 0.25)' : 'rgba(30, 30, 30, 0.35)'};
    }

    ${({ $isCollapsed, $isSplit }) =>
        ($isCollapsed || !$isSplit) &&
        css`
            border-bottom-right-radius: 21px;
            border-top-right-radius: 21px;
        `}
`;

export const StyledActionMenuButtonActionIcon = styled.div`
    display: flex;
    flex: 0 0 auto;
    justify-content: center;
    width: 42px;
`;

export const StyledActionMenuButtonActionLabel = styled.span`
    flex: 1 1 auto;
    overflow: hidden;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

type StyledActionMenuButtonMenuProps = WithTheme<{
    $isCollapsed?: boolean;
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
    padding: 0 1px 0 0;
    transform: translateX(${({ $isCollapsed }) => ($isCollapsed ? 'calc(-100% - 8px)' : '0')});
    transition: background-color 0.2s ease;

    &:hover {
        background-color: ${({ $isDisabled }) =>
            $isDisabled ? 'rgba(30, 30, 30, 0.25)' : 'rgba(30, 30, 30, 0.35)'};
    }
`;
