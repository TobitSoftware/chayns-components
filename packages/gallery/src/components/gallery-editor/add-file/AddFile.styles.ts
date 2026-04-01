import type { WithTheme } from '@chayns-components/core';
import styled from 'styled-components';

export const StyledAddFile = styled.div`
    position: relative;
`;

type StyledAddFIleIconWrapperProps = WithTheme<unknown>;

export const StyledAddFIleIconWrapper = styled.button<StyledAddFIleIconWrapperProps>`
    background-color: ${({ theme }: StyledAddFIleIconWrapperProps) => theme['101']};
    box-shadow: 0 0 0 1px
        rgba(${({ theme }: StyledAddFIleIconWrapperProps) => theme['009-rgb']}, 0.08) inset;
    width: 100%;
    aspect-ratio: 1 / 1;
`;
