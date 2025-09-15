import styled from 'styled-components';
import { WithTheme } from '../../color-scheme-provider/ColorSchemeProvider';

type StyledFilterContentProps = WithTheme<unknown>;

export const StyledFilterContent = styled.div<StyledFilterContentProps>`
    background-color: ${({ theme }) => theme['100']};

    padding: 12px;

    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const StyledFilterSort = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
`;

export const StyledFilterSortText = styled.div``;
