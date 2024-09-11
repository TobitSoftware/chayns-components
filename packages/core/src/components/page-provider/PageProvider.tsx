import React, { FC, useEffect, useState, type CSSProperties } from 'react';
import { getPagePadding, getUsableHeight } from '../../utils/pageProvider';
import ColorSchemeProvider, {
    type ColorSchemeProviderProps,
} from '../color-scheme-provider/ColorSchemeProvider';
import { StyledPageProvider } from './PageProvider.styles';

interface PageProviderProps extends ColorSchemeProviderProps {
    /**
     * The padding of the page. If not set, the provider will calculate the padding based on the device size.
     */
    padding?: CSSProperties['padding'];
    /**
     * Whether the usable height should be used.
     */
    shouldUseUsableHeight?: boolean;
}

const PageProvider: FC<PageProviderProps> = ({
    children,
    color,
    colorMode,
    cssVariables = {},
    secondaryColor,
    siteId,
    style = {},
    designSettings,
    padding,
    shouldUseUsableHeight,
}) => {
    const [usableHeight, setUsableHeight] = useState(0);

    useEffect(() => {
        const fetchUsableHeight = async () => {
            const height = await getUsableHeight();
            setUsableHeight(height);
        };

        void fetchUsableHeight();
    }, []);

    return (
        <StyledPageProvider
            $padding={padding ?? getPagePadding()}
            $usableHeight={shouldUseUsableHeight ? usableHeight : undefined}
        >
            <ColorSchemeProvider
                color={color}
                secondaryColor={secondaryColor}
                colorMode={colorMode}
                style={style}
                siteId={siteId}
                designSettings={designSettings}
                cssVariables={cssVariables}
            >
                {children}
            </ColorSchemeProvider>
        </StyledPageProvider>
    );
};
PageProvider.displayName = 'PageProvider';

export default PageProvider;
