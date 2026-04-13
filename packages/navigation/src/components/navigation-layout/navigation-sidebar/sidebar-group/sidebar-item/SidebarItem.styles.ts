import { css, styled } from 'styled-components';
import { motion } from 'motion/react';
import { WithTheme } from '@chayns-components/core';
import { Coordinates } from './SidebarItem.utils';

export const StyledSidebarItem = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

type StyledSidebarItemHeadProps = WithTheme<{
    $shouldHighlight: boolean;
    $hasDisabledReason: boolean;
    $isDisabled?: boolean;
}>;

export const StyledSidebarItemHead = styled.div<StyledSidebarItemHeadProps>`
    height: 42px;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;

    opacity: ${({ $isDisabled }) => ($isDisabled ? 0.5 : 1)};

    ${({ $isDisabled, $hasDisabledReason }) => {
        if ($isDisabled && $hasDisabledReason) {
            return css`
                cursor: help;
            `;
        }

        if ($isDisabled) {
            return css`
                cursor: default;
            `;
        }

        return css`
            cursor: pointer;
        `;
    }}

    ${({ $shouldHighlight }) =>
        $shouldHighlight &&
        css`
            background-color: rgba(30, 30, 30, 0.3);
        `}
`;

export const StyledSidebarItemHeadContent = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    min-width: 0;
`;

type StyledSidebarItemPopupProps = WithTheme<{
    $coordinates: Coordinates;
}>;

export const StyledSidebarItemPopup = styled.div<StyledSidebarItemPopupProps>`
    position: absolute;
    pointer-events: none;
    opacity: 1;
    background-color: ${({ theme }) => theme['000']};
    color: ${({ theme }) => theme.text};
    border-radius: 4px;

    min-height: 30px;
    padding: 0 10px;
    transition: opacity 0.3s;
    display: flex;
    align-items: center;
    z-index: 2;
    white-space: nowrap;

    box-shadow: 1px 3px 8px rgb(0, 0, 0, 0.3);
    border: 1px solid rgba(0, 0, 0, 0.15);

    top: ${({ $coordinates }) => $coordinates.y}px;
    left: ${({ $coordinates }) => $coordinates.x}px;
    transform: translateY(-50%);
`;

export const StyledSidebarItemIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1;
    height: 100%;
`;

export const StyledMotionSidebarOpenIcon = styled(motion.div)`
    height: 30px;
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
`;

export const StyledSidebarItemIconImage = styled.img`
    width: 28px;
`;

export const StyledSidebarItemLabel = styled.div`
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;

    flex: 1;
    min-width: 0;
`;

export const StyledSidebarItemChildren = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding-top: 2px;

    padding-left: 8px;
`;
