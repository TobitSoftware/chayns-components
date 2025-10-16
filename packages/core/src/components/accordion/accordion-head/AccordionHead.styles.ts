import { motion } from 'motion/react';
import type { CSSProperties } from 'react';
import styled, { css } from 'styled-components';
import type { WithTheme } from '../../color-scheme-provider/ColorSchemeProvider';

type StyledMotionAccordionHeadProps = WithTheme<unknown>;

export const StyledMotionAccordionHead = styled(motion.div)<StyledMotionAccordionHeadProps>`
    align-items: center;
    color: ${({ theme }: StyledMotionAccordionHeadProps) => theme.text};
    display: flex;
    overflow: hidden;
    padding: 4px 0;
`;

export const StyledMotionIconWrapper = styled(motion.div)`
    align-items: center;
    cursor: ${({ onClick }) => (typeof onClick === 'function' ? 'pointer' : 'default')};
    display: flex;
    flex: 0 0 auto;
    height: 25px;
    justify-content: center;
    width: 25px;
`;

type StyledAccordionIconProps = WithTheme<{ $icon: string }>;

export const StyledAccordionIcon = styled.i<StyledAccordionIconProps>`
    align-items: center;
    justify-content: center;
    display: flex;
    color: ${({ theme }: StyledAccordionIconProps) => theme.iconColor || theme.headline};

    &:before {
        content: ${({ $icon }) => `"\\${$icon}"`};
        font-family: 'Font Awesome 6 Pro', Fontawesome !important;
    }
`;

type StyledMotionContentWrapperProps = WithTheme<{ $isWrapped: boolean }>;

export const StyledMotionContentWrapper = styled(motion.div)<StyledMotionContentWrapperProps>`
    align-self: flex-start;
    cursor: ${({ onClick }) => (typeof onClick === 'function' ? 'pointer' : 'default')};
    display: flex;
    flex: 1 1 auto;
    height: 100%;
    overflow: hidden;
    margin-right: 10px;

    ${({ $isWrapped }) =>
        $isWrapped &&
        css`
            align-items: center;
        `}
`;

export const StyledMotionTitleWrapper = styled(motion.div)`
    display: grid;
    flex: 0 1 auto;
    grid-template-areas: 'header';
`;

type StyledMotionTitleProps = WithTheme<{
    $isOpen: boolean;
    $isWrapped: boolean;
    $color?: CSSProperties['color'];
    $hasSearch: boolean;
}>;

export const StyledMotionTitle = styled(motion.div)<StyledMotionTitleProps>`
    font-size: ${({ $isOpen, $isWrapped }) => ($isOpen && !$isWrapped ? '1.3rem' : undefined)};
    font-weight: ${({ $isOpen, $isWrapped }) => ($isOpen && $isWrapped ? 700 : 'normal')};
    grid-area: header;
    height: ${({ $isWrapped, $hasSearch }) => ($isWrapped || $hasSearch ? '100%' : undefined)};
    overflow: hidden;
    text-overflow: ellipsis;
    transform-origin: top left;
    user-select: none;
    color: ${({ $color, theme }: StyledMotionTitleProps) => $color ?? theme.text};
    white-space: ${({ $isOpen, $isWrapped, $hasSearch }) =>
        $isOpen && !$isWrapped && !$hasSearch ? 'normal' : 'nowrap'};

    will-change: unset !important;

    ${({ $isWrapped }) =>
        $isWrapped &&
        css`
            align-content: center;
        `}
`;

export const StyledMotionTitleElementWrapper = styled(motion.div)`
    align-items: center;
    display: flex;
    flex: 1 1 auto;
    margin-left: 8px;
    min-width: 0;
`;

type StyledRightWrapperProps = {
    $isSearchActive: boolean;
};

export const StyledRightWrapper = styled.div<StyledRightWrapperProps>`
    display: flex;
    flex: 0 0 auto;
    gap: 8px;
    margin-right: 5px;
    overflow: hidden;
    position: relative;
`;

export const StyledMotionSearchWrapper = styled(motion.div)`
    align-items: center;
    justify-content: end;
    position: relative;
    display: flex;
    width: 100%;
`;

export const StyledMotionRightElementWrapper = styled(motion.div)`
    align-items: center;
    display: flex;

    cursor: ${({ onClick }) => (typeof onClick === 'function' ? 'pointer' : 'default')};

    will-change: unset !important;
`;

type StyledMotionRightInputProps = WithTheme<{
    $hasIcon: boolean;
}>;

export const StyledMotionRightInput = styled(motion.input)<StyledMotionRightInputProps>`
    background-color: transparent;
    border: 1px solid transparent;
    border-bottom-color: rgba(
        ${({ theme }: StyledMotionRightInputProps) => theme['headline-rgb']},
        0.45
    );
    color: ${({ theme }: StyledMotionRightInputProps) => theme.text};
    grid-area: header;
    padding: ${({ $hasIcon }) => ($hasIcon ? '5px 23px 5px 1px' : '5px 1px')};
`;

export const StyledMotionRightInputIconWrapper = styled(motion.div)`
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    position: absolute;
    right: 4px;
    top: 0;
`;
