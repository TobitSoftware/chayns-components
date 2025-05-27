import styled from 'styled-components';
import { WithTheme } from '@chayns-components/core';

export const StyledPersonFinderGroup = styled.div``;

export const StyledPersonFinderGroupWaitCursor = styled.div`
    display: flex;
    justify-content: center;
`;

export const StyledPersonFinderGroupErrorMessage = styled.div`
    text-align: center;
`;

type StyledPersonFinderGroupNameProps = WithTheme<unknown>;

export const StyledPersonFinderGroupName = styled.div<StyledPersonFinderGroupNameProps>`
    padding: 5px 10px;
    font-weight: bold;

    color: ${({ theme }: StyledPersonFinderGroupNameProps) => theme.text};
`;

export const StyledPersonFinderGroupButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;
