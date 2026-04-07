import type { WithTheme } from '@chayns-components/core';
import styled from 'styled-components';

export const StyledGalleryEditorItem = styled.div`
    display: flex;
    position: relative;
    height: 100%;
    width: 100%;
`;

type StyledGalleryEditorItemDeleteButtonProps = WithTheme<unknown>;

export const StyledGalleryEditorItemDeleteButton = styled.button<StyledGalleryEditorItemDeleteButtonProps>`
    background-color: rgba(
        ${({ theme }: StyledGalleryEditorItemDeleteButtonProps) => theme['000-rgb']},
        0.75
    );
    box-shadow: 0 0 0 1px
        rgba(${({ theme }: StyledGalleryEditorItemDeleteButtonProps) => theme['009-rgb']}, 0.08)
        inset;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
    height: 30px;
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
