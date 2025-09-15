import styled from 'styled-components';
import { WithTheme } from '../../color-scheme-provider/ColorSchemeProvider';

export const StyledFilterPopupContent = styled.div`
    display: flex;
    flex-direction: column;
`;

type StyledFilterPopupContentItemProps = WithTheme<unknown>;

export const StyledFilterPopupContentItem = styled.div<StyledFilterPopupContentItemProps>`
    cursor: pointer;
    display: flex;
    padding: 5px 8px 5px 5px;
    transition: background-color 0.3s;
    gap: 6px;

    &:hover {
        background-color: ${({ theme }) => theme['103']};
    }
`;

export const StyledFilterPopupContentItemText = styled.div``;

export const StyledFilterPopupContentItemState = styled.div`
    display: flex;

    width: 20px;
`;
