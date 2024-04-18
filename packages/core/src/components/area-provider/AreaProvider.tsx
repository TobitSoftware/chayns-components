import React, { useMemo, type ReactNode } from 'react';

interface IAreaProviderContext {
    shouldChangeColor?: boolean;
}

export const AreaProviderContext = React.createContext<IAreaProviderContext>({
    shouldChangeColor: undefined,
});

AreaProviderContext.displayName = 'AreaProviderContext';

interface AreaProviderProps {
    children: ReactNode;
    shouldChangeColor?: boolean;
}

const AreaProvider = ({ children, shouldChangeColor = true }: AreaProviderProps) => {
    const providerValue = useMemo<IAreaProviderContext>(
        () => ({
            shouldChangeColor,
        }),
        [shouldChangeColor],
    );

    return (
        <AreaProviderContext.Provider value={providerValue}>
            {children}
        </AreaProviderContext.Provider>
    );
};

AreaProvider.displayName = 'AreaProvider';

export default AreaProvider;
