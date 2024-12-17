import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import type { WithTheme } from '../../color-scheme-provider/ColorSchemeProvider';

type StyledListItemProps = WithTheme<{
    $isClickable: boolean;
    $isOpen: boolean;
    $isInAccordion: boolean;
    $isWrapped: boolean;
    $shouldHideIndicator: boolean;
    $shouldForceBackground?: boolean;
    $shouldShowSeparatorBelow: boolean;
    $shouldHideBottomLine: boolean;
}>;

export const StyledMotionListItem = styled(motion.div)<StyledListItemProps>`
    overflow: hidden;
    transition: background-color 0.3s ease;

    ${({ $isInAccordion, $shouldHideIndicator }: StyledListItemProps) =>
        $isInAccordion &&
        css`
            padding-left: ${$shouldHideIndicator ? '16px' : '8px'};
        `}

    ${({ $isInAccordion, $isOpen,$shouldForceBackground, theme }) =>
        ((!$isInAccordion &&
        $isOpen) || $shouldForceBackground) &&
        css`
            background-color: rgba(${theme['100-rgb']}, ${theme.cardBackgroundOpacity});
        `}

    ${({ $isClickable, $isInAccordion, theme }) =>
        $isClickable &&
        !$isInAccordion &&
        css`
            &&:hover {
                background-color: rgba(${theme['100-rgb']}, ${theme.cardBackgroundOpacity});
            }
        `}
    
    ${({
        $isOpen,
        $isInAccordion,
        $isWrapped,
        $shouldShowSeparatorBelow,
           $shouldHideBottomLine,
        theme,
    }: StyledListItemProps) =>
        ($shouldShowSeparatorBelow ||
            ((!$isOpen || $isWrapped || $isInAccordion) && (theme.accordionLines && !$shouldHideBottomLine))) &&
        css`
            &&:not(:last-child) {
                border-bottom: ${$shouldShowSeparatorBelow ? '4px' : '1px'} solid
                    rgba(${theme['headline-rgb']}, 0.5);
            }
        `}

    ${({ $isWrapped }) =>
        $isWrapped &&
        css`
            padding-left: 26px;
        `}
`;
