import { RuntimeEnviroment, useEnvironment } from 'chayns-api';
import React, { FC } from 'react';
import { createGlobalStyle } from 'styled-components';
import { useUsableHeight } from '../../utils/pageProvider';
import ColorSchemeProvider, {
    type ColorSchemeProviderProps,
} from '../color-scheme-provider/ColorSchemeProvider';
import { StyledPageProvider } from './PageProvider.styles';

/**
 * Props for the PageProvider component.
 * @description
 * This interface defines the props that can be passed to the PageProvider component
 * for controlling the layout and styling behavior.
 * @example
 * <PageProvider shouldRemovePadding={true}>
 *   {children}
 * </PageProvider>
 */
interface PageProviderProps extends ColorSchemeProviderProps {
    /**
     * Controls whether the usable height should be reduced by the cover height
     * @description
     * When true, the usable height will be reduced by the cover image height. This is useful
     * when the page should not be scrollable due to the cover image. The property has no effect
     * when `shouldUseUsableHeight` is false.
     * @default false
     * @optional
     */
    shouldReduceUsableHeightByCoverHeight: boolean;
    /**
     * Controls whether padding should be removed from the page
     * @description
     * When true, the padding around the page content will be removed. This is useful when the
     * page should not have any padding, for example, when it is embedded in a pagemaker page.
     * @default false
     * @optional
     */
    shouldRemovePadding?: boolean;
    /**
     * Controls whether the component should use the calculated usable height
     * @description
     * When true, the page will cover the entire usable height of the screen. This means that
     * the viewport is not scrollable and the page takes up the full height not required by the
     * title or bottom bar. Optionally, the height of the cover image can be reduced by setting
     * `shouldReduceUsableHeightByCoverHeight` to true.
     * @default false
     * @optional
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
    secondaryColor,
    siteId,
    style = {},
    shouldReduceUsableHeightByCoverHeight = false,
    shouldRemovePadding = false,
    shouldUseUsableHeight = false,
    iconColor,
    customVariables,
}) => {
    const { runtimeEnvironment } = useEnvironment();

    const usableHeight = useUsableHeight({
        shouldReduceByCoverHeight: shouldReduceUsableHeightByCoverHeight,
    });

    const shouldUsePadding =
        !shouldRemovePadding &&
        ![RuntimeEnviroment.IntercomPlugin, RuntimeEnviroment.PagemakerPlugin, 6].includes(
            runtimeEnvironment as number,
        );

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
                customVariables={customVariables}
                iconColor={iconColor}
            >
                {children}
            </ColorSchemeProvider>
            <GlobalStyle />
        </StyledPageProvider>
    );
};
PageProvider.displayName = 'PageProvider';

export default PageProvider;
