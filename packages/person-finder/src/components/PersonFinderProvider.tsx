import React, { createContext, FC, ReactNode, useCallback, useMemo, useState } from 'react';
import { PersonFinderEntry, PersonFinderFilterTypes } from '../types/personFinder';

interface IPersonFinderContext {
    data?: { [key: number]: PersonFinderEntry };
    activeFilter?: PersonFinderFilterTypes[];
    updateActiveFilter?: (filter: PersonFinderFilterTypes[]) => void;
}

export const PersonFinderContext = createContext<IPersonFinderContext>({
    data: undefined,
    activeFilter: undefined,
    updateActiveFilter: undefined,
});

PersonFinderContext.displayName = 'PersonFinderContext';

interface PersonFinderProviderProps {
    children: ReactNode;
}

const PersonFinderProvider: FC<PersonFinderProviderProps> = ({ children }) => {
    const [data, setData] = useState<IPersonFinderContext['data']>();
    const [activeFilter, setActiveFilter] = useState<IPersonFinderContext['activeFilter']>();

    const updateActiveFilter = useCallback((filter: IPersonFinderContext['activeFilter']) => {
        setActiveFilter(filter);
    }, []);

    const providerValue = useMemo<IPersonFinderContext>(
        () => ({
            data,
            activeFilter,
            updateActiveFilter,
        }),
        [activeFilter, data, updateActiveFilter],
    );

    return (
        <PersonFinderContext.Provider value={providerValue}>
            {children}
        </PersonFinderContext.Provider>
    );
};

PersonFinderProvider.displayName = 'PersonFinderProvider';

export default PersonFinderProvider;
