import { getAvailableColorList, getColorFromPalette, hexToRgb255 } from '@chayns/colors';
import React, { FC, useEffect, useState } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

enum ColorMode {
    Classic,
    Dark,
    Light,
}

type ColorSchemeProviderProps = {
    /**
     * The content of the application or the components for which the styles should be set
     */
    children: JSX.Element;
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
     * The secondary hex color to be used for the children
     */
    secondaryColor?: string;
    /**
     * Additional styles set on the root element
     */
    style?: { [key: string]: string | number };
};

interface Colors {
    [key: string]: string;
}

const GlobalStyle = createGlobalStyle`
    .ellipsis {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
`;

const ColorSchemeProvider: FC<ColorSchemeProviderProps> = ({
    children,
    color = '#005EB8',
    colorMode = ColorMode.Classic,
    cssVariables = {},
    secondaryColor,
    style = {},
}) => {
    const [colors, setColors] = useState<Colors>({});
    const [themeColors, setThemeColors] = useState<Colors>({});

    useEffect(() => {
        const availableColors = getAvailableColorList();

        const newColors: Colors = {};
        const newThemeColors: Colors = {};

        availableColors.forEach((colorName: string) => {
            const hexColor = getColorFromPalette(colorName, {
                color,
                colorMode,
                secondaryColor,
            });

            if (colorName === 'text') {
                // console.debug('textColor', hexColor);
            }

            if (hexColor) {
                const rgbColor = hexToRgb255(hexColor);

                newColors[`--chayns-color--${colorName}`] = hexColor;
                newThemeColors[colorName] = hexColor;

                if (rgbColor) {
                    newColors[
                        `--chayns-color-rgb--${colorName}`
                    ] = `${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}`;
                    newThemeColors[
                        `${colorName}-rgb`
                    ] = `${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}`;
                }
            }
        });

        setColors(newColors);
        setThemeColors(newThemeColors);
    }, [color, colorMode, secondaryColor]);

    return (
        <ThemeProvider theme={themeColors}>
            <div style={{ ...colors, ...cssVariables, ...style }}>{children}</div>
            <GlobalStyle />
        </ThemeProvider>
    );
};

ColorSchemeProvider.displayName = 'ColorSchemeProvider';

export default ColorSchemeProvider;
