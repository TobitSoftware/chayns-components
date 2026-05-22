import styled from 'styled-components';
import { WithTheme } from '@chayns-components/core';

export const StyledSocialPluginMessage = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
`;

export const StyledSocialPluginMessageParentMessage = styled.div`
    width: calc(100% - 22px);
`;

export const StyledSocialPluginMessageChildMessageWrapper = styled.div`
    margin: 16px 0 0 32px;
    width: 100%;

    display: flex;
`;

export const StyledSocialPluginMessageChildMessageLine = styled.div<WithTheme<unknown>>`
    width: 1px;

    background-color: rgba(${({ theme }) => theme['text-rgb']}, 0.25);
`;

export const StyledSocialPluginMessageChildMessages = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
`;

export const StyledSocialPluginMessageChildMessage = styled.div`
    display: flex;

    > :nth-child(2) {
        flex-grow: 1;
    }
`;

export const StyledSocialPluginMessageChildMessageSubLine = styled.div<WithTheme<unknown>>`
    width: 20px;
    height: 1px;

    margin-top: 22px;

    background-color: rgba(${({ theme }) => theme['text-rgb']}, 0.25);
`;
