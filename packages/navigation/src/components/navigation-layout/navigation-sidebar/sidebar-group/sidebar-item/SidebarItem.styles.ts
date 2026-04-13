import { css, styled } from 'styled-components';
import { motion } from 'motion/react';
import { WithTheme } from '@chayns-components/core';

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
