import styled, { css } from 'styled-components';
import { WithTheme } from '@chayns-components/core';

type StyledCommunicationTeamTalkHeaderActionProps = WithTheme<{ $isDisabled?: boolean }>;

export const StyledCommunicationTeamTalkHeaderAction = styled.div<StyledCommunicationTeamTalkHeaderActionProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;

    position: relative;

    height: 24px;
    min-width: 24px;
    padding: 4px;

    opacity: 0.75;

    white-space: nowrap;
    border-radius: 4px;

    ${({ theme, $isDisabled }) =>
        !$isDisabled &&
        css`
            cursor: pointer;
            
            opacity: 1;
            
            &:hover {
                background-color: ${theme['201']};
            }
        }
        `}
`;

export const StyledCommunicationTeamTalkHeaderActionLabel = styled.div``;
