import { getAvailableColorList } from '@chayns/colors';
import { styled } from 'styled-components';
import type { WithTheme } from './ColorSchemeProvider';

type ColorSchemeProviderProps = WithTheme<unknown>;

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
`;
