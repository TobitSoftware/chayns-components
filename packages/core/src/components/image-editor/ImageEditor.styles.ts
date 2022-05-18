import styled from 'styled-components';
import { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';
import { ImageEditorProps } from './ImageEditor';

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
    align-items: center;
    justify-content: center;
`;
