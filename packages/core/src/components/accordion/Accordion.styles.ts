import { motion } from 'motion/react';
import styled, { css } from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

type StyledMotionAccordionProps = WithTheme<{
    $isOpen: boolean;
    $isParentWrapped?: boolean;
    $isWrapped?: boolean;
    $shouldForceBackground?: boolean;
    $shouldHideBackground?: boolean;
    $shouldShowLines?: boolean;
    $shouldHideBottomLine: boolean;
}>;

export const StyledMotionAccordion = styled(motion.div)<StyledMotionAccordionProps>`
    ${({
        $isOpen,
        $isWrapped,
        $shouldForceBackground,
        $shouldHideBackground,
        theme,
    }: StyledMotionAccordionProps) =>
        ($isOpen || $shouldForceBackground) &&
        !$isWrapped &&
        !$shouldHideBackground &&
        css`
            background-color: rgba(${theme['100-rgb']}, ${theme.cardBackgroundOpacity});
            border-radius: ${theme.cardBorderRadius}px;
            box-shadow: 0 2px 6px 0 rgba(0, 0, 0, ${theme.cardShadow});
        `}

    ${({ theme }: StyledMotionAccordionProps) =>
        theme.accordionLines &&
        css`
            border-bottom: 1px solid transparent;
        `}

    margin-bottom: ${({ $isOpen, $isWrapped }: StyledMotionAccordionProps) =>
        $isOpen && !$isWrapped ? '30px' : '0px'};
    transition:
        background-color 0.3s ease,
        border-bottom-color 0.3s ease,
        border-radius 0.3s ease,
        box-shadow 0.3s ease,
        margin-bottom 0.3s ease;
    will-change: unset !important;

    margin-top: 10px;

    ${({
        $isOpen,
        $isWrapped,
        $shouldForceBackground,
        $shouldShowLines,
        $shouldHideBottomLine,
        theme,
    }: StyledMotionAccordionProps) => {
        if ($shouldForceBackground || $shouldHideBottomLine) return undefined;

        if (theme.accordionLines) {
            if ($isWrapped && $shouldShowLines) {
                return css`
                    border-bottom-color: rgba(${theme['headline-rgb']}, 1);
                `;
            }

            if (!$isOpen && $shouldShowLines) {
                return css`
                    border-bottom-color: rgba(${theme['headline-rgb']}, 1);
                `;
            }
        }

        return undefined;
    }}
    ${({ $isParentWrapped }: StyledMotionAccordionProps) =>
        $isParentWrapped &&
        css`
            padding-left: 17px;
        `}
    ${({ $isWrapped }: StyledMotionAccordionProps) =>
        !$isWrapped
            ? css`
                  margin-top: 5px;
              `
            : css`
                  margin: 0;
              `}
    ${({ $isWrapped, $shouldHideBackground, theme }: StyledMotionAccordionProps) =>
        !$isWrapped &&
        !$shouldHideBackground &&
        css`
            &:hover {
                background-color: rgba(${theme['100-rgb']}, ${theme.cardBackgroundOpacity});
            }
        `};
`;
