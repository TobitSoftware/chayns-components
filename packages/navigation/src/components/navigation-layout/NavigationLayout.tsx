import React, { FC, useMemo } from 'react';
import { NavigationLayoutProps } from './NavigationLayout.types';
import {
    StyledNavigationLayout,
    StyledNavigationLayoutBackground,
    StyledNavigationLayoutBackgroundImage,
    StyledNavigationLayoutContent,
    StyledNavigationLayoutContentWrapper,
} from './NavigationLayout.styles';
import NavigationHeader from './navigation-header/NavigationHeader';
import NavigationSidebar from './navigation-sidebar/NavigationSidebar';
import { DEFAULT_NAVIGATION_LAYOUT_CONFIG } from './NavigationLayout.constants';
import { useSite } from 'chayns-api';

const NavigationLayout: FC<NavigationLayoutProps> = ({ children, config: configProp }) => {
    const { colorMode } = useSite();

    const config = useMemo(
        () => ({
            ...DEFAULT_NAVIGATION_LAYOUT_CONFIG,
            ...configProp,
        }),
        [configProp],
    );

    return (
        <StyledNavigationLayout>
            <NavigationHeader height={config.headerHeight} color={config.color} />
            <StyledNavigationLayoutContentWrapper>
                <NavigationSidebar color={config.color} />
                <StyledNavigationLayoutContent $colorMode={colorMode}>
                    {children}
                </StyledNavigationLayoutContent>
            </StyledNavigationLayoutContentWrapper>
            <StyledNavigationLayoutBackground $backgroundColor={config.backgroundColor}>
                {config.backgroundImage && (
                    <StyledNavigationLayoutBackgroundImage src={config.backgroundImage} />
                )}
            </StyledNavigationLayoutBackground>
        </StyledNavigationLayout>
    );
};

NavigationLayout.displayName = 'NavigationLayout';

export default NavigationLayout;
