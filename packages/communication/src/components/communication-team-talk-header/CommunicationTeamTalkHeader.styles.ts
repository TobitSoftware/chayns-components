import styled from 'styled-components';
import { WithTheme } from '@chayns-components/core';

export const StyledCommunicationTeamTalkHeader = styled.div`
    width: 100%;
`;

export const StyledCommunicationTeamTalkHeaderHint = styled.div<WithTheme<unknown>>`
    width: 100%;
    display: flex;
    text-align: center;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;

    background-color: ${({ theme }) => theme.primary};
`;

export const StyledCommunicationTeamTalkHeaderActions = styled.div`
    display: flex;
    gap: 12px;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin: 6px 0;
`;

export const StyledCommunicationTeamTalkHeaderActionsSide = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
`;

type StyledCommunicationTeamTalkHeaderSendButtonProps = WithTheme<{ $isDisabled?: boolean }>;

export const StyledCommunicationTeamTalkHeaderSendButton = styled.div<StyledCommunicationTeamTalkHeaderSendButtonProps>`
    cursor: ${({ $isDisabled }) => ($isDisabled ? 'default' : 'pointer')};

    opacity: ${({ $isDisabled }) => ($isDisabled ? 0.75 : 1)};

    height: 100%;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
`;
