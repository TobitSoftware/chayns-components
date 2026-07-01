import styled, { css } from 'styled-components';
import { WithTheme } from '@chayns-components/core';
import { CommunicationInputSize } from '../../communication-input/CommunicationInput.types';

type StyledCommunicationFileItemContainerProps = WithTheme<{ $size: CommunicationInputSize }>;

export const StyledCommunicationFileItemContainer = styled.div<StyledCommunicationFileItemContainerProps>`
    position: relative;
    width: 100%;
    height: 64px;
    overflow: hidden;
    background: ${({ theme }) => theme['102']};

    ${({ $size }) => {
        if ($size === CommunicationInputSize.SMALL) {
            return css`
                border-radius: 2px;
            `;
        }

        if ($size === CommunicationInputSize.MEDIUM) {
            return css`
                border-radius: 4px;
            `;
        }

        return '';
    }}
`;

type StyledCommunicationFileItemLoadingOverlayProps = WithTheme<unknown>;

export const StyledCommunicationFileItemLoadingOverlay = styled.div<StyledCommunicationFileItemLoadingOverlayProps>`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => `rgba(${theme['102-rgb'] ?? ''}, 0.7)`};
    z-index: 1;
`;

type StyledCommunicationFileItemRemoveButtonProps = WithTheme<unknown>;

export const StyledCommunicationFileItemRemoveButton = styled.button<StyledCommunicationFileItemRemoveButtonProps>`
    background-color: ${({ theme }) => theme['100']};
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.28);
    height: 18px;
    position: absolute;
    right: 4px;
    top: 4px;
    width: 18px;
    z-index: 2;
    padding: 0;
`;
