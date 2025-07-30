import React, { useMemo, type ReactNode } from 'react';
import type { ContentCardType } from '../../types/contentCard';

interface IAreaProviderContext {
    contentCardType?: ContentCardType;
    shouldChangeColor?: boolean;
    shouldDisableListItemPadding?: boolean;
}

export const AreaContext = React.createContext<IAreaProviderContext>({
    contentCardType: undefined,
    shouldChangeColor: undefined,
    shouldDisableListItemPadding: undefined,
});

AreaContext.displayName = 'AreaContext';

interface AreaContextProviderProps {
    children: ReactNode;
    contentCardType?: ContentCardType;
    shouldChangeColor?: boolean;
    shouldDisableListItemPadding?: boolean;
}

const AreaContextProvider = ({
    children,
    contentCardType,
    shouldChangeColor = true,
    shouldDisableListItemPadding = false,
}: AreaContextProviderProps) => {
    const providerValue = useMemo<IAreaProviderContext>(
        () => ({
            contentCardType,
            shouldChangeColor,
            shouldDisableListItemPadding,
        }),
        [contentCardType, shouldChangeColor, shouldDisableListItemPadding],
    );

    return <AreaContext.Provider value={providerValue}>{children}</AreaContext.Provider>;
};

AreaContextProvider.displayName = 'AreaContextProvider';

export default AreaContextProvider;
