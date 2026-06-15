import type { HTMLMotionProps } from 'motion/react';
import { motion } from 'motion/react';
import styled, { css } from 'styled-components';
import type { Theme } from '../../../color-scheme-provider/ColorSchemeProvider';

type StyledListItemHeadProps = HTMLMotionProps<'div'> & {
    $isClickable: boolean;
    $isAnyItemExpandable: boolean;
};

export const StyledListItemHead = styled.div<StyledListItemHeadProps>`
    //align-items: center;
    overflow: hidden;
    color: ${({ theme }: StyledListItemHeadProps & { theme: Theme }) => theme.text};
    display: flex;
    min-height: 64px;
    padding: 12px 9px;
    position: relative;
    width: 100%;
    justify-content: center;
    cursor: ${({ $isClickable }) => ($isClickable ? 'pointer' : 'default')};

    ${({ $isAnyItemExpandable }) =>
        !$isAnyItemExpandable &&
        css`
            padding-left: 12px;
        `}
`;

export const StyledListItemHeadLeftWrapper = styled.div`
    display: flex;
    align-items: center;
    margin: auto 0;
`;

export const StyledListItemHeadLeftElements = styled.div`
    display: flex;
    align-items: center;
`;

type StyledListItemHeadIndicatorProps = HTMLMotionProps<'div'>;

export const StyledListItemHeadIndicator = styled.div<StyledListItemHeadIndicatorProps>`
    align-items: center;
    display: flex;
    flex: 0 0 auto;
    height: 26px;
    justify-content: center;
    width: 26px;
`;

type StyledListItemHeadContentProps = {
    $isIconOrImageGiven: boolean;
    $isOpen: boolean;
};

export const StyledListItemHeadContent = styled.div<StyledListItemHeadContentProps>`
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    font-weight: ${({ $isOpen }) => ($isOpen ? 'bold' : 'normal')};
    justify-content: center;
    line-height: normal;
    margin-left: ${({ $isIconOrImageGiven }) => ($isIconOrImageGiven ? '10px' : undefined)};
    min-width: 0;
`;

type StyledListItemHeadTitleProps = HTMLMotionProps<'div'>;

export const StyledListItemHeadTitle = styled.div<StyledListItemHeadTitleProps>`
    align-items: center;
    display: flex;
    justify-content: space-between;
`;

export const StyledListItemHeadTitleContent = styled.div`
    align-items: center;
    display: flex;
    flex: 1 1 auto;
    max-width: 100%;
    min-width: 0;
    position: relative;
`;

export const StyledListItemHeadSubtitle = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-top: 2px;
`;

type StyledMotionListItemHeadHoverItemWrapperProps = {
    theme: Theme;
};

export const StyledMotionListItemHeadHoverItemWrapper = styled(
    motion.div,
)<StyledMotionListItemHeadHoverItemWrapperProps>`
    overflow: hidden;
    flex-shrink: 0;
    margin: auto 0;
    position: absolute;
    right: 0;

    background: ${({ theme }: StyledMotionListItemHeadHoverItemWrapperProps) =>
        `linear-gradient(to right, transparent 0px, rgb(${theme['000-rgb'] ?? ''}) 40px)`};
`;

export const StyledMotionListItemHeadHoverItem = styled.div`
    padding-left: 40px;
`;
