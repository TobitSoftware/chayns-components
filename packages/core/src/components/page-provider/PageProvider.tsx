import { getEnvironment, RuntimeEnviroment } from 'chayns-api';
import React, { FC } from 'react';
import { createGlobalStyle } from 'styled-components';
import { useUsableHeight } from '../../utils/pageProvider';
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
    const { runtimeEnvironment } = getEnvironment();
    const shouldUsePadding =
        !shouldRemovePadding &&
        ![RuntimeEnviroment.IntercomPlugin, RuntimeEnviroment.PagemakerPlugin, 6].includes(
            runtimeEnvironment as number,
        );

    const usableHeight = useUsableHeight();

    return (
        <StyledPageProvider
            className="page-provider"
            $shouldUsePadding={shouldUsePadding}
            $usableHeight={shouldUseUsableHeight ? usableHeight : undefined}
        >
            <ColorSchemeProvider
                color={color}
                secondaryColor={secondaryColor}
                colorMode={colorMode}
                siteId={siteId}
                style={shouldUseUsableHeight ? { ...style, height: '100%' } : style}
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
