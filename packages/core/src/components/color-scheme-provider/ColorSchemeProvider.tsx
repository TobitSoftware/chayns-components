import { getAvailableColorList, getColorFromPalette, hexToRgb255 } from '@chayns/colors';
import { ColorMode, useSite, useStyleSettings } from 'chayns-api';
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
import { StyledColorSchemeProvider } from './ColorSchemeProvider.styles';

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
    const { color: internalColor, colorMode: internalColorMode } = useSite();
    const styleSettings = useStyleSettings();
    const [internalTheme, setInternalTheme] = useState<Theme>(theme ?? {});
    const [internalDesignSettings, setInternalDesignSettings] = useState<
        DesignSettings | undefined
    >(() => {
        if (designSettings) {
            return designSettings;
        }
        if (styleSettings?.designSettings) {
            return styleSettings.designSettings;
        }
        return undefined;
    });
    const [internalParagraphFormat, setInternalParagraphFormat] = useState<ParagraphFormat[]>(
        () => {
            if (paragraphFormat) {
                return paragraphFormat;
            }
            if (styleSettings?.paragraphFormats) {
                return styleSettings.paragraphFormats;
            }
            return [];
        },
    );

    useEffect(() => {
        if (designSettings) {
            if (designSettings !== internalDesignSettings) {
                setInternalDesignSettings(designSettings);
            }
            return;
        }
        if (styleSettings?.designSettings) {
            if (styleSettings.designSettings !== internalDesignSettings) {
                setInternalDesignSettings(styleSettings.designSettings);
            }
            return;
        }
        if (!internalDesignSettings) {
            void getDesignSettings(siteId).then((result) => {
                setInternalDesignSettings(result);
            });
        }
    }, [designSettings, internalDesignSettings, siteId, styleSettings?.designSettings]);

    useEffect(() => {
        if (paragraphFormat) {
            if (paragraphFormat !== internalParagraphFormat) {
                setInternalParagraphFormat(paragraphFormat);
            }
            return;
        }
        if (styleSettings?.paragraphFormats) {
            if (styleSettings.paragraphFormats !== internalParagraphFormat) {
                setInternalParagraphFormat(styleSettings.paragraphFormats);
            }
        }
        if (!internalParagraphFormat) {
            void getParagraphFormat(siteId).then((result) => {
                setInternalParagraphFormat(result ?? []);
            });
        }
    }, [internalParagraphFormat, paragraphFormat, siteId, styleSettings?.paragraphFormats]);

    useEffect(() => {
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

                    if (rgbColor) {
                        if (!theme) {
                            newTheme[`${colorName}-rgb`] =
                                `${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}`;
                        }
                    }
                }
            });
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
                const { themeResult } = getHeadlineColorSelector(internalParagraphFormat);

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
                theme: internalTheme,
            };
        }

        return undefined;
    }, [internalDesignSettings, internalParagraphFormat, internalTheme]);

    return (
        <ThemeProvider theme={internalTheme}>
            <ColorSchemeContext.Provider value={contextValue}>
                <Helmet>
                    <link
                        rel="stylesheet"
                        href="https://api.chayns-static.space/font/NotoColorEmoji/v1/font.css"
                    />
                </Helmet>
                <StyledColorSchemeProvider
                    className="color-scheme-provider"
                    style={{
                        ...cssVariables,
                        ...style,
                    }}
                >
                    {children}
                </StyledColorSchemeProvider>
                <GlobalStyle />
            </ColorSchemeContext.Provider>
        </ThemeProvider>
    );
};

ColorSchemeProvider.displayName = 'ColorSchemeProvider';

export default ColorSchemeProvider;
