import styled from 'styled-components';
import { WithTheme } from '@chayns-components/core';

type StyledCommunicationDocumentItemProps = WithTheme<unknown>;

export const StyledCommunicationDocumentItem = styled.div<StyledCommunicationDocumentItemProps>`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 6px 34px 6px 6px;
    box-sizing: border-box;
    background: ${({ theme }) => theme['102']};
`;

export const StyledCommunicationDocumentItemInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
`;

export const StyledCommunicationDocumentItemName = styled.span`
    font-size: 14px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const StyledCommunicationDocumentItemMeta = styled.span`
    font-size: 12px;
    line-height: 1.1;
    opacity: 0.72;
`;

export const StyledCommunicationDocumentItemIcon = styled.div<WithTheme<unknown>>`
    height: 100%;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.primary};
    border-radius: 2px;
`;
