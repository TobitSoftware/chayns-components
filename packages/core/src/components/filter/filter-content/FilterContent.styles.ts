import styled from 'styled-components';
import { WithTheme } from '../../color-scheme-provider/ColorSchemeProvider';
import { FILTER_CONTENT_ROW_GAP_PX } from './FilterContent.constants';

type StyledFilterContentProps = WithTheme<unknown>;

export const StyledFilterContent = styled.div<StyledFilterContentProps>`
    background-color: ${({ theme }) => theme['100']};

    padding: 12px;

    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const StyledFilterContentLabeledRow = styled.div`
    display: flex;
    align-items: center;
    gap: ${FILTER_CONTENT_ROW_GAP_PX}px;
    width: 100%;
    min-width: 0;
`;

export const StyledFilterContentLabel = styled.div`
    flex: 0 0 auto;
    white-space: nowrap;
`;

export const StyledFilterContentControlWrapper = styled.div`
    display: flex;
    flex: 1 1 auto;
    min-width: 0;
    justify-content: flex-end;
`;
