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

const NavigationLayout: FC<NavigationLayoutProps> = ({
    children,
    config: configProp,
    sidebarTopContent,
    groups,
    headerContent,
    selectedItemId,
    onItemClick,
    onSidebarOpen,
    onSidebarClose,
}) => {
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
            <NavigationHeader
                height={config.headerHeight}
                color={config.color}
                headerContent={headerContent}
                safeAreas={config.safeAreas}
            />
            <StyledNavigationLayoutContentWrapper>
                <NavigationSidebar
                    color={config.color}
                    groups={groups}
                    topContent={sidebarTopContent}
                    minWidth={config.sidebarMinWidth}
                    maxWidth={config.sidebarMaxWidth}
                    selectedItemId={selectedItemId}
                    onItemClick={onItemClick}
                    onSidebarOpen={onSidebarOpen}
                    onSidebarClose={onSidebarClose}
                />
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
