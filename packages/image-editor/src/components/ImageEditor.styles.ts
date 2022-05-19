import type { MouseEventHandler } from 'react';
import styled from 'styled-components';
import type { WithTheme } from '../../../core/src/components/color-scheme-provider/ColorSchemeProvider';
import type { ImageEditorProps } from './ImageEditor';

type StyledImageProps = Pick<ImageEditorProps, 'ratio'> & {
    src: string;
};

export const StyledImage = styled.img<StyledImageProps>`
    width: 100%;
    height: 100%;
    padding: 1px;
`;

type StyledImageWrapperProps = Pick<ImageEditorProps, 'ratio'> & WithTheme<{}>;

export const StyledImageWrapper = styled.div<StyledImageWrapperProps>`
    border: 2px dashed ${({ theme }: StyledImageWrapperProps) => theme['005']};
    aspect-ratio: ${({ ratio }: StyledImageWrapperProps) => ratio};
    width: 100%;
    display: flex;
`;

type StyledEditButtonProps = { onClick: MouseEventHandler<HTMLDivElement> };

export const StyledEditButton = styled.div<StyledEditButtonProps>`
    position: absolute;
    right: 17px;
    background-color: rgba(255, 255, 255, 0.7);
    color: ${({ theme }: StyledImageWrapperProps) => theme.headline};
    padding: 5px 7px;
    display: flex;
    cursor: pointer;
    border-radius: 2px;
`;

type StyledCreateButtonProps = { onClick: MouseEventHandler<HTMLDivElement> };

export const StyledCreateButton = styled.div<StyledCreateButtonProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.7);
    color: ${({ theme }: StyledImageWrapperProps) => theme.headline};
    cursor: pointer;
`;

type StyledIconWrapperProps = any;

export const StyledIconWrapper = styled.div<StyledIconWrapperProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 5px;
`;
