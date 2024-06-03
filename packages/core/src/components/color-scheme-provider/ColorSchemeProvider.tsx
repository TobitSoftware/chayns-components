import { getAvailableColorList, getColorFromPalette, hexToRgb255 } from '@chayns/colors';
import { useSite } from 'chayns-api';
import React, { FC, ReactNode, useEffect, useState } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { getDesignSettings, getParagraphFormat } from '../../api/theme/get';
import type { DesignSettings, ParagraphFormat } from '../../types/colorSchemeProvider';
import {
    convertIconStyle,
    generateFontFaces,
    getFontSize,
    getHeadlineColorSelector,
} from '../../utils/font';

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
    const [internalParagraphFormat, setInternalParagraphFormat] = useState<ParagraphFormat[]>();

    // Empty object is used to prevent error if ColorSchemeProvider is rendered on server
    const { color: internalColor, colorMode: internalColorMode } = useSite() ?? {};

    useEffect(() => {
        if (designSettings) {
            setInternalDesignSettings(designSettings);

            return;
        }

        void getDesignSettings().then((result) => {
            setInternalDesignSettings(result);
        });

        void getParagraphFormat().then((result) => {
            setInternalParagraphFormat(result);
        });
    }, [designSettings]);

    useEffect(() => {
        const availableColors = getAvailableColorList();

        const newColors: Theme = {};
        const newTheme: Theme = {};

        availableColors.forEach((colorName: string) => {
            const hexColor = getColorFromPalette(colorName, {
                color: color ?? internalColor,
                colorMode: colorMode ?? internalColorMode,
                secondaryColor,
            });

            if (hexColor) {
                const rgbColor = hexToRgb255(hexColor);

                newColors[`--chayns-color--${colorName}`] = hexColor;
                newTheme[colorName] = hexColor;

                if (rgbColor) {
                    newColors[`--chayns-color-rgb--${colorName}`] =
                        `${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}`;
                    newTheme[`${colorName}-rgb`] = `${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}`;
                }
            }
        });

        switch (colorMode ?? internalColorMode) {
            case ColorMode.Light:
                newTheme.colorMode = 'light';
                break;
            case ColorMode.Dark:
                newTheme.colorMode = 'dark';
                break;
            default:
                newTheme.colorMode = 'classic';
                break;
        }

        if (internalDesignSettings) {
            Object.keys(internalDesignSettings).forEach((key) => {
                if (key === 'iconStyle') {
                    newTheme[key] = convertIconStyle(internalDesignSettings.iconStyle);

                    return;
                }

                // ToDo: Find better solution
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                newTheme[key] = internalDesignSettings[key];
            });
        }

        if (internalParagraphFormat) {
            const { colorResult, themeResult } = getHeadlineColorSelector(internalParagraphFormat);

            // Update chayns-colors
            Object.keys(colorResult).forEach((key) => {
                // ToDo: Find better solution
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                newColors[key] = colorResult[key];
            });

            // Update Theme
            Object.keys(themeResult).forEach((key) => {
                // ToDo: Find better solution
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                newTheme[key] = themeResult[key];
            });
        }

        newTheme.fontSize = getFontSize();

        setTheme(newTheme);
        setColors(newColors);
    }, [
        color,
        colorMode,
        internalColor,
        internalColorMode,
        internalDesignSettings,
        internalParagraphFormat,
        secondaryColor,
    ]);

    return (
        <ThemeProvider theme={theme}>
            <div style={{ ...colors, ...cssVariables, ...style }}>{children}</div>
            <GlobalStyle />
        </ThemeProvider>
    );
};

ColorSchemeProvider.displayName = 'ColorSchemeProvider';

export default ColorSchemeProvider;
