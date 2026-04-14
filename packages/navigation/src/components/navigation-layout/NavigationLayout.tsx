import React, { FC, useCallback, useMemo, useState } from 'react';
import { NavigationLayoutProps } from './NavigationLayout.types';
import {
    StyledMotionNavigationLayoutContentWrapper,
    StyledNavigationLayout,
    StyledNavigationLayoutBackground,
    StyledNavigationLayoutBackgroundImage,
    StyledNavigationLayoutContent,
    StyledMotionNavigationLayoutContentOverlay,
} from './NavigationLayout.styles';
import NavigationHeader from './navigation-header/NavigationHeader';
import NavigationSidebar from './navigation-sidebar/NavigationSidebar';
import { DEFAULT_NAVIGATION_LAYOUT_CONFIG } from './NavigationLayout.constants';
import { AnimatePresence } from 'motion/react';
import { NavigationLayoutProvider } from './NavigationLayout.context';

const NavigationLayout: FC<NavigationLayoutProps> = ({
    children,
    config: configProp,
    sidebarTopContent,
    sidebarBottomContent,
    groups,
    headerContent,
    selectedItemId,
    isMobile = false,
    shouldShowCollapsedLabel = false,
    onItemClick,
    onItemReorder,
    onSidebarOpen,
    onSidebarClose,
}) => {
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const mergedConfig = useMemo(
        () => ({
            ...DEFAULT_NAVIGATION_LAYOUT_CONFIG,
            ...configProp,
        }),
        [configProp],
    );

    const shouldShowCollapsedSidebarLabel = shouldShowCollapsedLabel && !isMobile;

    const handleToggleMobileMenu = useCallback(() => {
        if (!isMobile) {
            setIsMobileOpen(false);

            return;
        }

        setIsMobileOpen((prev) => !prev);
    }, [isMobile]);

    return (
        <NavigationLayoutProvider value={{ onItemReorder }}>
            <StyledNavigationLayout>
                <NavigationHeader
                    height={mergedConfig.headerHeight}
                    color={mergedConfig.color}
                    headerContent={headerContent}
                    safeAreas={mergedConfig.safeAreas}
                    isMobile={isMobile}
                    isMobileOpen={isMobileOpen}
                    onMenuClick={handleToggleMobileMenu}
                />
                <StyledMotionNavigationLayoutContentWrapper
                    initial={false}
                    animate={isMobile ? { x: isMobileOpen ? 0 : '-70vw' } : {}}
                    transition={{
                        type: 'tween',
                    }}
                >
                    <NavigationSidebar
                        color={mergedConfig.color}
                        groups={groups}
                        topContent={sidebarTopContent}
                        bottomContent={sidebarBottomContent}
                        minWidth={mergedConfig.sidebarMinWidth}
                        maxWidth={mergedConfig.sidebarMaxWidth}
                        isMobile={isMobile}
                        selectedItemId={selectedItemId}
                        onItemClick={onItemClick}
                        onSidebarOpen={onSidebarOpen}
                        onSidebarClose={onSidebarClose}
                        shouldShowCollapsedLabel={shouldShowCollapsedSidebarLabel}
                    />
                    <StyledNavigationLayoutContent
                        $isMobile={isMobile}
                        $isCornerContent={!isMobile || isMobileOpen}
                    >
                        {children}
                        <AnimatePresence initial={false}>
                            {isMobileOpen && (
                                <StyledMotionNavigationLayoutContentOverlay
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.28 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3, type: 'tween' }}
                                    onClick={handleToggleMobileMenu}
                                />
                            )}
                        </AnimatePresence>
                    </StyledNavigationLayoutContent>
                </StyledMotionNavigationLayoutContentWrapper>
                <StyledNavigationLayoutBackground $backgroundColor={mergedConfig.backgroundColor}>
                    {mergedConfig.backgroundImage && (
                        <StyledNavigationLayoutBackgroundImage src={mergedConfig.backgroundImage} />
                    )}
                </StyledNavigationLayoutBackground>
            </StyledNavigationLayout>
        </NavigationLayoutProvider>
    );
};

NavigationLayout.displayName = 'NavigationLayout';

export default NavigationLayout;
