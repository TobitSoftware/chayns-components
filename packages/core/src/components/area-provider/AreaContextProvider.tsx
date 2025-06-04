import React, { useMemo, type ReactNode } from 'react';

interface IAreaProviderContext {
    shouldChangeColor?: boolean;
    shouldDisableListItemPadding?: boolean;
}

export const AreaContext = React.createContext<IAreaProviderContext>({
    shouldChangeColor: undefined,
    shouldDisableListItemPadding: undefined,
});

AreaContext.displayName = 'AreaContext';

interface AreaContextProviderProps {
    children: ReactNode;
    shouldChangeColor?: boolean;
    shouldDisableListItemPadding?: boolean;
}

const AreaContextProvider = ({
    children,
    shouldChangeColor = true,
    shouldDisableListItemPadding = false,
}: AreaContextProviderProps) => {
    const providerValue = useMemo<IAreaProviderContext>(
        () => ({
            shouldChangeColor,
            shouldDisableListItemPadding,
        }),
        [shouldChangeColor, shouldDisableListItemPadding],
    );

    return <AreaContext.Provider value={providerValue}>{children}</AreaContext.Provider>;
};

AreaContextProvider.displayName = 'AreaContextProvider';

export default AreaContextProvider;
