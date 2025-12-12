import styled, { css } from 'styled-components';
import { ContentCardType } from '../../types/contentCard';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

type StyledContentCardProps = WithTheme<{
    $type: ContentCardType;
    $shouldChangeColor: boolean;
}>;

export const StyledContentCard = styled.div<StyledContentCardProps>`
    border-radius: ${({ theme }: StyledContentCardProps) => theme.cardBorderRadius}px;

    ${({ theme, $shouldChangeColor }: StyledContentCardProps) =>
        !$shouldChangeColor &&
        css`
            box-shadow: 0 2px 6px 0 rgba(0, 0, 0, ${theme.cardShadow});
        `};

    padding: 8px 12px;

    color: ${({ theme }: StyledContentCardProps) => theme.text};

    &:not(:last-child) {
        margin-bottom: 10px;
    }

    ${({ $type, theme, $shouldChangeColor }: StyledContentCardProps) => {
        if ($type === ContentCardType.Default && $shouldChangeColor) {
            return css`
                background-color: rgba(
                    ${theme.colorMode === 'classic' ? theme['101-rgb'] : theme['000-rgb']},
                    ${theme.cardBackgroundOpacity}
                );
            `;
        }

        switch ($type) {
            case ContentCardType.Error:
                return css`
                    background-color: ${theme['red-4']};
                    border: 1px solid ${theme['red-1']};
                    color: #222;

                    --chayns-color--text: #222;
                    --chayns-color-rgb--text: rgb(34, 34, 34);

                    label {
                        color: #555 !important;
                    }
                `;
            case ContentCardType.Success:
                return css`
                    background-color: ${theme['green-4']};
                    border: 1px solid ${theme['green-1']};
                    color: #222;

                    --chayns-color--text: #222;
                    --chayns-color-rgb--text: rgb(34, 34, 34);

                    label {
                        color: #555 !important;
                    }
                `;
            case ContentCardType.Warning:
                return css`
                    background-color: ${theme['yellow-4']};
                    border: 1px solid ${theme['yellow-1']};
                    color: #222;

                    --chayns-color--text: #222;
                    --chayns-color-rgb--text: rgb(34, 34, 34);

                    label {
                        color: #555 !important;
                    }
                `;
            case ContentCardType.SiteColor:
                return css`
                    background-color: ${theme['103']};
                    border: 1px solid ${theme['104']};
                    color: ${theme['text-rgb']};

                    --chayns-color--text: ${theme['text-rgb']};
                    --chayns-color-rgb--text: ${theme['text-rgb']};

                    label {
                        color: ${theme['text-rgb']} !important;
                    }
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
