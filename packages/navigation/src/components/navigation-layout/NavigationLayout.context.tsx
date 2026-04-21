import React, { ReactNode, createContext, useContext } from 'react';
import { NavigationLayoutProps } from './NavigationLayout.types';

interface NavigationLayoutContextValue {
    onItemReorder?: NavigationLayoutProps['onItemReorder'];
}

interface NavigationLayoutProviderProps {
    children: ReactNode;
    value: NavigationLayoutContextValue;
}

const NavigationLayoutContext = createContext<NavigationLayoutContextValue | null>(null);

export const NavigationLayoutProvider = ({ children, value }: NavigationLayoutProviderProps) => (
    <NavigationLayoutContext.Provider value={value}>{children}</NavigationLayoutContext.Provider>
);

NavigationLayoutProvider.displayName = 'NavigationLayoutProvider';

export const useNavigationLayoutContext = (): NavigationLayoutContextValue => {
    const context = useContext(NavigationLayoutContext);

    if (!context) {
        throw new Error('useNavigationLayoutContext must be used within NavigationLayoutProvider.');
    }

    return context;
};
