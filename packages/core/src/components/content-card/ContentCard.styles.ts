import styled, { css } from 'styled-components';
import { ContentCardType } from '../../types/contentCard';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

type StyledContentCardProps = WithTheme<{
    $type: ContentCardType;
}>;

export const StyledContentCard = styled.div<StyledContentCardProps>`
    border-radius: ${({ theme }: StyledContentCardProps) => theme.cardBorderRadius}px;
    box-shadow: 0 2px 6px 0
        rgba(0, 0, 0, ${({ theme }: StyledContentCardProps) => theme.cardShadow});
    padding: 8px 12px;

    &:not(:last-child) {
        margin-bottom: 8px;
    }

    ${({ $type, theme }: StyledContentCardProps) => {
        switch ($type) {
            case ContentCardType.Error:
                return css`
                    background-color: ${theme['red-4']};
                    border: 1px solid ${theme['red-1']};
                `;
            case ContentCardType.Success:
                return css`
                    background-color: ${theme['green-4']};
                    border: 1px solid ${theme['green-1']};
                `;
            case ContentCardType.Warning:
                return css`
                    background-color: ${theme['yellow-4']};
                    border: 1px solid ${theme['yellow-1']};
                `;
            default:
                return css`
                    background-color: rgba(
                        ${theme['secondary-100-rgb']},
                        ${theme.cardBackgroundOpacity}
                    );
                `;
        }
    }}
`;
