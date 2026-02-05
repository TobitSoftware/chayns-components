import styled, { css } from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';
import { motion } from 'motion/react';

type StyledIconWrapperProps = {
    $isDisabled?: boolean;
    $isOnClick: boolean;
    $size: number;
};

export const StyledIconWrapper = styled.span<StyledIconWrapperProps>`
    align-items: center;
    cursor: ${({ $isDisabled, $isOnClick }) =>
        $isOnClick && !$isDisabled ? 'pointer' : 'inherit'};
    display: inline-flex;
    min-height: ${({ $size }) => `${$size}px`};
    justify-content: center;
    opacity: ${({ $isDisabled }) => ($isDisabled ? 0.5 : 1)};
    position: relative;
    transition: opacity 0.3s ease;
    min-width: ${({ $size }) => `${$size}px`};

    // To insure that stacked icons have the same size as normal icons.
    &&.fa-stack {
        height: fit-content;
        width: fit-content;
        line-height: ${({ $size }) => $size}px;
    }
`;

type StyledIconProps = WithTheme<{
    $fontSize: number;
    $isStacked?: boolean;
    $color?: string;
    $size: number;
}>;

export const StyledIcon = styled.i<StyledIconProps>`
    color: ${({ $color, theme }: StyledIconProps) => $color || theme.iconColor || theme.text};
    display: ${({ $isStacked }) => ($isStacked ? undefined : 'inline-flex')};
    font-size: ${({ $fontSize }) => `${$fontSize}px`};

    ${({ $fontSize, $size }) =>
        $fontSize !== $size &&
        css`
            top: 50%;
            transform: translateY(-50%);
        `}
`;

type StyledUnicodeIconProps = WithTheme<{ $icon: string }>;

export const StyledUnicodeIcon = styled.i<StyledUnicodeIconProps>`
    align-items: center;
    justify-content: center;
    display: flex;
    color: ${({ theme }: StyledUnicodeIconProps) => theme.iconColor || theme.headline};

    &:before {
        content: ${({ $icon }) => `"\\${$icon}"`};
        font-family: 'Font Awesome 6 Pro', Fontawesome !important;
    }
`;
