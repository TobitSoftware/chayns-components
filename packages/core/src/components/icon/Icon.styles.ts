import styled, { css } from 'styled-components';
import type { IconProps } from './Icon';

type StyledIconWrapperProps = Omit<IconProps, 'icons'>;

type StyledIconProps = Omit<IconProps, 'icons'> & {
    fontSize: number;
    isStacked?: boolean;
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
    width: ${({ size }) => `${size}px`};
`;

export const StyledIcon = styled.i<StyledIconProps>`
    color: ${({ color, theme }) => color || theme['headline']};
    display: ${({ isStacked }) => (isStacked ? undefined : 'inline-flex')};
    font-size: ${({ fontSize }) => `${fontSize}px`};

    ${({ fontSize, size }) =>
        fontSize !== size &&
        css`
            top: 50%;
            transform: translateY(-50%);
        `}
`;
