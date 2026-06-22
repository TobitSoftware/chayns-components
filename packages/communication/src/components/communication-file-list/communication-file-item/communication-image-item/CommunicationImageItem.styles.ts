import styled, { css } from 'styled-components';
import { WithTheme } from '@chayns-components/core';

type StyledImageContainerProps = WithTheme<{ isUploading: boolean }>;

export const StyledImageContainer = styled.div<StyledImageContainerProps>`
    position: relative;
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
    background: var(--background-color-secondary);

    ${({ isUploading }) =>
        isUploading &&
        css`
            aspect-ratio: 1;
        `}
`;

export const StyledImage = styled.img`
    display: block;
    width: 100%;
    height: auto;
    border-radius: 8px;
`;

export const StyledRemoveButton = styled.button`
    position: absolute;
    top: 8px;
    right: 8px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.6);
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;

    &:hover {
        background: rgba(0, 0, 0, 0.8);
    }
`;

export const StyledLoadingOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.8);
    cursor: wait;
    border-radius: 8px;
`;
