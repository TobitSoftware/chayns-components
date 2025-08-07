import { motion } from 'motion/react';
import styled, { css } from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

type StyledButtonProps = WithTheme<{
    $hasIcon: boolean;
    $hasChildren: boolean;
    $isDisabled?: boolean;
    $isSecondary?: boolean;
    $shouldShowTextAsRobotoMedium: boolean;
    $shouldShowAsSelectButton: boolean;
    $shouldShowWaitCursor?: boolean;
}>;

export const StyledMotionButton = styled(motion.button)<StyledButtonProps>`
    ${({ $shouldShowTextAsRobotoMedium, $shouldShowAsSelectButton }) =>
        $shouldShowTextAsRobotoMedium &&
        !$shouldShowAsSelectButton &&
        css`
            font-size: 110%;
            font-family: 'Roboto Medium', serif;
        `}

    align-items: center;

    ${({ $isSecondary, $shouldShowAsSelectButton, theme }: StyledButtonProps) => {
        if ($isSecondary || $shouldShowAsSelectButton) {
            return css`
                color: ${theme.text};
            `;
        }

        return css`
            color: ${theme.buttonDesign === '2'
                ? (theme.buttonColor ?? theme.buttonBackgroundColor ?? 'white')
                : (theme.buttonColor ?? 'white')};
        `;
    }}

    ${({ theme, $isSecondary, $shouldShowAsSelectButton }: StyledButtonProps) => {
        if (theme.buttonDesign === '2' && !$shouldShowAsSelectButton) {
            return css`
                border: 1px solid ${$isSecondary ? theme['202'] : theme.buttonBackgroundColor};
                box-shadow: none;
            `;
        }

        return css`
            border: none;
            box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
        `;
    }}

    border-radius: 3px;
    cursor: ${({ $isDisabled }) => ($isDisabled ? 'default' : 'pointer')};
    display: inline-flex;
    flex: 0 0 auto;
    line-height: 22px;
    min-height: 32px;
    position: relative;
    user-select: none;
    width: fit-content;

    ${({ $hasIcon, $hasChildren, $shouldShowWaitCursor }) => {
        if ($shouldShowWaitCursor) {
            return css`
                padding: 4px 12px;
            `;
        }

        if ($hasIcon) {
            if ($hasChildren) {
                return css`
                    padding: 6px 12px 6px 42px;
                `;
            }
            return css`
                padding: 6px 12px 6px 18px;
            `;
        }
        return css`
            padding: 6px 12px 6px 12px;
        `;
    }}
`;

export const StyledIconWrapper = styled.span`
    align-items: center;
    background-color: rgba(255, 255, 255, 0.2);
    bottom: 0;
    display: flex;
    justify-content: center;
    left: 0;
    position: absolute;
    top: 0;
    width: 30px;
`;

export const StyledMotionChildrenWrapper = styled(motion.div)`
    will-change: unset !important;
`;

export const StyledMotionWaitCursorWrapper = styled(motion.div)`
    align-items: center;
    display: flex;
    justify-content: center;
`;
