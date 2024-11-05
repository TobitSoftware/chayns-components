import { getAvailableColorList, getColorFromPalette, hexToRgb255 } from '@chayns/colors';
import { useSite } from 'chayns-api';
import React, {
    createContext,
    FC,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { Helmet } from 'react-helmet';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { getDesignSettings, getParagraphFormat } from '../../api/theme/get';
import type { DesignSettings, ParagraphFormat } from '../../types/colorSchemeProvider';
import { convertIconStyle, getFontSize, getHeadlineColorSelector } from '../../utils/font';

enum ColorMode {
    Classic,
    Dark,
    Light,
}

export type ColorSchemeProviderProps = {
    /**
     * The content of the application or the components for which the styles should be set
     */
    children: ReactNode;
    /**
     * The hex color to be used for the children
     */
    color?: string;
    /**
     * The colors of the components
     */
    colors?: Theme;
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
     * The general format settings.
     */
    paragraphFormat?: ParagraphFormat[];
    /**
     * The secondary hex color to be used for the children
     */
    secondaryColor?: string;
    /**
     * The site id of the page for which the design settings should be fetched
     */
    siteId?: string;
    /**
     * Additional styles set on the root element
     */
    style?: { [key: string]: string | number };
    /**
     * The theme for the components
     */
    theme?: Theme;
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
    .ellipsis {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;

export interface ColorSchemeContextProps {
    designSettings: DesignSettings;
    paragraphFormat: ParagraphFormat[];
    colors: Theme;
    theme: Theme;
}

export const ColorSchemeContext = createContext<ColorSchemeContextProps | undefined>(undefined);

export const useColorScheme = () => useContext(ColorSchemeContext);

const ColorSchemeProvider: FC<ColorSchemeProviderProps> = ({
    children,
    color,
    colorMode,
    cssVariables = {},
    secondaryColor,
    siteId,
    style = {},
    paragraphFormat,
    designSettings,
    theme,
    colors,
}) => {
    const [internalColors, setInternalColors] = useState<Theme>({});
    const [internalTheme, setInternalTheme] = useState<Theme>({});
    const [internalDesignSettings, setInternalDesignSettings] = useState<DesignSettings>();
    const [internalParagraphFormat, setInternalParagraphFormat] = useState<ParagraphFormat[]>();

    // Empty object is used to prevent error if ColorSchemeProvider is rendered on server
    const { color: internalColor, colorMode: internalColorMode } = useSite() ?? {};

    useEffect(() => {
        if (designSettings) {
            setInternalDesignSettings(designSettings);
        } else {
            void getDesignSettings(siteId).then((result) => {
                setInternalDesignSettings(result);
            });
        }

        if (paragraphFormat) {
            setInternalParagraphFormat(paragraphFormat);
        } else {
            void getParagraphFormat(siteId).then((result) => {
                setInternalParagraphFormat(result);
            });
        }
    }, [designSettings, paragraphFormat, siteId]);

    useEffect(() => {
        let newColors: Theme = {};
        let newTheme: Theme = {};

        const availableColors = getAvailableColorList();

        if (!colors || !theme) {
            availableColors.forEach((colorName: string) => {
                const hexColor = getColorFromPalette(colorName, {
                    color: color ?? internalColor,
                    colorMode: colorMode ?? internalColorMode,
                    secondaryColor,
                });

                if (hexColor) {
                    const rgbColor = hexToRgb255(hexColor);

                    if (!theme) {
                        newTheme[colorName] = hexColor;
                    }

                    if (!colors) {
                        newColors[`--chayns-color--${colorName}`] = hexColor;
                    }

                    if (rgbColor) {
                        if (!theme) {
                            newTheme[`${colorName}-rgb`] =
                                `${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}`;
                        }

                        if (!colors) {
                            newColors[`--chayns-color-rgb--${colorName}`] =
                                `${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}`;
                        }
                    }
                }
            });
        }

        if (colors) {
            newColors = colors;
        }

        if (!theme) {
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
                const { colorResult, themeResult } =
                    getHeadlineColorSelector(internalParagraphFormat);

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
        } else {
            newTheme = theme;
        }

        setInternalTheme(newTheme);
        setInternalColors(newColors);
    }, [
        color,
        colorMode,
        colors,
        internalColor,
        internalColorMode,
        internalDesignSettings,
        internalParagraphFormat,
        secondaryColor,
        theme,
    ]);

    const contextValue: ColorSchemeContextProps | undefined = useMemo(() => {
        if (internalDesignSettings && internalParagraphFormat) {
            return {
                paragraphFormat: internalParagraphFormat,
                designSettings: internalDesignSettings,
                colors: internalColors,
                theme: internalTheme,
            };
        }

        return undefined;
    }, [internalColors, internalDesignSettings, internalParagraphFormat, internalTheme]);

    return (
        <ThemeProvider theme={internalTheme}>
            <ColorSchemeContext.Provider value={contextValue}>
                <Helmet>
                    <link
                        rel="stylesheet"
                        href="https://api.chayns-static.space/font/NotoColorEmoji/v1/font.css"
                    />
                </Helmet>
                <div
                    className="color-scheme-provider"
                    style={{
                        ...internalColors,
                        ...cssVariables,
                        ...style,
                        color: 'var(--chayns-color--text)',
                    }}
                >
                    {children}
                </div>
                <GlobalStyle />
            </ColorSchemeContext.Provider>
        </ThemeProvider>
    );
};

ColorSchemeProvider.displayName = 'ColorSchemeProvider';

export default ColorSchemeProvider;
