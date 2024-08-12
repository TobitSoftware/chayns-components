import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import type { WithTheme } from '../../color-scheme-provider/ColorSchemeProvider';

type StyledListItemProps = WithTheme<{
    $isClickable: boolean;
    $isOpen: boolean;
    $isWrapped: boolean;
    $shouldShowSeparatorBelow: boolean;
}>;

export const StyledMotionListItem = styled(motion.div)<StyledListItemProps>`
    ${({ $isOpen, theme }) =>
        $isOpen &&
        css`
            background-color: rgba(${theme['100-rgb']}, ${theme.cardBackgroundOpacity});
        `}

    overflow: hidden;
    transition: background-color 0.3s ease;

    ${({ $isClickable, theme }) =>
        $isClickable &&
        css`
            &&:hover {
                background-color: rgba(${theme['100-rgb']}, ${theme.cardBackgroundOpacity});
            }
        `}
    
    ${({ $shouldShowSeparatorBelow, theme }: StyledListItemProps) =>
        ($shouldShowSeparatorBelow || theme.accordionLines) &&
        css`
            &&:not(:last-child) {
                border-bottom: ${$shouldShowSeparatorBelow ? '4px' : '1px'} solid
                    rgba(${theme['headline-rgb']}, 0.5);
            }
        `}}

    ${({ $isWrapped }) =>
        $isWrapped &&
        css`
            padding-left: 26px;
        `}
`;
