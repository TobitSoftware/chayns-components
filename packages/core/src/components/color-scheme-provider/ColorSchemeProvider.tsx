import { getAvailableColorList, getColorFromPalette, hexToRgb255 } from '@chayns/colors';
import { ColorMode, useSite, useStyleSettings } from 'chayns-api';
import React, {
    createContext,
    FC,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { Helmet } from 'react-helmet';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { getDesignSettings, getParagraphFormat } from '../../api/theme/get';
import { DesignSettings, ParagraphFormat } from '../../types/colorSchemeProvider';
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
    [key: string]: string | number | boolean;
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

const createTheme = ({
    colors,
    colorMode,
    color,
    secondaryColor,
    designSettings,
    paragraphFormat,
    theme,
}: Pick<
    ColorSchemeProviderProps,
    | 'colors'
    | 'colorMode'
    | 'color'
    | 'secondaryColor'
    | 'designSettings'
    | 'paragraphFormat'
    | 'theme'
>) => {
    if (theme) {
        return theme;
    }

    const result: Theme = {};

    const availableColors = getAvailableColorList();

    if (!colors) {
        availableColors.forEach((colorName: string) => {
            const hexColor = getColorFromPalette(colorName, {
                color,
                colorMode,
                secondaryColor,
            });

            if (hexColor) {
                const rgbColor = hexToRgb255(hexColor);

                result[colorName] = hexColor;

                if (rgbColor) {
                    result[`${colorName}-rgb`] = `${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}`;
                }
            }
        });
    }

    switch (colorMode) {
        case ColorMode.Light:
            result.colorMode = 'light';
            break;
        case ColorMode.Dark:
            result.colorMode = 'dark';
            break;
        default:
            result.colorMode = 'classic';
            break;
    }
    if (designSettings) {
        Object.keys(designSettings).forEach((key) => {
            if (key === 'iconStyle') {
                result[key] = convertIconStyle(designSettings.iconStyle);

                return;
            }
            result[key] = designSettings[key as keyof DesignSettings] as string | number | boolean;
        });
    }
    if (paragraphFormat) {
        const { themeResult } = getHeadlineColorSelector(paragraphFormat);

        // Update Theme
        Object.keys(themeResult).forEach((key) => {
            result[key] = themeResult[key] as string;
        });
    }
    result.fontSize = getFontSize();

    return result;
};

const ColorSchemeProvider: FC<ColorSchemeProviderProps> = ({
    children,
    color: colorProp,
    colorMode: colorModeProp,
    cssVariables = {},
    secondaryColor,
    siteId,
    style = {},
    paragraphFormat: paragraphFormatProp,
    designSettings: designSettingsProp,
    theme,
    colors,
}) => {
    const { color: internalColor, colorMode: internalColorMode } = useSite();
    const color = colorProp ?? internalColor;
    const colorMode = colorModeProp ?? internalColorMode;
    const isMountedRef = useRef<boolean>(false);

    const styleSettings = useStyleSettings();
    const [designSettings, setDesignSettings] = useState<DesignSettings | undefined>(() => {
        if (designSettingsProp) {
            return designSettingsProp;
        }
        if (styleSettings?.designSettings) {
            return styleSettings.designSettings;
        }
        return undefined;
    });
    const [paragraphFormat, setParagraphFormat] = useState<ParagraphFormat[] | undefined>(() => {
        if (paragraphFormatProp) {
            return paragraphFormatProp;
        }
        if (styleSettings?.paragraphFormats) {
            return styleSettings.paragraphFormats;
        }
        return undefined;
    });

    const [internalTheme, setInternalTheme] = useState<Theme>(() =>
        createTheme({
            colors,
            colorMode,
            color,
            secondaryColor,
            designSettings,
            paragraphFormat,
            theme,
        }),
    );

    useEffect(() => {
        if (designSettingsProp) {
            if (designSettingsProp !== designSettings) {
                setDesignSettings(designSettings);
            }
            return;
        }
        if (styleSettings?.designSettings) {
            if (styleSettings.designSettings !== designSettings) {
                setDesignSettings(styleSettings.designSettings);
            }
            return;
        }
        if (!designSettings) {
            void getDesignSettings(siteId).then((result) => {
                setDesignSettings(result);
            });
        }
    }, [designSettingsProp, designSettings, siteId, styleSettings?.designSettings]);

    useEffect(() => {
        if (paragraphFormatProp) {
            if (paragraphFormatProp !== paragraphFormat) {
                setParagraphFormat(paragraphFormat);
            }
            return;
        }
        if (styleSettings?.paragraphFormats) {
            if (styleSettings.paragraphFormats !== paragraphFormat) {
                setParagraphFormat(styleSettings.paragraphFormats);
            }
            return;
        }
        if (!paragraphFormat) {
            void getParagraphFormat(siteId).then((result) => {
                setParagraphFormat(result ?? []);
            });
        }
    }, [paragraphFormatProp, paragraphFormat, siteId, styleSettings?.paragraphFormats]);

    useEffect(() => {
        if (!isMountedRef.current) {
            isMountedRef.current = true;
            return;
        }
        setInternalTheme(
            createTheme({
                colors,
                colorMode,
                color,
                secondaryColor,
                designSettings,
                paragraphFormat,
                theme,
            }),
        );
    }, [color, colorMode, colors, designSettings, paragraphFormat, secondaryColor, theme]);

    const contextValue: ColorSchemeContextProps | undefined = useMemo(() => {
        if (designSettings && paragraphFormat) {
            return {
                paragraphFormat,
                designSettings,
                theme: internalTheme,
            };
        }

        return undefined;
    }, [designSettings, paragraphFormat, internalTheme]);

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
