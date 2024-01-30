import { getAvailableColorList, getColorFromPalette, hexToRgb255 } from '@chayns/colors';
import React, { FC, ReactNode, useEffect, useState } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { convertIconStyle, generateFontFaces } from '../../utils/font';
import type { DesignSettings } from '../../types/colorSchemeProvider';
import { getSite } from 'chayns-api';
import { getDesignSettings } from '../../api/theme/get';

enum ColorMode {
    Classic,
    Dark,
    Light,
}

type ColorSchemeProviderProps = {
    /**
     * The content of the application or the components for which the styles should be set
     */
    children: ReactNode;
    /**
     * The hex color to be used for the children
     */
    color?: string;
    /**
     * The color mode to be used for the children
     */
    colorMode?: ColorMode;
    /**
     * Css variables to be added in addition to the chayns variables
     */
    cssVariables?: { [key: string]: string | number };
    /**
     * The design settings of a page.
     */
    designSettings?: DesignSettings;
    /**
     * The secondary hex color to be used for the children
     */
    secondaryColor?: string;
    /**
     * Additional styles set on the root element
     */
    style?: { [key: string]: string | number };
};

export interface Theme {
    [key: string]: string;
}

export type WithTheme<T> = T & {
    theme: Theme;
};

// ToDo remove type after the framer-motion bug is Fixed
export type FramerMotionBugFix = WithTheme<unknown>;

const GlobalStyle = createGlobalStyle`
  ${generateFontFaces}

  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const ColorSchemeProvider: FC<ColorSchemeProviderProps> = ({
    children,
    color,
    colorMode,
    cssVariables = {},
    secondaryColor,
    style = {},
    designSettings,
}) => {
    const [colors, setColors] = useState<Theme>({});
    const [theme, setTheme] = useState<Theme>({});
    const [internalDesignSettings, setInternalDesignSettings] = useState<DesignSettings>();

    useEffect(() => {
        if (designSettings) {
            setInternalDesignSettings(designSettings);

            return;
        }

        void getDesignSettings().then((result) => {
            setInternalDesignSettings(result);
        });
    }, [designSettings]);

    const site = getSite();

    const internalColorMode = colorMode ?? site.colorMode;
    const internalColor = color ?? site.color;

    useEffect(() => {
        const availableColors = getAvailableColorList();

        const newColors: Theme = {};
        const newThemeColors: Theme = {};
        const newTheme: Theme = {};

        availableColors.forEach((colorName: string) => {
            const hexColor = getColorFromPalette(colorName, {
                color: internalColor,
                colorMode: internalColorMode,
                secondaryColor,
            });

            if (hexColor) {
                const rgbColor = hexToRgb255(hexColor);

                newColors[`--chayns-color--${colorName}`] = hexColor;
                newThemeColors[colorName] = hexColor;
                newTheme[colorName] = hexColor;

                if (rgbColor) {
                    newColors[`--chayns-color-rgb--${colorName}`] =
                        `${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}`;
                    newThemeColors[`${colorName}-rgb`] =
                        `${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}`;
                }
            }
        });

        if (internalDesignSettings) {
            Object.keys(internalDesignSettings).forEach((key) => {
                if (key === 'iconStyle') {
                    newTheme[key] = convertIconStyle(internalDesignSettings.iconStyle);

                    return;
                }

                // IDK what I need to do!!!! Pls help me!!
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                newTheme[key] = internalDesignSettings[key];
            });
        }

        setTheme(newTheme);
        setColors(newColors);
    }, [internalColor, internalColorMode, internalDesignSettings, secondaryColor]);

    return (
        <ThemeProvider theme={theme}>
            <div style={{ ...colors, ...cssVariables, ...style }}>{children}</div>
            <GlobalStyle />
        </ThemeProvider>
    );
};

ColorSchemeProvider.displayName = 'ColorSchemeProvider';

export default ColorSchemeProvider;
