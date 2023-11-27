import styled from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

type StyledContentCardProps = WithTheme<unknown>;

export const StyledContentCard = styled.div`
    background-color: ${({ theme }: StyledContentCardProps) => theme['secondary-100']};
    padding: 8px 12px;

    &:not(:last-child) {
        margin-bottom: 8px;
    }
`;
