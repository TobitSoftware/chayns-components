import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import type { FramerMotionBugFix, WithTheme } from '../color-scheme-provider/ColorSchemeProvider';
import type { ButtonProps } from './Button';

type StyledButtonProps = ButtonProps &
    WithTheme<{
        hasIcon: boolean;
        hasChildren: boolean;
    }>;

export const StyledButton = styled.button<StyledButtonProps>`
    align-items: center;
    background-color: ${({ isSecondary, theme }: StyledButtonProps) =>
        isSecondary ? theme['202'] : theme['408']};
    border-radius: 3px;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
    border: none;
    color: ${({ isSecondary, theme }: StyledButtonProps) => (isSecondary ? theme.text : 'white')};
    cursor: pointer;
    display: inline-flex;
    line-height: 1.15;
    min-height: 32px;
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
    position: relative;
    user-select: none;
    transition: opacity 0.3s ease;

    ${({ hasIcon, hasChildren }) => {
        if (hasIcon) {
            if (hasChildren) {
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
