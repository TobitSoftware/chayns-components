import styled from 'styled-components';
import { WithTheme } from '@chayns-components/core';

type StyledPreviewMessageProps = WithTheme<{ $isClickable: boolean }>;

export const StyledPreviewMessage = styled.div<StyledPreviewMessageProps>`
    border-radius: 3px;
    overflow: hidden;

    background-color: hsla(0, 0%, 50%, 0.25);
    cursor: ${({ $isClickable }) => ($isClickable ? 'pointer' : 'default')};
    display: flex;

    height: 50px;

    margin-bottom: 4px;
`;

export const StyledPreviewMessageIndicator = styled.div<WithTheme<unknown>>`
    background-color: ${({ theme }) => theme['104']};

    width: 4px;
    height: 100%;

    flex-shrink: 0;
`;

export const StyledPreviewMessageInnerWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 4px;

    width: 100%;
    min-width: 0;
    padding: 4px 8px;
`;

export const StyledPreviewMessageContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 0;
`;

export const StyledPreviewMessageAuthor = styled.div`
    font-size: 12px;
    font-weight: 700;
`;

export const StyledPreviewMessageContent = styled.div`
    font-size: 13px;

    display: flex;
    align-items: center;
    gap: 4px;

    div {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

export const StyledPreviewMessageRight = styled.div`
    height: 100%;
    display: flex;
    gap: 8px;
`;

export const StyledPreviewMessageFile = styled.img`
    height: 100%;
    aspect-ratio: 1;

    object-fit: cover;

    border-radius: 4px;
    margin-right: -4px;
`;

export const StyledPreviewMessageRemoveIcon = styled.div`
    height: 100%;
    display: flex;
    align-items: center;

    cursor: pointer;
`;
