import styled from 'styled-components';
import type { ButtonProps } from './Button';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

type StyledButtonProps = ButtonProps &
    WithTheme<{
        hasIcon: boolean;
    }>;

export const StyledButton = styled.button<StyledButtonProps>`
    background-color: ${({ isSecondary, theme }: StyledButtonProps) =>
        isSecondary ? theme['202'] : theme['408']};
    border-radius: 3px;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
    border: none;
    color: ${({ isSecondary, theme }: StyledButtonProps) => (isSecondary ? theme.text : 'white')};
    cursor: pointer;
    display: inline-block;
    line-height: 1.15;
    min-height: 30px;
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
    padding: ${({ hasIcon }) => `7px 12px 7px ${hasIcon ? '42px' : '12px'}`};
    position: relative;
    user-select: none;
    transition: opacity 0.3s ease;
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
