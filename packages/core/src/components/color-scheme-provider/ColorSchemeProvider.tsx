import { ChaynsDesignSettings, ChaynsParagraphFormat, ColorMode, useSite } from 'chayns-api';
import React, { createContext, FC, ReactNode, useContext, useMemo } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { StyledColorSchemeProvider } from './ColorSchemeProvider.styles';
import { useChaynsTheme } from './hooks/useChaynsTheme';

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
     * The color mode to be used for the children
     */
    colorMode?: ColorMode;
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
     * Additional variables to extend the theme
     */
    customVariables?: Record<string, string>;
    /**
     * An optional color for all icons
     */
    iconColor?: string;
};

export interface Theme {
    [key: string]: string;
}

export type WithTheme<T> = T & {
    theme: Theme;
};

const GlobalStyle = createGlobalStyle`
    .ellipsis {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    footer {
        font-size: 0.85rem;
        color: #888;
        margin: 10px 0 0;

        & a {
            color: #888;
            letter-spacing: -0.3px;
        }
    }
`;

export interface ColorSchemeContextProps {
    designSettings?: ChaynsDesignSettings;
    paragraphFormat: ChaynsParagraphFormat[];
    theme: Theme;
}

export const ColorSchemeContext = createContext<ColorSchemeContextProps | undefined>(undefined);

export const useColorScheme = () => useContext(ColorSchemeContext);

const ColorSchemeProvider: FC<ColorSchemeProviderProps> = ({
    children,
    color: colorProp,
    colorMode: colorModeProp,
    secondaryColor,
    siteId,
    style = {},
    iconColor,
    customVariables,
}) => {
    const context = useContext(ColorSchemeContext);

    const { color: internalColor, colorMode: internalColorMode } = useSite();

    const color = colorProp ?? context?.designSettings?.color ?? internalColor;
    const colorMode = colorModeProp ?? context?.designSettings?.colorMode ?? internalColorMode;

    const overrideParagraphFormat =
        (color && color !== internalColor) || colorMode !== internalColorMode;

    const paragraphFormat = useMemo(
        () => (overrideParagraphFormat ? [] : undefined),
        [overrideParagraphFormat],
    );

    const contextValue = useChaynsTheme({
        color,
        iconColor,
        colorMode,
        secondaryColor,
        siteId,
        customVariables,
        // Overrides the paragraphFormat on changed color or colorMode
        paragraphFormat,
    });

    return (
        <ThemeProvider theme={contextValue.theme}>
            <ColorSchemeContext.Provider value={contextValue}>
                <StyledColorSchemeProvider className="color-scheme-provider" style={style}>
                    {children}
                </StyledColorSchemeProvider>
                <GlobalStyle />
            </ColorSchemeContext.Provider>
        </ThemeProvider>
    );
};

ColorSchemeProvider.displayName = 'ColorSchemeProvider';

export default ColorSchemeProvider;
