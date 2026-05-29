import styled from 'styled-components';
import { WithTheme } from '../../../../color-scheme-provider/ColorSchemeProvider';

export const StyledFinderGroup = styled.div``;

type StyledFinderGroupNameProps = WithTheme<unknown>;

export const StyledFinderGroupName = styled.div<StyledFinderGroupNameProps>`
    padding: 5px 10px;
    font-weight: bold;

    color: ${({ theme }) => theme.text};
`;

export const StyledFinderGroupWaitCursor = styled.div`
    display: flex;
    justify-content: center;
`;

export const StyledFinderGroupErrorMessage = styled.div`
    text-align: center;
`;

export const StyledFinderGroupButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;
