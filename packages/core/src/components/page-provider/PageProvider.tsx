import React, { FC, useEffect, useState, type CSSProperties } from 'react';
import { createGlobalStyle } from 'styled-components';
import { getPagePadding, getUsableHeight } from '../../utils/pageProvider';
import ColorSchemeProvider, {
    type ColorSchemeProviderProps,
} from '../color-scheme-provider/ColorSchemeProvider';
import { StyledPageProvider } from './PageProvider.styles';

interface PageProviderProps extends ColorSchemeProviderProps {
    /**
     * Whether the padding should be removed.
     */
    shouldRemovePadding?: boolean;
    /**
     * Whether the usable height should be used.
     */
    shouldUseUsableHeight?: boolean;
}

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }
`;

const PageProvider: FC<PageProviderProps> = ({
    children,
    color,
    colorMode,
    cssVariables = {},
    secondaryColor,
    siteId,
    style = {},
    designSettings,
    shouldRemovePadding,
    shouldUseUsableHeight,
}) => {
    const [usableHeight, setUsableHeight] = useState(0);
    const [padding, setPadding] = useState<CSSProperties['padding']>(
        shouldRemovePadding ? 0 : getPagePadding(),
    );

    useEffect(() => {
        void getUsableHeight(shouldRemovePadding).then((height) => {
            setUsableHeight(height);
        });
    }, [shouldRemovePadding]);

    useEffect(() => {
        const handleResize = () => {
            setPadding(shouldRemovePadding ? 0 : getPagePadding());
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [shouldRemovePadding]);

    return (
        <StyledPageProvider
            className="page-provider"
            $padding={padding}
            $usableHeight={shouldUseUsableHeight ? usableHeight : undefined}
        >
            <ColorSchemeProvider
                color={color}
                secondaryColor={secondaryColor}
                colorMode={colorMode}
                style={shouldUseUsableHeight ? { ...style, height: '100%' } : style}
                siteId={siteId}
                designSettings={designSettings}
                cssVariables={cssVariables}
            >
                {children}
            </ColorSchemeProvider>
            <GlobalStyle />
        </StyledPageProvider>
    );
};
PageProvider.displayName = 'PageProvider';

export default PageProvider;
