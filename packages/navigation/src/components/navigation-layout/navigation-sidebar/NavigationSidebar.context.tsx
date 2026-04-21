import React, { ReactNode, createContext, useContext } from 'react';
import { NavigationLayoutProps } from '../NavigationLayout.types';

interface NavigationSidebarContextValue {
    color: string;
    isCompact: boolean;
    selectedItemId?: NavigationLayoutProps['selectedItemId'];
    onItemClick?: NavigationLayoutProps['onItemClick'];
    shouldShowCollapsedLabel?: NavigationLayoutProps['shouldShowCollapsedLabel'];
}

interface NavigationSidebarProviderProps {
    children: ReactNode;
    value: NavigationSidebarContextValue;
}

const NavigationSidebarContext = createContext<NavigationSidebarContextValue | null>(null);

export const NavigationSidebarProvider = ({ children, value }: NavigationSidebarProviderProps) => (
    <NavigationSidebarContext.Provider value={value}>{children}</NavigationSidebarContext.Provider>
);

NavigationSidebarProvider.displayName = 'NavigationSidebarProvider';

export const useNavigationSidebarContext = (): NavigationSidebarContextValue => {
    const context = useContext(NavigationSidebarContext);

    if (!context) {
        throw new Error(
            'useNavigationSidebarContext must be used within NavigationSidebarProvider.',
        );
    }

    return context;
};
