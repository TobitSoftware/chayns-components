import { getAvailableColorList } from '@chayns/colors';
import { styled } from 'styled-components';
import type { WithTheme } from './ColorSchemeProvider';

type ColorSchemeProviderProps = WithTheme<unknown>;

// noinspection CssUnresolvedCustomProperty
export const StyledColorSchemeProvider = styled.div<ColorSchemeProviderProps>`
    color: var(--chayns-color--text);

    ${({ theme }: ColorSchemeProviderProps) =>
        getAvailableColorList().map((colorName: string) => {
            const colorNameRgb = `${colorName}-rgb`;
            return [
                `--chayns-color--${colorName}: ${theme[colorName]};`,
                `--chayns-color-rgb--${colorName}: ${theme[colorNameRgb]};`,
            ];
        })}

    ${({ theme }: ColorSchemeProviderProps) =>
        `
        --chayns-color--header-bar: ${theme['header-bar'] ?? theme.primary};
    `}

    // ToDo: Remove .h1...
    .color-scheme-provider :is(h1,.h1, h2, .h2, h3, .h3, h4, .h4, h5, .h5, h6, .h6):first-child {
        margin-top: 0;
    }
`;
