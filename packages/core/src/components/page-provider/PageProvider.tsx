import React, { FC, useEffect, useState, type CSSProperties } from 'react';
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
    const [padding, setPadding] = useState<CSSProperties['padding']>();

    useEffect(() => {
        const fetchUsableHeight = async () => {
            const height = await getUsableHeight();
            setUsableHeight(height);
        };

        void fetchUsableHeight();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setPadding(getPagePadding());
        };

        setPadding(getPagePadding());

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [padding]);

    return (
        <StyledPageProvider
            className="page-provider"
            $padding={shouldRemovePadding ? 0 : padding}
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
