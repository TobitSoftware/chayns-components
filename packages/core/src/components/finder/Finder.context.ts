import { FinderContext } from './Finder.types';
import { Context, createContext, useContext } from 'react';

export const FinderConfigContext = createContext<{
    Context: Context<FinderContext<{ id: string }> | null>;
} | null>(null);

export const useFinderContext = <E extends { id: string }>() => {
    const config = useContext(FinderConfigContext);

    if (!config) {
        throw new Error('useFinderContext must be used inside Finder.');
    }

    const context = useContext(config.Context as Context<FinderContext<E> | null>);

    if (!context) {
        throw new Error('Finder context is missing.');
    }

    return context;
};
