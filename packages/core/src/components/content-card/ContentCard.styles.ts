import styled from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

type StyledContentCardProps = WithTheme<unknown>;

export const StyledContentCard = styled.div`
    background-color: rgba(${({ theme }: StyledContentCardProps) => theme['100-rgb']}, ${({ theme }: StyledContentCardProps) => theme.cardBackgroundOpacity ?? 0 * -1};
    border-radius: ${({ theme }: StyledContentCardProps) => theme.cardBorderRadius}px;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, ${({ theme }: StyledContentCardProps) => theme.cardShadow});
    padding: 8px 12px;

    &:not(:last-child) {
        margin-bottom: 8px;
    }
`;
