import { getAvailableColorList } from '@chayns/colors';
import { css, styled } from 'styled-components';
import type { WithTheme } from './ColorSchemeProvider';
import { BrowserName } from '../../types/chayns';

type ColorSchemeProviderProps = WithTheme<{ $browser: BrowserName }>;

// noinspection CssUnresolvedCustomProperty
export const StyledColorSchemeProvider = styled.div<ColorSchemeProviderProps>`
    color: var(--chayns-color--text);

    ${({ theme }: ColorSchemeProviderProps) =>
        getAvailableColorList()
            .map((colorName: string) => {
                const colorNameRgb = `${colorName}-rgb`;
                return `--chayns-color--${colorName}: ${theme[colorName] ?? ''};\n--chayns-color-rgb--${colorName}: ${theme[colorNameRgb] ?? ''};`;
            })
            .join('\n')}

    ${({ theme }: ColorSchemeProviderProps) =>
        `
        --chayns-color--header-bar: ${theme['header-bar'] ?? theme.primary ?? ''};
    `}

    // ToDo: Remove .h1...
    .color-scheme-provider :is(h1,.h1, h2, .h2, h3, .h3, h4, .h4, h5, .h5, h6, .h6):first-child {
        margin-top: 0;
    }

    // Styles for custom scrollbar
    .chayns-scrollbar {
        ${({ $browser, theme }: ColorSchemeProviderProps) =>
            $browser === 'firefox'
                ? css`
                      scrollbar-color: rgba(${theme['text-rgb'] ?? '0,0,0'}, 0.15) transparent;
                      scrollbar-width: thin;
                  `
                : css`
                      &::-webkit-scrollbar {
                          width: 10px;
                          height: 10px;
                      }

                      &::-webkit-scrollbar-track {
                          background-color: transparent;
                      }

                      &::-webkit-scrollbar-button {
                          background-color: transparent;
                          height: 5px;
                          width: 5px;
                      }

                      &::-webkit-scrollbar-thumb {
                          background-color: rgba(${theme['text-rgb'] ?? '0,0,0'}, 0.15);
                          border-radius: 20px;
                          background-clip: padding-box;
                          border: solid 3px transparent;
                      }

                      &::-webkit-scrollbar-corner {
                          background-color: transparent;
                      }
                  `}
    }
`;
