import React, { useMemo, type ReactNode } from 'react';

interface IAreaProviderContext {
    shouldChangeColor?: boolean;
}

export const AreaContext = React.createContext<IAreaProviderContext>({
    shouldChangeColor: undefined,
});

AreaContext.displayName = 'AreaContext';

interface AreaContextProviderProps {
    children: ReactNode;
    shouldChangeColor?: boolean;
}

const AreaContextProvider = ({ children, shouldChangeColor = true }: AreaContextProviderProps) => {
    const providerValue = useMemo<IAreaProviderContext>(
        () => ({
            shouldChangeColor,
        }),
        [shouldChangeColor],
    );

    return <AreaContext.Provider value={providerValue}>{children}</AreaContext.Provider>;
};

AreaContextProvider.displayName = 'AreaContextProvider';

export default AreaContextProvider;
