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

const NavigationLayout: FC<NavigationLayoutProps> = ({
    children,
    config: configProp,
    sidebarTopContent,
    sidebarBottomContent,
    groups,
    headerContent,
    selectedItemId,
    shouldShowCollapsedLabel = false,
    onItemClick,
    onSidebarOpen,
    onSidebarClose,
}) => {
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
                    bottomContent={sidebarBottomContent}
                    minWidth={config.sidebarMinWidth}
                    maxWidth={config.sidebarMaxWidth}
                    selectedItemId={selectedItemId}
                    onItemClick={onItemClick}
                    onSidebarOpen={onSidebarOpen}
                    onSidebarClose={onSidebarClose}
                    shouldShowCollapsedLabel={shouldShowCollapsedLabel}
                />
                <StyledNavigationLayoutContent>{children}</StyledNavigationLayoutContent>
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
