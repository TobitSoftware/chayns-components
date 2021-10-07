import styled from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

type StyledBadgeProps = WithTheme<unknown>;

export const StyledBadge = styled.div`
    background-color: ${({ theme }: StyledBadgeProps) => theme['secondary-202']};
    border-radius: 15px;
    color: ${({ theme }: StyledBadgeProps) => theme['007']};
    font-size: 0.8rem;
    min-width: 1.65rem;
    padding: 2px 7px;
    text-align: center;
`;
