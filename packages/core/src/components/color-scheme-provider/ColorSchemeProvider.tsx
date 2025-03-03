import { ChaynsDesignSettings, ChaynsParagraphFormat, ColorMode, useSite } from 'chayns-api';
import React, { createContext, FC, ReactNode, useContext } from 'react';
import { Helmet } from 'react-helmet';
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
}) => {
    const { color: internalColor, colorMode: internalColorMode } = useSite();
    const color = colorProp ?? internalColor;
    const colorMode = colorModeProp ?? internalColorMode;

    const contextValue = useChaynsTheme({
        color,
        colorMode,
        secondaryColor,
        siteId,
    });

    return (
        <ThemeProvider theme={contextValue.theme}>
            <ColorSchemeContext.Provider value={contextValue}>
                <Helmet>
                    <link
                        rel="stylesheet"
                        href="https://api.chayns-static.space/font/NotoColorEmoji/v1/font.css"
                    />
                </Helmet>
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
