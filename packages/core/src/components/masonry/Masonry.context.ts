import { createContext, useContext } from 'react';
import { MasonryContextValue } from './Masonry.types';

export const MasonryContext = createContext<MasonryContextValue | undefined>(undefined);

export const useMasonryContext = () => {
    const context = useContext(MasonryContext);

    if (!context) {
        throw new Error('Masonry.Item must be used inside Masonry.');
    }

    return context;
};
