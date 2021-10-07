import styled from 'styled-components';
import type { WithTheme } from '../../../color-scheme-provider/ColorSchemeProvider';

type StyledListItemContentProps = WithTheme<unknown>;

export const StyledListItemContent = styled.div`
    color: ${({ theme }: StyledListItemContentProps) => theme.text};
    padding: 9px 18px 8px 35px;
`;
