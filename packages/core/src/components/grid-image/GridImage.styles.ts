import styled from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

type StyledGridImageProps = WithTheme<{
    shouldShowRoundImage?: boolean;
    size: number;
}>;

export const StyledGridImage = styled.div<StyledGridImageProps>`
    background-color: rgba(${({ theme }: StyledGridImageProps) => theme['text-rgb']}, 0.1);
    border-radius: ${({ shouldShowRoundImage }) => (shouldShowRoundImage ? '50%' : undefined)};
    box-shadow: 0 0 0 1px rgba(${({ theme }: StyledGridImageProps) => theme['009-rgb']}, 0.08) inset;
    height: ${({ size }) => size}px;
    overflow: hidden;
    position: relative;
    transition: border-radius 0.3s ease;
    width: ${({ size }) => size}px;
`;

type StyledGridLeftImageProps = {
    isHidden: boolean;
    size: number;
};

export const StyledGridLeftImage = styled.img<StyledGridLeftImageProps>`
    border-right: ${({ size }) => size / 40}px solid white;
    height: 100%;
    left: 0;
    object-fit: cover;
    opacity: ${({ isHidden }) => (isHidden ? 0 : 1)};
    position: absolute;
    top: 0;
    transition: opacity 0.4s ease;
    width: 60%;
`;

type StyledGridTopRightImageProps = {
    isHidden: boolean;
    size: number;
};

export const StyledGridTopRightImage = styled.img<StyledGridTopRightImageProps>`
    border-bottom: ${({ size }) => size / 40}px solid white;
    height: 50%;
    object-fit: cover;
    opacity: ${({ isHidden }) => (isHidden ? 0 : 1)};
    position: absolute;
    right: 0;
    top: 0;
    transition: opacity 0.3s ease;
    width: 40%;
`;

type StyledGridBottomRightImageProps = {
    isHidden: boolean;
};

export const StyledGridBottomRightImage = styled.img<StyledGridBottomRightImageProps>`
    bottom: 0;
    height: 50%;
    object-fit: cover;
    opacity: ${({ isHidden }) => (isHidden ? 0 : 1)};
    position: absolute;
    right: 0;
    transition: opacity 0.3s ease;
    width: 40%;
`;
