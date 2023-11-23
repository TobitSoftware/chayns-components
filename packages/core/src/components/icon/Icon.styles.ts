import type { MouseEventHandler } from 'react';
import styled, { css } from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';
import type { IconProps } from './Icon';

type StyledIconWrapperProps = {
    isDisabled?: boolean;
    onClick?: MouseEventHandler<HTMLSpanElement>;
    size: number;
};

export const StyledIconWrapper = styled.span<StyledIconWrapperProps>`
    align-items: center;
    cursor: ${({ isDisabled, onClick }) =>
        typeof onClick === 'function' && !isDisabled ? 'pointer' : 'inherit'};
    display: inline-flex;
    height: ${({ size }) => `${size}px`};
    justify-content: center;
    opacity: ${({ isDisabled }) => (isDisabled ? 0.5 : 1)};
    position: relative;
    transition: opacity 0.3s ease;
    min-width: ${({ size }) => `${size}px`};
`;

type StyledIconProps = Omit<IconProps, 'icons'> &
    WithTheme<{
        fontSize: number;
        isStacked?: boolean;
    }>;

export const StyledIcon = styled.i<StyledIconProps>`
    color: ${({ color, theme }: StyledIconProps) => color || theme.headline};
    display: ${({ isStacked }) => (isStacked ? undefined : 'inline-flex')};
    font-size: ${({ fontSize }) => `${fontSize}px`};

    ${({ fontSize, size }) =>
        fontSize !== size &&
        css`
            top: 50%;
            transform: translateY(-50%);
        `}
`;
