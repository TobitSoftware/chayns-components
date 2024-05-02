import styled, { css } from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

export const StyledSignature = styled.div``;
export const StyledSignatureImageWrapper = styled.div`
    position: relative;
    aspect-ratio: 3.8;
    width: 100%;
`;

type StyledSignatureImageProps = WithTheme<unknown>;

export const StyledSignatureImage = styled.img<StyledSignatureImageProps>`
    ${({ theme }: StyledSignatureImageProps) =>
        theme.colorMode === 'dark' &&
        css`
            filter: invert(1);
        `}
`;
export const StyledSignatureDeleteIconWrapper = styled.div`
    position: absolute;
    top: 0;
    right: 0;
`;
