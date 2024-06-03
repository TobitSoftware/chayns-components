import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import type { FramerMotionBugFix, WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

type StyledButtonProps = WithTheme<{
    $hasIcon: boolean;
    $hasChildren: boolean;
    $isDisabled?: boolean;
    $isSecondary?: boolean;
    $ShouldShowTextAsRobotoMedium: boolean;
}>;

export const StyledMotionButton = styled(motion.button)<StyledButtonProps>`
    ${({ $ShouldShowTextAsRobotoMedium }) =>
        $ShouldShowTextAsRobotoMedium &&
        css`
            font-size: 110%;
            font-family: 'Roboto Medium', serif;
        `}

    align-items: center;

    ${({ $isSecondary, theme }: StyledButtonProps) => {
        if ($isSecondary) {
            return css`
                color: ${theme.text};
            `;
        }

        return css`
            color: ${theme.buttonDesign === '2'
                ? theme.buttonColor ?? theme.buttonBackgroundColor ?? 'white'
                : theme.buttonColor ?? 'white'};
        `;
    }}

    ${({ theme, $isSecondary }: StyledButtonProps) => {
        if (theme.buttonDesign === '2') {
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
    line-height: 1.15;
    min-height: 32px;
    opacity: ${({ $isDisabled }) => ($isDisabled ? 0.5 : 1)};
    position: relative;
    user-select: none;
    transition: opacity 0.3s ease;

    ${({ $hasIcon, $hasChildren }) => {
        if ($hasIcon) {
            if ($hasChildren) {
                return css`
                    padding: 7px 12px 7px 42px;
                `;
            }
            return css`
                padding: 7px 12px 7px 18px;
            `;
        }
        return css`
            padding: 7px 12px 7px 12px;
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

export const StyledMotionChildrenWrapper = styled(motion.div)<FramerMotionBugFix>``;

export const StyledMotionWaitCursorWrapper = styled(motion.div)<FramerMotionBugFix>`
    align-items: center;
    display: flex;
    justify-content: center;
`;
